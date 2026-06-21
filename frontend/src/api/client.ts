import { getLocale } from "@/i18n";
import { ApiError } from "./ApiError";
import { API_BASE, API_ENDPOINTS, AUTH_PUBLIC_PATHS } from "./endpoints";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type RequestOptions = RequestInit & {
  auth?: boolean;
  skipRefresh?: boolean;
  json?: boolean;
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

    return this.#parseResponse<T>(response, {
      json,
    });
  }

  get<T = unknown>(path: string, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "GET",
    });
  }

  post<T = unknown>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  patch<T = unknown>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  put<T = unknown>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
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
    if (!url.href.startsWith(API_BASE)) {
      throw new Error("Invalid API endpoint");
    }

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
      ...(json
        ? {
            "Content-Type": "application/json",
          }
        : {}),
      ...extra,
    };
  }

  async #parseResponse<T>(
    response: Response,
    { json }: { json: boolean },
  ): Promise<T> {
    if (response.status === 204) {
      return null as T;
    }

    let data: unknown = null;

    if (json) {
      try {
        data = await response.json();
      } catch {
        if (!response.ok) {
          throw new ApiError("error", {
            status: response.status,
          });
        }
      }
    }

    if (!response.ok) {
      throw ApiError.fromResponse(
        data as {
          detail?: string;
          code?: string;
        },
        response.status,
      );
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
