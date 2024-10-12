import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
