import api from ".";
import { setToken } from "../store/authSlice";
import { AppDispatch } from "../store/store";

interface LoginResponse {
  status: number;
  data: {
    user: {
      id: number;
      userName: string;
      password: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
  message: string;
}

interface LoginCredentials {
  userName: string;
  password: string;
  passwordConfirmation: string;
}

const adminlogin = async (
  credentials: LoginCredentials,
  dispatch: AppDispatch
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("user_name", credentials.userName);
    formData.append("password", credentials.password);
    formData.append("password_confirmation", credentials.passwordConfirmation);

    const response = await api.post<LoginResponse>("/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { data } = response.data;
    dispatch(setToken(data.token));

    console.log(response.data.message, data.user);
    console.log("Auth token:", data.token);
  } catch (error: any) {
    console.error(
      "Error logging in:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "An error occurred during login"
    );
  }
};
const userlogin = async (
  credentials: LoginCredentials,
  dispatch: AppDispatch
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("user_name", credentials.userName);
    formData.append("password", credentials.password);
    formData.append("password_confirmation", credentials.passwordConfirmation);

    const response = await api.post<LoginResponse>("/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { data } = response.data;
    dispatch(setToken(data.token));
    console.log(response.data.message, data.user);
    console.log("Auth token:", data.token);
  } catch (error: any) {
    console.error(
      "Error logging in:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "An error occurred during login"
    );
  }
};

export { adminlogin, userlogin };
