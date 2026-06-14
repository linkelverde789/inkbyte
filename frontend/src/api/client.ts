import { LOCALE, t, MSG } from "@/i18n";
import { ApiError } from "./ApiError";
import { API_BASE, API_ENDPOINTS, AUTH_PUBLIC_PATHS } from "./endpoints";

type RequestOptions = RequestInit & {
  auth?: boolean;
  skipRefresh?: boolean;
  json?: boolean;
  headers?: Record<string, string>;
};

export class API {
  #refreshPromise: Promise<void> | null = null;

  async request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
    const {
      auth = true,
      skipRefresh = false,
      json = true,
      headers: extraHeaders,
      ...fetchOptions
    } = options;

    const url = this.#resolveUrl(path);
    const headers = this.#buildHeaders({ json, extra: extraHeaders });

    let response = await fetch(url, {
      ...fetchOptions,
      credentials: "include",
      headers,
    });

    if (response.status === 401 && auth && !skipRefresh && !AUTH_PUBLIC_PATHS.has(path)) {
      await this.#refreshSession();
      response = await fetch(url, {
        ...fetchOptions,
        credentials: "include",
        headers: this.#buildHeaders({ json, extra: extraHeaders }),
      });
    }

    return this.#parseResponse<T>(response, { json });
  }

  get<T = unknown>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T = unknown>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  #resolveUrl(path: string) {
    if (path.startsWith("/api")) return path;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE}${normalized}`;
  }

  #buildHeaders({ json, extra }: { json: boolean; extra?: Record<string, string> }) {
    return {
      "Accept-Language": LOCALE,
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...extra,
    };
  }

  async #parseResponse<T>(response: Response, { json }: { json: boolean }): Promise<T> {
    if (response.status === 204) return null as T;

    let data: { detail?: string; code?: string } = {};
    if (json) {
      try {
        data = await response.json();
      } catch {
        if (!response.ok) {
          throw new ApiError(t(MSG.ERROR_NETWORK), { status: response.status });
        }
      }
    }

    if (!response.ok) {
      throw ApiError.fromResponse(data, response.status);
    }

    return data as T;
  }

  #refreshSession() {
    if (!this.#refreshPromise) {
      this.#refreshPromise = this.request<void>(API_ENDPOINTS.AUTH_TOKEN_REFRESH, {
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
