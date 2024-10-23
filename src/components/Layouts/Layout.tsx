import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme";
import { Provider } from "react-redux";
import store from "../../store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}
