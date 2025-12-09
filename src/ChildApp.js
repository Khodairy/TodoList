import TodoList from "./Components/todoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "./UseContext/todoContext";
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: indigo[500],
    },
  },
  typography: {
    fontFamily: "Alexandria",
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "انا اريد قراءة العديد من الكتب في كل شهر",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "الذهاب الي الجيم",
    details: "الذهاب الي الجيم لمدة ساعة ونصف كل يوم ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "الذهاب الي التمرين",
    details: "الذهاب الي التمرين لمدة ساعتين في يوم والتمرين 3 ايام بالأسبوع",
    isCompleted: false,
  },
];

export default function ChildApp() {
  const [todos, setTodos] = useState(initialTodos);
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
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}
