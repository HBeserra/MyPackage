import variables from '../styles/theme.module.scss';

const colors = {
  true: {
    primary: variables.primary,
    secondary: "#ffffff44",
    success: variables.success,
    info: variables.info,
    warning: variables.warning,
    danger: variables.danger,
    light: "#5c6773ff",
    dark: "#458ce9",
    text: "#ffffffbb",
    background: "#212733",
    mapbox: "hbeserra/ckqrwkhvy59n918mfcbu4jxlz",
  },
  false: {
    primary: variables.primary,
    secondary: variables.secondary,
    success: variables.success,
    info: variables.info,
    warning: variables.warning,
    danger: variables.danger,
    light: variables.light,
    dark: "#0d3263",
    background: variables.background,
    text: variables.dark,
    mapbox: "hbeserra/ckpprd2qu089z17qm3npvqn1l",
  }
}

export default colors;