import {
  Box,
  IconButton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSettings } from "../../../contexts/settingsContext";
import { DRAWER_WIDTH } from "../menu-drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { IoMenuOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { supabase } from "../../../supabase";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isMobile?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, isMobile }) => ({
  zIndex: !isMobile ? theme.zIndex.drawer + 1 : 0,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: !isMobile ? DRAWER_WIDTH : 0,
        width: `calc(100% - ${!isMobile ? DRAWER_WIDTH : 0}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export default function NavBar() {
  const { openDrawer: open, setOpenDrawer } = useSettings();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  return (
    <AppBar
      position="fixed"
      open={open}
      color="default"
      sx={{
        height: 45,
        boxShadow: "none",
      }}
      isMobile={isMobile}
    >
      <Stack
        height={45}
        borderBottom={1}
        borderColor={theme.palette.divider}
        flexDirection="row"
      >
        <Box
          sx={{
            width: `calc(${theme.spacing(7)} + 8px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          position={open ? "absolute" : "relative"}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={[open && { display: "none", position: "absolute" }]}
          >
            <IoMenuOutline />
          </IconButton>
        </Box>

        <Stack flex={1} ml={1}>
          <Typography variant="h6" flex={1} component="div">
            Mini variant drawer
          </Typography>
        </Stack>

        <Stack>
          <IconButton onClick={() => supabase.auth.signOut()}>
            <MdLogout />
          </IconButton>
        </Stack>
      </Stack>
    </AppBar>
  );
}
