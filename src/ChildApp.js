import TodoList from "./Components/todoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
// 1. استورد الـ TodosProvider بدلاً من TodosContext
import { TodosProvider } from "./UseContext/todoContext";

const theme = createTheme({
  palette: {
    primary: { main: indigo[500] },
    secondary: { main: indigo[500] },
  },
  typography: { fontFamily: "Alexandria" },
});

export default function ChildApp() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#191b1f",
        }}
      >
        <TodosProvider>
          <TodoList />
        </TodosProvider>
      </div>
    </ThemeProvider>
  );
}
