import {
  Components,
  createTheme,
  PaletteOptions,
  Theme,
} from "@mui/material/styles";

export const palette: PaletteOptions = {
  primary: {
    main: "#1C4532",
  },
  text: {
    primary: "#171923",
    secondary: "#718096",
  },
  background: {
    default: "#F0F0EC",
    paper: '"#f5f5f5"',
  },
};

export const components: Components<Omit<Theme, "components" | "palette">> = {
  MuiButton: {
    styleOverrides: {
      root: {},
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "12px",
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
