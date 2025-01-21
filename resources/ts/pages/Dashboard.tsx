import type { Student, User } from "@/types";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getPaginatedData from "@/libs/apis/getPaginatedData";
import Layout from "@/layouts";
import Container from "ui/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LinkPrimitive } from "ui/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import AlertDialog from "ui/AlertDialog";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

function UserTableRow({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <TableRow >
      <TableCell width="4ch">{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{dayjs(user.created_at).locale(id).format("dddd, DD MMMM YYYY")}</TableCell>
      <TableCell>{dayjs(user.updated_at).locale(id).format("dddd, DD MMMM YYYY")}</TableCell>
      <TableCell width={1}>
        <Button LinkComponent={LinkPrimitive} href={`/users/${user.id}/edit`}>
          Edit
        </Button>
      </TableCell>
      <TableCell width={1}>
        <Button color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          url={route("users.delete", user.id)}
          method="delete"
          title="Konfirmasi Hapus"
          message="Apakah Anda yakin ingin menghapus user ini?"
        />
      </TableCell>
    </TableRow>
  );
}

function UserTable() {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getPaginatedData<User>("/users"),
  });

  const users = userData?.data;

  const tableSkeleton = [...new Array(6)].map((_, i) => (
    <TableRow key={i}>
      <TableCell width="3ch">
        <Skeleton variant="rounded" width="2ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="20ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="22ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="18ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="18ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell width={1}>
        <Button disabled>Edit</Button>
      </TableCell>
      <TableCell width={1}>
        <Button color="error" disabled>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Waktu dibuat</TableCell>
            <TableCell>Waktu diperbarui</TableCell>
            <TableCell colSpan={2} sx={{ textAlign: "center" }}>
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? tableSkeleton
            : !isError && users
            ? users.map((user) => <UserTableRow user={user} key={user.id} />)
            : error && (
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }} colSpan={5}>
                    <Typography color="error">{error.message}</Typography>
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function StudentTableRow({ student, index }: { student: Student, index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <TableRow>
      <TableCell width="4ch">{index + 1}</TableCell>
      <TableCell>{student.nisn}</TableCell>
      <TableCell>{student.name}</TableCell>
      <TableCell>{student.place_of_birth}</TableCell>
      <TableCell>{dayjs(student.date_of_birth).locale(id).format("dddd, DD MMMM YYYY")}</TableCell>
      <TableCell width={1}>
        <Button LinkComponent={LinkPrimitive} href={`/students/${student.id}/edit`}>
          Edit
        </Button>
      </TableCell>
      <TableCell width={1}>
        <Button color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          url={route("students.delete", student.id)}
          method="delete"
          title="Konfirmasi Hapus"
          message="Apakah Anda yakin ingin menghapus siswa ini?"
        />
      </TableCell>
    </TableRow>
  );
}

function StudentTable() {
  const {
    data: studentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () => getPaginatedData<Student>("/students"),
  });

  const students = studentData?.data;

  const tableSkeleton = [...new Array(6)].map((_, i) => (
    <TableRow key={i}>
      <TableCell width="3ch">
        <Skeleton variant="rounded" width="2ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="11ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="20ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="10ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="18ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell width={1}>
        <Button disabled>Edit</Button>
      </TableCell>
      <TableCell width={1}>
        <Button color="error" disabled>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>NISN</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Tempat lahir</TableCell>
            <TableCell>Tanggal lahir</TableCell>
            <TableCell colSpan={2} sx={{ textAlign: "center" }}>
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? tableSkeleton
            : !isError && students
            ? students.map((student, i) => <StudentTableRow student={student} index={i} key={student.id} />)
            : error && (
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }} colSpan={5}>
                    <Typography color="error">{error.message}</Typography>
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Page() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom>
        Selamat datang di {appName}. Anda dapat melihat daftar pengguna yang terdaftar di website ini.
      </Typography>
      <UserTable />
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Daftar Siswa
      </Typography>
      <StudentTable />
    </Container>
  );
}

Page.layout = (page: React.ReactNode) => <Layout title="Dashboard">{page}</Layout>;
