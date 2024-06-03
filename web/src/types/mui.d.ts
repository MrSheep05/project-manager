import { PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    shadow: PaletteMode;
  }
  interface PaletteOptions {
    shadow: PaletteColorOptions;
  }
}
