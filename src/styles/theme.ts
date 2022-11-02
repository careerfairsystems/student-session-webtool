import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/buttonStyles";

export const arkadTheme = extendTheme({
  fonts: {
    heading: `'Myriad Pro Bold Condensed', sans-serif`,
    body: `'Myriad Pro Bold Condensed', sans-serif`,
  },
  colors: {
    ArkadDarkBlue: '#041224',
    darkRed: '#7E0000',
    darkYellow: '#19A1DB',
    lightGray: '#D1D1D1',
    ArkadLightBlue: '#19A1DB',
    ArkadOrange: '#F66628',
    lightGreen: '#007E3A',
    lightRed: '#CB0000',
    ArkadWhite: '#ffffff',
    black: '#000000',
    ArkadGray: '#333333',
  },
  components: {
    Button,
  },
});