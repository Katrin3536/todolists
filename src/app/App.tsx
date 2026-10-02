import { selectThemeMode } from "@/app/app-slice"
import { Routing } from "@/common/components"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar"
import { useAppDispatch } from "@/common/hooks"
import { initializeAppTC } from "@/features/auth/model/auth-slice"
import CircularProgress from "@mui/material/CircularProgress"
import { useEffect, useState } from "react"
import styles from "./App.module.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Header } from "@/common/components/Header/Header.tsx"
import { getTheme } from "@/common/theme/theme.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)

  useEffect(() => {
    dispatch(initializeAppTC()).finally(() => {
      setIsInitialized(true)
    })
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

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
