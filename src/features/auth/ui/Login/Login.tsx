import { selectThemeMode } from "@/app/app-slice"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import type { LoginInputs } from "@/features/auth/model/login.types"
import { loginSchema } from "@/features/auth/model/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import { Grid } from "@mui/material"
import TextField from "@mui/material/TextField"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const {
    // register,
    handleSubmit,
    reset,
    control,
    // formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(loginSchema),
  })

  const theme = getTheme(themeMode)

  const fetchFormData: SubmitHandler<LoginInputs> = (data) => {
    console.log(data)
    reset()
  }

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
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Email" margin="normal" error={!!error} helperText={error?.message} />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => <TextField {...field} type="password" label="Password" margin="normal" />}
            />
            {/*<TextField type="password" label="Password" margin="normal" {...register("password")} />*/}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
                  )}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
