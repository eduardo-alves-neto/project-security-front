import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IoPersonSharp } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { BsFileEarmarkPersonFill } from "react-icons/bs";

import { useNavigate } from "react-router";

// interface IListOptions {
//   routerOptions?: any;
// }

const listOptions = [
  {
    label: "Clientes",
    path: "customers",
    Icon: IoPersonSharp,
  },
  {
    label: "Colaboradores",
    path: "collaborator",
    Icon: BsFileEarmarkPersonFill,
  },
  {
    label: "Ocorrências",
    path: "occurrences",
    Icon: MdEventNote,
  },
];

export const ListOptions = () => {
  const navigate = useNavigate();

  return listOptions.map((item, index) => {
    return (
      <ListItem key={index} disablePadding>
        <ListItemButton onClick={() => navigate(item.path)} sx={{ pl: 3 }}>
          <ListItemIcon>{<item.Icon />}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      </ListItem>
    );
  });
};
