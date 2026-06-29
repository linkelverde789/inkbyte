import { getLocale } from "@/i18n";
import { ApiError } from "./ApiError";
import { API_BASE, API_ENDPOINTS, AUTH_PUBLIC_PATHS } from "./endpoints";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type RequestOptions = RequestInit & {
  auth?: boolean;
  skipRefresh?: boolean;
  json?: boolean;
  blob?: boolean;
  headers?: Record<string, string>;
  params?: QueryParams;
};

export class API {
  #refreshPromise: Promise<void> | null = null;

  async request<T = unknown>(
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const {
      auth = true,
      skipRefresh = false,
      json = true,
      blob = false,
      headers: extraHeaders,
      params,
      ...fetchOptions
    } = options;

    const url = this.#resolveUrl(path, params);

    const headers = this.#buildHeaders({
      json,
      extra: extraHeaders,
    });

    let response = await fetch(url, {
      ...fetchOptions,
      credentials: "include",
      headers,
    });

    if (
      response.status === 401 &&
      auth &&
      !skipRefresh &&
      !AUTH_PUBLIC_PATHS.has(path)
    ) {
      await this.#refreshSession();

      response = await fetch(url, {
        ...fetchOptions,
        credentials: "include",
        headers: this.#buildHeaders({
          json,
          extra: extraHeaders,
        }),
      });
    }

    return this.#parseResponse<T>(response, blob);
  }

  get<T = unknown>(path: string, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "GET",
    });
  }

  post<T = unknown>(path: string, body?: unknown, options?: RequestOptions) {
    const isFormData = body instanceof FormData;

    return this.request<T>(path, {
      ...options,
      method: "POST",
      body:
        body !== undefined
          ? isFormData
            ? body
            : JSON.stringify(body)
          : undefined,
      json: !isFormData,
    });
  }

  patch<T = unknown>(path: string, body?: unknown, options?: RequestOptions) {
    const isFormData = body instanceof FormData;

    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body:
        body !== undefined
          ? isFormData
            ? body
            : JSON.stringify(body)
          : undefined,
      json: !isFormData,
    });
  }

  put<T = unknown>(path: string, body?: unknown, options?: RequestOptions) {
    const isFormData = body instanceof FormData;

    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body:
        body !== undefined
          ? isFormData
            ? body
            : JSON.stringify(body)
          : undefined,
      json: !isFormData,
    });
  }

  delete<T = unknown>(path: string, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "DELETE",
    });
  }

  #resolveUrl(path: string, params?: QueryParams) {
    const endpoint = path.startsWith("/api")
      ? path
      : `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

    const url = new URL(endpoint, window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return `${url.pathname}${url.search}`;
  }

  #buildHeaders({
    json,
    extra,
  }: {
    json: boolean;
    extra?: Record<string, string>;
  }) {
    return {
      "Accept-Language": getLocale(),

      ...(json ? { "Content-Type": "application/json" } : {}),

      ...extra,
    };
  }

  async #parseResponse<T>(response: Response, blob = false): Promise<T> {
    if (blob) {
      if (!response.ok) {
        const text = await response.text();
        throw new ApiError(text || `HTTP ${response.status}`, {
          status: response.status,
          data: text,
        });
      }

      return (await response.blob()) as T;
    }

    const contentType = response.headers.get("content-type") || "";
    const isJsonResponse = contentType.includes("application/json");

    const text = await response.text();

    let data: unknown = null;

    if (text) {
      if (isJsonResponse) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      } else {
        data = text;
      }
    }

    if (!response.ok) {
      const message =
        typeof data === "object" &&
        data &&
        "detail" in data &&
        typeof (data as any).detail === "string"
          ? (data as any).detail
          : typeof data === "string" && data.length > 0
            ? data
            : `HTTP ${response.status}`;

      throw new ApiError(message, {
        status: response.status,
        data,
      });
    }

    return data as T;
  }

  #refreshSession() {
    if (!this.#refreshPromise) {
      this.#refreshPromise = this.request(API_ENDPOINTS.AUTH_TOKEN_REFRESH, {
        method: "POST",
        auth: false,
        skipRefresh: true,
      })
        .catch((err: ApiError) => {
          throw err.status === 401 ? ApiError.sessionExpired() : err;
        })
        .finally(() => {
          this.#refreshPromise = null;
        }) as Promise<void>;
    }

    return this.#refreshPromise;
  }
}

export const api = new API();
