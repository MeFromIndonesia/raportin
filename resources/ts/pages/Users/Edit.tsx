import type { FormEvent } from "react";
import type { User } from "@/types";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getPaginatedData from "@/libs/apis/getPaginatedData";
import Layout from "@/layouts";
import Container from "ui/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PasswordField from "ui/PasswordField";
import Button from "@mui/material/Button";
import { useForm } from "@inertiajs/react";
import CircularProgress from "@mui/material/CircularProgress";

import LoginIcon from "@mui/icons-material/Login";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

export default function Page({ id }: { id: number }) {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getPaginatedData<User>(`/users?id=${id}`),
    retry: false,
  });

  const user = userData?.data[0];

  const { data, setData, put, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (user) {
      setData("name", user.name);
      setData("email", user.email);
    }
  }, [user]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route("users.update", user?.id));
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
      {isLoading ? (
        <CircularProgress />
      ) : !isError && user ? (
        <Box component="form" noValidate method="POST" onSubmit={handleSubmit} sx={{ width: 450 }}>
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h2" gutterBottom>
              Mengubah user
            </Typography>
            <Typography color="textSecondary">Silahkan ubah data user {id}.</Typography>
          </Box>
          <TextField
            margin="normal"
            label="Nama"
            type="text"
            name="name"
            required
            fullWidth
            autoFocus
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            label="Alamat email"
            type="email"
            name="email"
            required
            fullWidth
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
          <PasswordField
            margin="normal"
            label="Konfirmasi kata sandi"
            name="password_confirmation"
            required
            fullWidth
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation}
          />
          <Button
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
            disabled={processing}
            startIcon={processing ? <CircularProgress size={20} /> : <LoginIcon />}
          >
            Masuk
          </Button>
        </Box>
      ) : (
        error && (
          <Typography variant="h3" color="error">
            {error.message}
          </Typography>
        )
      )}
    </Container>
  );
}

Page.layout = (page: React.ReactNode) => <Layout title="Mengubah User">{page}</Layout>;
