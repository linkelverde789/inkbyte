import { t, MSG } from "@/i18n";

export class ApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, { code, status }: { code?: string; status?: number } = {}) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }

  static fromResponse(data: { detail?: string; code?: string } | null, status: number) {
    const message = data?.detail || t(MSG.ERROR_GENERIC);
    return new ApiError(message, { code: data?.code, status });
  }

  static sessionExpired() {
    return new ApiError(t(MSG.ERROR_SESSION_EXPIRED), { status: 401 });
  }
}
