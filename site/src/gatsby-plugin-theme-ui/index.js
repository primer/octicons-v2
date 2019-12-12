import colors from "primer-colors"

export default {
  useCustomProperties: false,
  useColorSchemeMediaQuery: true,
  colors: {
    text: colors.gray[8],
    background: colors.white,
    border: colors.gray[2],
    muted: colors.gray[1],
    warningText: colors.gray[8],
    warningBg: colors.yellow[4],
    accent: colors.orange[6],
    modes: {
      dark: {
        text: colors.gray[1],
        background: colors.black,
        border: colors.gray[7],
        muted: colors.gray[9],
        warningText: colors.black,
        warningBg: colors.yellow[6],
        accent: colors.orange[6],
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
  radii: [0, 5],
  forms: {
    slider: {
      bg: "border",
    },
  },
}
