import {darken, whiten} from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: {
      bg: 'ArkadOrange',
      color: 'ArkadWhite',
      rounded: 'full',
      p: "1.7rem",
      _hover: {
        bg: darken('ArkadOrange', 10),
      },
      loadingColor: whiten('ArkadOrange', 10),
    },
    card: {
      bg: 'ArkadDarkBlue',
      rounded: "md",
      p: "1.7rem",
      _hover: {
        bg: darken('ArkadDarkBlue', 10),
      },
      loadingColor: whiten('ArkadDarkBlue', 10),
    },
    accept: {
      bg: 'lightGreen',
      color: 'ArkadWhite',
      rounded: 'full',
      p: "1.7rem",
      _hover: {
        bg: darken('lightGreen', 10),
      },
      loadingColor: whiten('lightGreen', 10),
    },
    decline: {
      bg: 'lightRed',
      color: 'ArkadWhite',
      rounded: 'full',
      p: "1.7rem",
      _hover: {
        bg: darken('lightRed', 10),
      },
      loadingColor: whiten('lightRed', 10),
    },
    secondary: {
      bg: 'ArkadLightBlue',
      color: 'ArkadWhite',
      rounded: 'full',
      p: "1.7rem",
      _hover: {
        bg: darken('ArkadLightBlue', 10),
      },
      loadingColor: whiten('ArkadLightBlue', 10),
    },
  },
  defaultProps: {},
};

