import { ExternalToast, toast } from "sonner";

interface AuthClientErrorType {
  message: string;
  cause: {
    code: number;
  };
}
export class AuthClientError implements AuthClientErrorType {
  message: string;
  cause: { code: number };

  constructor(message: string, cause: AuthClientErrorType["cause"]) {
    this.message = message;
    this.cause = cause;
  }
}

const authCodesMessages: Record<number, string> = {
  409: "A user with the same id, email, or phone already exists!",
  401: "Invalid credentials. Please check the email and password.",
  400: "Password must be between 8 and 256 characters long.",
};

export const toastError = (err: AuthClientError, options?: ExternalToast) => {
  let message: string = authCodesMessages[err.cause.code];
  if (!message) message = err.message;

  toast.error(message, {
    style: {
      backgroundColor: "#fdacac",
    },
    position: "top-right",
    ...options,
  });
};
