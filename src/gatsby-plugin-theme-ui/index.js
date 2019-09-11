import colors from "primer-colors"

export default {
  initialColorMode: "light",
  colors: {
    text: colors.gray[8],
    background: colors.white,
    border: colors.gray[3],
    modes: {
      dark: {
        text: colors.gray[2],
        background: colors.black,
        border: colors.gray[5],
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
