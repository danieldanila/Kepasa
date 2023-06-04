import axios from "axios";
import errorToast from "./toasts/errorToast";
import successToast from "./toasts/successToast";

export async function catchAxios(method, url, toastRef, data) {
  try {
    const response = await axios({
      method: method,
      url: url,
      withCredentials: true,
      data: data,
    });

    if (method === "GET") {
      return response.data;
    }

    successToast(toastRef, response.data.message);

    return true;
  } catch (err) {
    errorToast(toastRef, err.response.data.message);
  }
}
