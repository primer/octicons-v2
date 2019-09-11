import colors from "primer-colors"

export default {
  initialColorMode: "light",
  colors: {
    text: colors.gray[8],
    background: colors.white,
    modes: {
      dark: {
        text: colors.gray[2],
        background: colors.black,
      },
    },
  },
  fonts: {
    body: "system-ui, sans-serif",
  },
  fontWeights: {
    bold: 600,
    body: 400,
  },
}
