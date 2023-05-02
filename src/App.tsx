import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { ThemeProvider } from "@mui/system";
import { themeOptions } from "./theme";
import { createTheme } from "@mui/material";


function App() {

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme} >
      <MainPage/>
    </ThemeProvider>
  );
}

export default App;
