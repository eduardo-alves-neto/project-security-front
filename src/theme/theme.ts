import {
  Components,
  createTheme,
  PaletteOptions,
  Theme,
} from "@mui/material/styles";

export const palette: PaletteOptions = {
  primary: {
    main: "#001848",
    "50": "#9495b0",
    "100": "#483078",
    "200": "#301860",
  },
  secondary: {
    main: "#906090",
    "100": "#604878",
  },
  text: {
    primary: "#171923",
    secondary: "#718096",
  },
  background: {
    default: "#EFEFEF",
    paper: "#f5f5f5",
  },
  divider: "#d4c8fa",
};

export const components: Components<Omit<Theme, "components" | "palette">> = {
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "6px",
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "9px",
        },
      },
    },
  },
};

export const theme = createTheme({
  palette: palette,
  components: components,
  typography: {
    fontFamily: "Inter, Poppins, Arial, sans-serif",
  },
});
