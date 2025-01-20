import type { LinkProps as MuiLinkProps } from "@mui/material/Link";

import { forwardRef } from "react";
import { Link as InertiaLink, InertiaLinkProps } from "@inertiajs/react";
import MuiLink from "@mui/material/Link";
import { styled } from "@mui/material/styles";

const LinkPrimitive = styled(
  forwardRef<HTMLAnchorElement, Omit<InertiaLinkProps, "as">>(({href, ...props}, ref) => {
    return <InertiaLink ref={ref} href={href} {...props} />;
  })
)();

interface LinkProps extends Omit<MuiLinkProps<typeof LinkPrimitive>, "component"> {}

const Link = styled(
  forwardRef<HTMLAnchorElement, LinkProps>(({ href, ...props }, ref) => {
    return <MuiLink ref={ref} component={LinkPrimitive} href={href} {...props} />;
  })
)();

export default Link;
export { LinkPrimitive };
