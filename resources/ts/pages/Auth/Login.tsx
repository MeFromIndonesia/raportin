import type { FormEvent } from "react";

import Layout from "@/layouts";
import Container from "ui/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PasswordField from "ui/PasswordField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "ui/Link";
import { useForm } from "@inertiajs/react";
import CircularProgress from "@mui/material/CircularProgress";

import LoginIcon from "@mui/icons-material/Login";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

export default function Page() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    rememberMe: false as boolean,
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("auth.authenticate"));
  }

  return (
    <Container
      disableNavbarOffset
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box component="form" noValidate method="POST" onSubmit={handleSubmit} sx={{ width: 450 }}>
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h2" gutterBottom>
            Masuk ke {appName}
          </Typography>
          <Typography color="textSecondary">Silahkan masuk ke akun Anda untuk memulai menggunakan {appName}.</Typography>
        </Box>
        <TextField
          margin="normal"
          label="Alamat email"
          type="email"
          name="email"
          required
          fullWidth
          autoFocus
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <PasswordField
          margin="normal"
          label="Kata sandi"
          name="password"
          required
          fullWidth
          value={data.password}
          onChange={(e) => setData("password", e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <FormGroup sx={{ my: 1 }}>
          <FormControlLabel
            control={
              <Checkbox checked={data.rememberMe} name="rememberMe" color="primary" onChange={(e) => setData("rememberMe", e.target.checked)} />
            }
            label="Ingat saya"
          />
        </FormGroup>
        <Button
          sx={{ mt: 1 }}
          type="submit"
          variant="contained"
          disabled={processing}
          startIcon={processing ? <CircularProgress size={20} /> : <LoginIcon />}
        >
          Masuk
        </Button>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          Belum punya akun? <Link href={route("auth.register")}>Daftar sekarang</Link>
        </Box>
      </Box>
    </Container>
  );
}

Page.layout = (page: React.ReactNode) => <Layout title="Masuk">{page}</Layout>;
