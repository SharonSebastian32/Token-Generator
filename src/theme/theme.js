export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#1976d2",
          },
          error: {
            main: "#d32f2f",
          },
          background: {
            default: "#f5f5f5",
            paper: "#fff",
          },
        }
      : {
          primary: {
            main: "#3333F8FF",
          },
          error: {
            main: "#f44336",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
        }),
  },
});
