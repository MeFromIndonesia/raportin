import type { AppBarProps } from "@mui/material/AppBar";

import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Link, { LinkPrimitive } from "ui/Link";
// import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import ModeToggle from "./ModeToggle";
import Button from "@mui/material/Button";

import LoginIcon from "@mui/icons-material/Login";
// import MenuIcon from "@mui/icons-material/Menu";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const AB = styled(({ ...props }: AppBarProps) => (
    <MuiAppBar position="fixed" color="transparent" elevation={0} {...props} />
))(({ theme }) => ({
    height: "4rem",
    backdropFilter: "blur(8px)",
    borderBottom: 1,
    borderBottomStyle: "solid",
    borderColor: theme.palette.divider,
}));

const Toolbar = styled(MuiToolbar)(() => ({
    justifyContent: "space-between",
    height: "4rem",
}));

const LoginButton = () => {
    return (
        <Button
            LinkComponent={LinkPrimitive}
            href="/login"
            variant="contained"
            startIcon={<LoginIcon />}
        >
            Masuk
        </Button>
    );
};

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const items = [
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
];

export default function AppBar() {
    return (
        <AB>
            <Toolbar>
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {/* <IconButton onClick={() => {}} sx={{ mr: 4 }}>
                        {!open ? <MenuIcon /> : <MenuOpenIcon />}
                    </IconButton> */}
                    <Link
                        href="/"
                        variant="h2"
                        underline="none"
                        sx={{ color: "primary.light", fontWeight: "700" }}
                    >
                        {appName}
                    </Link>
                </Box>
                <Box
                    component="ul"
                    sx={{
                        listStyleType: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {items.map((item) => (
                        <Box
                            key={item.href}
                            component="li"
                            sx={{ marginRight: 3 }}
                        >
                            <Link
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </Box>
                    ))}
                    <Box component="li" sx={{ marginRight: 3 }}>
                        <LoginButton />
                    </Box>
                    <Box component="li">
                        <ModeToggle
                            slots={{ tooltip: { placement: "left" } }}
                        />
                    </Box>
                </Box>
            </Toolbar>
        </AB>
    );
}
