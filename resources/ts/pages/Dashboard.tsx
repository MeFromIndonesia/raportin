import type { User } from "@/types";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getData from "@/libs/apis/getData";
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
import { format } from "date-fns/format";
import { id } from "date-fns/locale";
import AlertDialog from "ui/AlertDialog";
import RoleChip from "ui/RoleChip";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

function UserTableRow({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <TableRow key={user.id}>
      <TableCell width="4ch">{user.id}</TableCell>
      <TableCell>
        {user.name}
        <RoleChip role={user.role} sx={{ ml: 0.75 }} />
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{format(new Date(user.created_at), "PPPP", { locale: id })}</TableCell>
      <TableCell>{user.updated_at ? format(new Date(user.updated_at), "PPPP", { locale: id }) : "N/A"}</TableCell>
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

export default function Page() {
  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getData<User>("/users"),
  });

  const users = usersData?.data;

  const tableSkeleton = [...new Array(6)].map((_, i) => (
    <TableRow key={i}>
      <TableCell width="3ch">
        <Skeleton variant="rounded" width="2ch" sx={{ fontSize: "0.875rem" }} />
      </TableCell>
      <TableCell sx={{ "& .MuiSkeleton-root": { display: "inline-block" } }}>
        <Skeleton variant="text" width="20ch" sx={{ fontSize: "0.875rem" }} /><Skeleton variant="text" width="7ch" sx={{ fontSize: "0.875rem", ml: 0.75 }} />
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
    <Container>
      <Typography variant="h2" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom>
        Selamat datang di {appName}. Anda dapat melihat daftar pengguna yang terdaftar di website ini.
      </Typography>
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
    </Container>
  );
}

Page.layout = (page: React.ReactNode) => <Layout title="Dashboard">{page}</Layout>;
