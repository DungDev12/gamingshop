import { AxiosError } from "axios";
import Swal from "sweetalert2";

export interface ErrorResponse {
  data: string;
}

export const ErrorAlbert = (error: AxiosError<ErrorResponse>) => {
  console.log(error);
  const status = error.response?.status || "Unknown error";
  const message = error.response?.data || "Unknown error";

  Swal.fire({
    icon: "error",
    title: String(status),
    text: String(message),
  });
};
