import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

type Items = {
  groupLabel: string;
  hideOnCollapsed?: boolean;
  groupItems: {
    name: string;
    url: string;
    icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
    action?: {
      name: string;
      url: string;
      icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
    };
    hideOnCollapsed?: boolean;
  }[];
};

const items: Items[] = [
  {
    groupLabel: "Main",
    groupItems: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: DashboardOutlinedIcon,
      },
    ],
  },
  {
    groupLabel: "Siswa",
    groupItems: [
      {
        name: "Jelajahi Siswa",
        url: "/students",
        icon: PeopleAltOutlinedIcon,
        action: {
          name: "Tambah Siswa",
          url: "/students/add",
          icon: AddOutlinedIcon,
        },
      },
    ],
  },
  {
    groupLabel: "Mata Pelajaran",
    groupItems: [
      {
        name: "Jelajahi Mata Pelajaran",
        url: "/subjects",
        icon: LibraryBooksOutlinedIcon,
      },
    ],
  },
  {
    groupLabel: "User & Profile",
    groupItems: [
      {
        name: "Profile",
        url: "/profile",
        icon: PersonOutlinedIcon,
      },
      {
        name: "Settings",
        url: "/settings",
        icon: SettingsOutlinedIcon,
      },
    ],
  },
];

export default items;
export type { Items };
