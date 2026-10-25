import { changeIsLogginInAC, selectThemeMode } from "@/app/app-slice"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { useGetCaptchaQuery, useLoginMutation } from "@/features/auth/api/authApi"
import type { LoginInputs } from "@/features/auth/model/login.types"
import { loginSchema } from "@/features/auth/model/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Grid, InputAdornment } from "@mui/material"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const [login] = useLoginMutation()

  const { data: captchaData } = useGetCaptchaQuery()

  const {
    // register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false, captcha: "" },
    resolver: zodResolver(loginSchema),
  })

  const theme = getTheme(themeMode)

  const fetchFormData: SubmitHandler<LoginInputs> = (data) => {
    login(data)
      .unwrap()
      .then((data) => {
        if (data.resultCode === ResultCode.CaptchaError) {
          dispatch(changeIsLogginInAC({ isLoggedIn: false }))
        }
        if (data.resultCode === ResultCode.Success) {
          localStorage.setItem(AUTH_TOKEN, data.data.token)
          dispatch(changeIsLogginInAC({ isLoggedIn: true }))
        }
        reset()
      })
    // Если resultCode равен Captcha (обычно это 10),
    // форма не сбрасывается, а getTheme/useGetCaptchaQuery автоматически обновит урл,
    // если сервер считает нужным. В SamuraiJS хук RTK Query сделает refetch,
    // либо вам нужно будет обработать ошибку.
  }

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show)

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(fetchFormData)}>
          <FormGroup>
            {/*<TextField*/}
            {/*  label="Email"*/}
            {/*  margin="normal"*/}
            {/*  error={!!errors?.email}*/}
            {/*  helperText={errors && errors.email?.message}*/}
            {/*  {...register("email")}*/}
            {/*/>*/}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  margin="normal"
                  error={!!errors.email}
                  helperText={!!errors && errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{
                    "& .MuiInputBase-root": {
                      // Здесь задайте цвет фона, который вам нужен (например, светло-голубой как на скрине)
                      backgroundColor: "#e8f0fe",

                      // Стили для обработки автозаполнения WebKit (Chrome, Edge, Safari)
                      "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px #e8f0fe inset !important",
                        WebkitTextFillColor: "#000000 !important",
                      },
                    },
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? "hide the password" : "display the password"}
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={!!errors && errors.password?.message}
                />
              )}
            />
            {/*<TextField type="password" label="Password" margin="normal" {...register("password")} />*/}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={field.value} />}
                />
              }
            />
            {captchaData?.url && (
              <>
                <img src={captchaData.url} alt="captcha" style={{ marginBottom: "10px", borderRadius: "4px" }} />
                <Controller
                  name="captcha"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Symbols from image"
                      margin="dense"
                      fullWidth
                      error={!!errors.captcha}
                      helperText={errors.captcha?.message}
                    />
                  )}
                />
              </>
            )}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
