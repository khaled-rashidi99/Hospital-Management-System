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
const login = async (
  credentials: LoginCredentials,
  dispatch: AppDispatch
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("user_name", credentials.userName);
    formData.append("password", credentials.password);
    formData.append("password_confirmation", credentials.passwordConfirmation);

    const response = await api.post<LoginResponse>("/adminlogin", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { data } = response.data;
    dispatch(setToken(data.token));

    console.log("User logged in successfully:", data.user);
    console.log("Auth token:", data.token);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export { login };
