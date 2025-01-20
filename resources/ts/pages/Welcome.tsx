import type { PageProps } from "@/types";

import { usePage } from "@inertiajs/react";
import Layout from "@/layouts";
import Container from "ui/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LinkPrimitive } from "ui/Link";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoodIcon from "@mui/icons-material/Mood";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

export default function Page() {
  const { props } = usePage<PageProps>();
  const { auth } = props;

  return (
    <>
      <Container disableNavbarOffset maxWidth="xl" sx={{ cursor: "default" }}>
        <Box
          component="section"
          sx={{
            height: "100svh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h1" gutterBottom>
            Kelola Raport Siswa dengan Mudah dan Cepat!
          </Typography>
          <Typography variant="h4" marginBottom={4} maxWidth={(theme) => theme.breakpoints.values.lg} textAlign="center">
            {appName} adalah solusi digital untuk guru dalam mengelola nilai siswa. Tambah, ubah, atau hapus nilai dengan efisien di mana saja, kapan
            saja.
          </Typography>
            <Button LinkComponent={LinkPrimitive} variant="contained" href={route(auth.user ? "dashboard" : "login")} endIcon={<ArrowForwardIosIcon />}>
            {auth.user ? "Pergi ke Dashboard" : "Coba Sekarang"}
            </Button>
        </Box>
        <Box
          id="services"
          component="section"
          sx={{
            maxHeight: "100svh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            py: 16,
          }}
        >
          <Typography variant="h2" marginBottom={4}>
            Mengapa Memilih {appName}?
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {[...new Array(6)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  p: 3,
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: "secondary.dark",
                  bgcolor: (theme) => `color-mix(in oklab, ${theme.palette.secondary.dark} 20%, transparent)`,
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <MoodIcon sx={{ fontSize: "3rem" }} />
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Kemudahan dalam mengelola data
                  </Typography>
                  <Typography>Dengan {appName}, Anda dapat melihat, mencari, dan menyunting data siswa secara cepat dan mudah.</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          id="about"
          component="section"
          sx={{
            maxHeight: "100svh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            py: 16,
          }}
        >
          <Typography variant="h2" marginBottom={4}>
            Tentang {appName}
          </Typography>
          <Typography variant="h5" maxWidth={(theme) => theme.breakpoints.values.lg} textAlign="center" marginBottom={4}>
            {appName} adalah Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam blanditiis maiores necessitatibus praesentium ad ullam
            nihil dolores voluptatibus nostrum nesciunt inventore non repellat accusamus cum saepe velit, iste porro eaque ratione totam quo officia
            amet fuga! Deleniti at possimus aliquam? Atque, corrupti.
          </Typography>
          <Typography variant="h4" marginBottom={4}>
            Visi dan Misi {appName}
          </Typography>
          <Box
            component="ul"
            sx={{
              maxWidth: (theme) => theme.breakpoints.values.lg,
            }}
          >
            {[...new Array(2)].map((_, i) => (
              <Box key={i} component="li" sx={{ marginBottom: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Fitur yang Canggih
                </Typography>
                <Typography>
                  {appName} memiliki Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, aliquid quidem soluta sequi rem sunt non totam
                  reiciendis sapiente ipsam numquam debitis nulla porro quaerat laboriosam expedita voluptates repudiandae harum.
                </Typography>
              </Box>
            ))}
          </Box>
          <Button LinkComponent={LinkPrimitive} variant="contained" href="/about" endIcon={<ArrowForwardIosIcon />}>
            Lebih Lanjut
          </Button>
        </Box>
        <Box
          id="contact"
          component="section"
          sx={{
            maxHeight: "100svh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            py: 16,
          }}
        >
          <Box sx={{ flexShrink: "0" }}>
            <Typography variant="h2" gutterBottom>
              Kontak Kami
            </Typography>
            <Typography variant="h5" maxWidth={(theme) => theme.breakpoints.values.lg} textAlign="center">
              {appName} lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </Typography>
          </Box>
          <Box component="form" sx={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
            <TextField margin="normal" label="Nama" name="name" type="text" required fullWidth />
            <TextField margin="normal" label="Email" name="email" type="email" required fullWidth />
            <TextField
              margin="normal"
              label="Pesan"
              name="message"
              placeholder="Tuliskan pesan Anda di sini..."
              type="text"
              required
              fullWidth
              multiline
              rows={4}
            />
            <Button variant="contained" type="submit">
              Kirim
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

Page.layout = (page: React.ReactNode) => <Layout title="Selamat datang" disableSidebar>{page}</Layout>;
