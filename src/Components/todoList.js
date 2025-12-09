import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import TodoInfo from "./todoInfo";
import { TodosContext } from "../UseContext/todoContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [inputField, setInputField] = useState("");

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  });

  const handleButtonClick = () => {
    const newTodo = {
      id: uuidv4(),
      title: inputField,
      details: "",
      isCompleted: false,
    };
    const updateTodos = [...todos, newTodo];
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setInputField(""); // Clear the input field after adding the todo
  };

  // filter Arrays of todos

  const [typeOfArray, setTypeOfArray] = useState("all");

  function handlerTypeOfArray(e) {
    setTypeOfArray(e.target.value);
  }
  const completed = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompleted = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosRender = todos;

  if (typeOfArray === "completed") {
    todosRender = completed;
  } else if (typeOfArray === "notCompleted") {
    todosRender = notCompleted;
  } else {
    todosRender = todos;
  }

  const todoItems = todosRender.map((e) => (
    <div key={e.id}>
      <TodoInfo todo={e} />
    </div>
  ));

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflowY: "scroll" }}
      >
        <CardContent>
          <Typography variant="h2" color="text.secondary" gutterBottom>
            مهامي
            <Divider />
          </Typography>
          <div style={{ direction: "ltr" }}>
            <ToggleButtonGroup
              color="secondary"
              exclusive
              aria-label="Platform"
              value={typeOfArray}
              onChange={handlerTypeOfArray}
            >
              <ToggleButton value="notCompleted">غير منجز</ToggleButton>
              <ToggleButton value="completed">منجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
          </div>{" "}
          {todoItems}
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              spacing={1}
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ marginTop: "20px" }}
            >
              <Grid
                item
                xs={9}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={inputField}
                  onChange={(e) => setInputField(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={handleButtonClick}
                  disabled={inputField === 0}
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
