import {
  Box,
  IconButton,
  Popover,
  Stack,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSettings } from "../../../contexts/settingsContext";
import { DRAWER_WIDTH } from "../menu-drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { IoMenuOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import { FcSettings } from "react-icons/fc";
import { authService } from "../../../auth/services/auth";

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
  //const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        height: 45,
        boxShadow: "none",
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
      isMobile={isMobile}
    >
      <Stack
        height={45}
        flexDirection="row"
        borderBottom={1}
        borderColor="divider"
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
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={[open && { display: "none", position: "absolute" }]}
          >
            <IoMenuOutline />
          </IconButton>
        </Box>

        <Stack flex={1} ml={1}>
          {/* <Typography variant="h6" flex={1}>
            Mini variant drawer
          </Typography> */}
        </Stack>

        <Stack mr={1}>
          <IconButton onClick={handleClick}>
            <FcSettings />
          </IconButton>
          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <IconButton
              onClick={async () => {
                await authService.signOut();
              }}
            >
              <MdLogout color="" />
            </IconButton>
          </Popover>
        </Stack>
      </Stack>
    </AppBar>
  );
}
