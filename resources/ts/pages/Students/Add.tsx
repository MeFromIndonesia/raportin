import type { FormEvent } from "react";

import Layout from "@/layouts";
import Container from "ui/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AutoComplete from "@mui/material/AutoComplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "@inertiajs/react";
import CircularProgress from "@mui/material/CircularProgress";

import LoginIcon from "@mui/icons-material/Login";
import useStudentClass from "@/libs/apis/useStudentClass";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

export default function Page() {
  const { data, setData, post, processing, errors } = useForm({
    nisn: "",
    name: "",
    place_of_birth: "",
    date_of_birth: "",
    student_class_id: "",
  });
  const { data: studentClass, isLoading, isError, error } = useStudentClass();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("students.create"));
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
      ) : !isError && studentClass ? (
        <Box component="form" noValidate method="POST" onSubmit={handleSubmit} sx={{ width: 450 }}>
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h2" gutterBottom>
              Menambah Siswa
            </Typography>
            <Typography color="textSecondary">Silahkan tambahkan siswa.</Typography>
          </Box>
          <TextField
            margin="normal"
            label="Nomor Induk Siswa Nasional"
            type="number"
            name="nisn"
            required
            fullWidth
            autoFocus
            value={data.nisn}
            onChange={(e) => setData("nisn", e.target.value)}
            error={Boolean(errors.nisn)}
            helperText={errors.nisn}
          />
          <TextField
            margin="normal"
            label="Nama lengkap"
            type="text"
            name="name"
            required
            fullWidth
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              margin="normal"
              label="Tempat kelahiran"
              type="text"
              name="place_of_birth"
              required
              fullWidth
              value={data.place_of_birth}
              onChange={(e) => setData("place_of_birth", e.target.value)}
              error={Boolean(errors.place_of_birth)}
              helperText={errors.place_of_birth}
            />
            <DatePicker
              label="Tanggal kelahiran"
              value={new Date(Date.now())}
              onChange={(e) => setData("date_of_birth", e ? e.toISOString().split("T")[0] : "")}
              slotProps={{
                desktopPaper: {
                  elevation: 1,
                },
                mobilePaper: {
                  elevation: 0,
                },
                textField: {
                  margin: "normal",
                  name: "date_of_birth",
                  required: true,
                  fullWidth: true,
                  error: !!errors.date_of_birth,
                  helperText: errors.date_of_birth,
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <AutoComplete
              fullWidth
              options={[10, 11, 12]}
              getOptionLabel={(grade) => grade.toString()}
              renderInput={(props) => <TextField {...props} label="Pilih Kelas" />}
            />
            <AutoComplete
              fullWidth
              options={studentClass.data}
              getOptionLabel={({ major }) => major}
              renderInput={(props) => <TextField {...props} label="Pilih Kejurusan" />}
            />
          </Box>
          <Button
            sx={{ mt: 1 }}
            type="submit"
            variant="contained"
            disabled={processing}
            startIcon={processing ? <CircularProgress size={20} /> : <LoginIcon />}
          >
            Tambah Siswa
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

Page.layout = (page: React.ReactNode) => <Layout title="Menambah Siswa">{page}</Layout>;
