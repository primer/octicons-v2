import colors from "primer-colors"

export default {
  useColorSchemeMediaQuery: true,
  colors: {
    text: colors.gray[8],
    background: colors.white,
    border: colors.gray[3],
    muted: colors.gray[2],
    warningText: colors.gray[8],
    warningBg: colors.yellow[4],
    modes: {
      dark: {
        text: colors.gray[1],
        background: colors.black,
        border: colors.gray[6],
        muted: colors.gray[8],
        warningText: colors.black,
        warningBg: colors.yellow[6],
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
  radii: [0, 3, 6],
}
