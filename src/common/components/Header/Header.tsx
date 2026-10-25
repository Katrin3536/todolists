import { changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, changeIsLogginInAC } from "@/app/app-slice"
import { baseApi } from "@/app/baseApi"
import { NavButton } from "@/common/components"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { getTheme } from "@/common/theme"
import { useLogoutMutation, useMeQuery } from "@/features/auth/api/authApi"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)
  const [logout] = useLogoutMutation()
  const { data } = useMeQuery()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then((data) => {
        if (data.resultCode === ResultCode.Success) {
          localStorage.removeItem(AUTH_TOKEN)
          dispatch(changeIsLogginInAC({ isLoggedIn: false }))
          dispatch(baseApi.util.resetApiState()) // 1variant
        }
      })
    // .then(() => {
    //   dispatch(todolistsApi.util.invalidateTags(["Todolist"]))
    //   dispatch(baseApi.util.invalidateTags(["Todolist","Task"]))
    // }) // 2 variant only for todolists
  }
  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
            {isLoggedIn && <div style={{ marginTop: "10px" }}>{data?.data.login}</div>}
            {isLoggedIn && <NavButton onClick={logoutHandler}>Sign out</NavButton>}
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
