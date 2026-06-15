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
    const message = data?.detail || "An error occurred";
    return new ApiError(message, { code: data?.code, status });
  }

  static sessionExpired() {
    return new ApiError("Expired session", { status: 401 });
  }
}
