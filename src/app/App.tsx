import { selectThemeMode } from "@/app/app-slice"
import { Routing } from "@/common/components"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar"
import styles from "./App.module.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Header } from "@/common/components/Header/Header.tsx"
import { getTheme } from "@/common/theme/theme.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
