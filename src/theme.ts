import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      light: "#eeeeff",
      main: "#7878f3",
    },
  },
  typography: {
    button: {
      color: "#8787ff",
      textTransform: "capitalize",
      borderRadius: 5,
      fontSize: 14,
    },
  },
});

export default theme;
