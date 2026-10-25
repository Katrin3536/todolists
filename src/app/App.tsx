import { changeIsLogginInAC, selectThemeMode } from "@/app/app-slice"
import { Routing } from "@/common/components"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar"
import { Header } from "@/common/components/Header/Header.tsx"
import { ResultCode } from "@/common/enums"
import { useAppDispatch } from "@/common/hooks"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { useMeQuery } from "@/features/auth/api/authApi"
import CircularProgress from "@mui/material/CircularProgress"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { useEffect, useState } from "react"
import styles from "./App.module.css"

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(changeIsLogginInAC({ isLoggedIn: true }))
    }
    setIsInitialized(true)
  }, [isLoading, data])

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
