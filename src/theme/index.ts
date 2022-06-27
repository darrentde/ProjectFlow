import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `Montserrat, ${base.fonts?.heading}`,
    body: `Inter, ${base.fonts?.body}`,
  },
  colors: {
    brand: {
      100: "#C996CC",
      200: "#916BBF",
      300: "#3D2C8D",
      400: "#1C0C5B",
    },
  },
});

export default theme;
