import type { FC, ReactNode } from "react";

import AppBar from "components/AppBar";
import Box from "@mui/material/Box";
import { Head } from "@inertiajs/react";

interface LayoutProps {
    children: ReactNode;
    title?: string;
};

const Layout: FC<LayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head title={title} />
            <AppBar />
            <Box component="main">
                {children}
            </Box>
        </>
    )
}

export default Layout;
