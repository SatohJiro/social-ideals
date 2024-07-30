import React, { StrictMode } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "@/routers/AppRouter";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { getDesignTokens, getThemedComponents } from "./theme";

const ThemeWrapper = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode);

  const theme = React.useMemo(
    () =>
      createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))),
    [mode]
  );

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const App = ({ store, persistor }) => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading</div>} persistor={persistor}>
        <ThemeWrapper>
          <AppRouter />
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  </StrictMode>
);

export default App;
