import {
  IconButton,
  styled,
  Drawer as DrawerMobile,
  Box,
  useTheme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useSettings } from "../../../contexts/settingsContext";
import { MdOutlineMenuOpen } from "react-icons/md";
import { closedMixin, openedMixin } from "./styles";
import { ListOptions } from "./list-options-menu-drawer/listOptions";
import { useEffect } from "react";
export const DRAWER_WIDTH = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: 45,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
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
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export const MenuDrawer = () => {
  const { openDrawer, setOpenDrawer, isMobile } = useSettings();
  const theme = useTheme();

  useEffect(() => {
    if (isMobile) setOpenDrawer(false);
  }, [isMobile]);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      {isMobile ? (
        <DrawerMobile
          open={openDrawer}
          anchor="left"
          variant="temporary"
          onClose={handleDrawerClose}
        >
          <Box
            sx={{
              width: 250,
              backgroundColor: (theme) => theme.palette.background.paper,
              height: "100dvh",
            }}
          >
            Content
          </Box>
        </DrawerMobile>
      ) : (
        <Drawer
          variant={"permanent"}
          open={openDrawer}
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <DrawerHeader
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              {
                <MdOutlineMenuOpen
                  color={theme.palette.primary.main}
                  size={30}
                />
              }
            </IconButton>
          </DrawerHeader>

          <ListOptions />
        </Drawer>
      )}
    </>
  );
};
