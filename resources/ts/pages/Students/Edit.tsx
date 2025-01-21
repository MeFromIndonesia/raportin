import type { FormEvent } from "react";
import type { Student } from "@/types";

import { useEffect, useMemo } from "react";
import Layout from "@/layouts";
import Container from "ui/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "@inertiajs/react";
import CircularProgress from "@mui/material/CircularProgress";
import useStudentClass from "@/libs/apis/useStudentClass";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import getData from "@/libs/apis/getData";
import useStudentClassGrade from "@/utils/useStudentClassGrade";

import LoginIcon from "@mui/icons-material/Login";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

export default function Page({ id }: { id: number }) {
  const studentQuery = useQuery({
    queryKey: ["students", id],
    queryFn: () => getData<Student>(`/students?id=${id}`),
    retry: false,
  });

  const student = studentQuery.data?.data[0];

  const { data, setData, put, processing, errors } = useForm({
    nisn: "",
    name: "",
    place_of_birth: "",
    date_of_birth: "",
    grade: "",
    major: "",
  });
  const { data: studentClass, isLoading, isError, error } = useStudentClass();
  const studentClassQuery = useStudentClassGrade(student?.id || 1);

  useEffect(() => {
    if (student && studentClassQuery.grade && studentClassQuery.major) {
      setData("nisn", student.nisn.toString());
      setData("name", student.name);
      setData("place_of_birth", student.place_of_birth);
      setData("date_of_birth", student.date_of_birth);
      setData("grade", studentClassQuery.grade.toString());
      setData("major", studentClassQuery.major);
    }
  }, [student, studentClassQuery.grade, studentClassQuery.major]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route("students.update", student?.id));
  }

  const uniqueMajors = useMemo(
    () => studentClass?.data.filter((value, i, self) => i === self.findIndex((item) => item.major === value.major)).map((item) => item.major),
    [studentClass?.data]
  );

  return (
    <Container
      disableNavbarOffset
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading || studentQuery.isLoading || studentClassQuery.isLoading ? (
        <CircularProgress />
      ) : !isError && !studentQuery.isError && !studentClassQuery.isError && studentClass ? (
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
            error={!!errors.nisn}
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
            error={!!errors.name}
            helperText={errors.name}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              margin="normal"
              label="Tempat lahir"
              type="text"
              name="place_of_birth"
              required
              fullWidth
              value={data.place_of_birth}
              onChange={(e) => setData("place_of_birth", e.target.value)}
              error={!!errors.place_of_birth}
              helperText={errors.place_of_birth}
            />
            <DatePicker
              label="Tanggal lahir"
              value={data.date_of_birth !== "" ? dayjs(data.date_of_birth) : undefined}
              onChange={(value) => setData("date_of_birth", value ? value.format() : "")}
              format="DD-MM-YYYY"
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
            <Autocomplete
              fullWidth
              options={[10, 11, 12]}
              value={data.grade as unknown as number}
              onChange={(_, value) => setData("grade", value ? value.toString() : "")}
              getOptionLabel={(grade) => grade.toString()}
              renderInput={(props) => <TextField {...props} label="Pilih Kelas" error={!!errors.grade} helperText={errors.grade} />}
            />
            <Autocomplete
              fullWidth
              options={uniqueMajors || []}
              value={data.major}
              onChange={(_, value) => setData("major", value ?? "")}
              renderInput={(props) => <TextField {...props} label="Pilih Kejurusan" error={!!errors.major} helperText={errors.major} />}
            />
          </Box>
          <Button
            sx={{ mt: 1 }}
            type="submit"
            variant="contained"
            disabled={processing}
            startIcon={processing ? <CircularProgress size={20} /> : <LoginIcon />}
          >
            Edit Siswa
          </Button>
        </Box>
      ) : (
        <>
          {isError && (
            <Typography variant="h3" color="error">
              {error?.message}
            </Typography>
          )}
          {studentQuery.isError && (
            <Typography variant="h3" color="error">
              {studentQuery.error?.message}
            </Typography>
          )}
          {studentClassQuery.isError && (
            <Typography variant="h3" color="error">
              {studentClassQuery.error?.message}
            </Typography>
          )}
        </>
      )}
    </Container>
  );
}

Page.layout = (page: React.ReactNode) => <Layout title="Menambah Siswa">{page}</Layout>;
