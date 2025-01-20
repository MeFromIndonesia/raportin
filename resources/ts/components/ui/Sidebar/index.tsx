import type { Theme } from "@mui/material/styles";
import type { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer";

import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import useSidebar from "./useSidebar";
import { MobileSidebarList, SidebarList } from "./SidebarList";
import items from "./items";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_CLOSED = "3.75rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";

const openedMixin = (theme: Theme) => ({
  width: SIDEBAR_WIDTH,
  transition: theme.transitions.create(["width", "padding-top"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create(["width", "padding-top"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: SIDEBAR_WIDTH_CLOSED,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    top: "4rem",
    height: "calc(100% - 4rem)",
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          overflowY: "hidden",
          ...closedMixin(theme),
        },
      },
    },
  ],
}));

const MobileDrawer = styled(({ ...props }: SwipeableDrawerProps) => (
  <SwipeableDrawer elevation={0} {...props} />
))(() => ({
  "& .MuiDrawer-paper": {
    width: SIDEBAR_WIDTH_MOBILE,
  },
}));

function Sidebar() {
  const { open, mobile, setOpen } = useSidebar();

  if (mobile) {
    return (
      <MobileDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {items.map((item, i) => (
          <Fragment key={item.groupLabel}>
            {i !== 0 && <Divider aria-hidden="true" />}
            <MobileSidebarList item={item} onClose={() => setOpen(false)} />
          </Fragment>
        ))}
      </MobileDrawer>
    );
  }

  return (
    <Drawer variant="permanent" open={open}>
      <TransitionGroup>
        {items
          .filter((item) => open || !item.hideOnCollapsed)
          .map((item, i) => (
            <Collapse key={item.groupLabel}>
              {i !== 0 && <Divider aria-hidden="true" />}
              <SidebarList item={item} open={open} />
            </Collapse>
          ))}
      </TransitionGroup>
    </Drawer>
  );
}

export default Sidebar;
