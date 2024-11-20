import { APIResponseError } from "@notionhq/client";
import { NotionError, NotionErrorCode } from "./exceptions";
import { ZodError } from "zod";

type NotionRequest<T> = () => Promise<T>;

export async function withNotionErrorHandling<T>(
  request: NotionRequest<T>,
  customErrorMessage?: string,
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (error instanceof APIResponseError) {
      switch (error.code) {
        case "unauthorized":
          throw new NotionError(
            "Invalid Notion API token",
            401,
            NotionErrorCode.UNAUTHORIZED,
          );
        case "object_not_found":
          throw new NotionError(
            "Resource not found",
            404,
            NotionErrorCode.DATABASE_NOT_FOUND,
          );
        case "rate_limited":
          throw new NotionError(
            "Rate limit exceeded",
            429,
            NotionErrorCode.RATE_LIMITED,
          );
        default:
          throw new NotionError(
            error.message,
            500,
            NotionErrorCode.INTERNAL_ERROR,
          );
      }
    }

    if (error instanceof ZodError) {
      console.error("Validation error:", error.errors);
      throw new NotionError(
        "Invalid data structure received from Notion",
        422,
        NotionErrorCode.INVALID_RESPONSE,
      );
    }

    throw new NotionError(
      customErrorMessage || "Notion request failed",
      500,
      NotionErrorCode.INTERNAL_ERROR,
    );
  }
}
