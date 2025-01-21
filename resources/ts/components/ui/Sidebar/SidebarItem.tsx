/* eslint-disable react-hooks/exhaustive-deps */
import type { Items } from "./items";
import type { ListItemButtonProps as MuiListItemButtonProps } from "@mui/material/ListItemButton";

import { forwardRef, useEffect } from "react";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "ui/Tooltip";
import { LinkPrimitive } from "ui/Link";

type ListItemButtonProps<C extends React.ElementType = typeof LinkPrimitive> = MuiListItemButtonProps<C> & {
  href?: string;
};

const ListItemButton = styled(
  forwardRef<HTMLAnchorElement, ListItemButtonProps<typeof LinkPrimitive>>(({ href, ...props }, ref) => (
    <MuiListItemButton component={LinkPrimitive} href={href} ref={ref} {...props} />
  ))
)(({ theme }) => ({
  height: 43,
  borderRadius: 2.5 * theme.shape.borderRadius,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 11,
  paddingRight: 11,
}));

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  "& .MuiTypography-root": theme.typography.body2,
}));

function MobileSidebarItem({ item, onClose }: { item: Items["groupItems"][0]; onClose: () => void }) {
  const currentPage = location.pathname === item.url;

  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [location.pathname]);

  return (
    <ListItem
      disablePadding
      sx={{ px: 2 }}
      aria-label={item.name}
      secondaryAction={
        item.action && (
          <Tooltip title={item.action.name}>
            <IconButton LinkComponent={LinkPrimitive} href={item.action.url} edge="end">
              <item.action.icon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      }
    >
      <ListItemButton selected={currentPage} href={item.url}>
        <ListItemIcon
          sx={
            currentPage
              ? {
                  color: (theme) => theme.palette.primary.main,
                }
              : undefined
          }
        >
          <item.icon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </ListItem>
  );
}

function SidebarItem({ item, open }: { item: Items["groupItems"][0]; open: boolean }) {
  const currentPage = location.pathname === item.url;

  return (
    <ListItem
      disablePadding
      sx={{ px: 1, "& .MuiListItemButton-root": { pr: 0 }, "& .MuiIconButton-root": { mr: "0px !important" } }}
      aria-label={item.name}
      secondaryAction={
        <TransitionGroup>
          {item.action && open && (
            <Collapse>
              <Tooltip title={item.action.name}>
                <IconButton LinkComponent={LinkPrimitive} href={item.action.url}>
                  <item.action.icon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Collapse>
          )}
        </TransitionGroup>
      }
    >
      <Tooltip title={!open && item.name} arrow placement="right">
        <ListItemButton selected={currentPage} href={item.url}>
          <ListItemIcon
            sx={[
              {
                minWidth: 0,
                justifyContent: "center",
                mx: "auto",
                transition: (theme) =>
                  theme.transitions.create(["opacity", "color"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
              },
              currentPage && {
                color: (theme) => theme.palette.primary.main,
              },
            ]}
          >
            <item.icon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            sx={[
              {
                transition: (theme) =>
                  theme.transitions.create(["opacity", "margin-left"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                "& .MuiTypography-root": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              },
              open
                ? {
                    opacity: 1,
                    ml: 3,
                  }
                : {
                    opacity: 0,
                    ml: 0,
                  },
            ]}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

export { MobileSidebarItem, SidebarItem };
