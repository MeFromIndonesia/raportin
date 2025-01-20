import type { ListSubheaderProps } from "@mui/material/ListSubheader";
import type { Items } from "./items";

import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import MuiListSubheader from "@mui/material/ListSubheader";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { MobileSidebarItem, SidebarItem } from "./SidebarItem";

const MobileListSubHeader = styled(MuiListSubheader)(({ theme }) => ({
  ...theme.typography.caption,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const ListSubheader = styled(
  ({ ...props }: ListSubheaderProps & { open: boolean }) => (
    <MuiListSubheader {...props} />
  ),
  {
    shouldForwardProp: (prop) => prop !== "open",
  }
)(({ theme }) => ({
  ...theme.typography.caption,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        transition: theme.transitions.create(
          ["opacity", "margin-top", "padding-top", "padding-bottom"],
          {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }
        ),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        pointerEvents: "none",
        opacity: 0,
        marginTop: theme.spacing(-2),
        transition: theme.transitions.create(
          ["opacity", "margin-top", "padding-top", "padding-bottom"],
          {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }
        ),
      },
    },
  ],
}));

function MobileSidebarList({
  item,
  onClose,
}: {
  item: Items;
  onClose: () => void;
}) {
  return (
    <List
      subheader={<MobileListSubHeader>{item.groupLabel}</MobileListSubHeader>}
    >
      {item.groupItems.map((groupItem) => (
        <MobileSidebarItem
          key={groupItem.name}
          item={groupItem}
          onClose={onClose}
        />
      ))}
    </List>
  );
}

function SidebarList({ item, open }: { item: Items; open: boolean }) {
  return (
    <List
      subheader={<ListSubheader open={open}>{item.groupLabel}</ListSubheader>}
    >
      <TransitionGroup>
        {item.groupItems
          .filter((groupItem) => open || !groupItem.hideOnCollapsed)
          .map((groupItem) => (
            <Collapse
              in={open || !groupItem.hideOnCollapsed}
              key={groupItem.name}
            >
              <SidebarItem key={groupItem.name} item={groupItem} open={open} />
            </Collapse>
          ))}
      </TransitionGroup>
    </List>
  );
}

export { MobileSidebarList, SidebarList };
