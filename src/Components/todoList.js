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
// import { ToastContext } from "../UseContext/toastContext";
import { useToast } from "../UseContext/toastContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  // const { handleSnakBar } = useContext(ToastContext);
  const { handleSnakBar } = useToast();

  const [inputField, setInputField] = useState("");
  const [typeOfArray, setTypeOfArray] = useState("all");

  // تحميل الـ todos من localStorage عند أول Render
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, [setTodos]);

  // حفظ أي تحديث على todos تلقائيًا
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleButtonClick = () => {
    if (inputField.trim() === "") return; // منع إضافة مهمة فارغة

    const newTodo = {
      id: uuidv4(),
      title: inputField.trim(),
      details: "",
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setInputField(""); // مسح حقل الإدخال بعد الإضافة

    handleSnakBar("تم اضافة مهمة جديدة بنجاح");
  };

  // ToggleButton handler
  const handlerTypeOfArray = (event, newValue) => {
    if (newValue !== null) {
      setTypeOfArray(newValue);
    }
  };

  // فلترة المهام
  const completed = todos.filter((t) => t.isCompleted);
  const notCompleted = todos.filter((t) => !t.isCompleted);

  const todosRender =
    typeOfArray === "completed"
      ? completed
      : typeOfArray === "notCompleted"
      ? notCompleted
      : todos;

  let [dialogTodo, setDialogTodo] = useState(null);
  // ==== Delete Dialog =====
  const [open, setOpen] = useState(false);

  const handleOpenDeleteDialog = (todo) => {
    setDialogTodo(todo);
    setOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpen(false);
  };

  function handleDeleteConfirm() {
    const updateTodos = todos.filter((t) => {
      return t.id !== dialogTodo.id;
    });
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setTodos(updateTodos);
    setOpen(false);
    handleSnakBar("تم الحذف  بنجاح");
  }

  // ==== Edit Dialog =====

  const [openE, setOpenE] = useState(false);
  const [updateDailog, setUpdateDailog] = useState({
    title: "",
    details: "",
  });

  const handleOpenEditDialog = (todo) => {
    setDialogTodo(todo);
    setUpdateDailog({ title: todo.title, details: todo.details });
    setOpenE(true);
  };

  const handleSubmit = () => {
    if (!dialogTodo) return;
    const updateTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return {
          ...t,
          title: updateDailog.title,
          details: updateDailog.details,
        };
      }
      return t;
    });
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setTodos(updateTodos);
    setOpenE(false);
    handleSnakBar("تم التعديل  بنجاح");
  };

  const todoItems = todosRender.map((e) => (
    <div key={e.id}>
      <TodoInfo
        todo={e}
        ShowDeleteDialog={handleOpenDeleteDialog}
        ShowEditeDialog={handleOpenEditDialog}
      />
    </div>
  ));

  return (
    <>
      {/* ========= Delelte Dialog ========= */}
      <Dialog
        open={open}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من رغبتك في حذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامة
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>اغلاق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* ========= Update Dialog ========= */}
      <Dialog
        open={openE}
        onClose={() => {
          setOpenE(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمة"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            value={updateDailog.title}
            onChange={(event) => {
              setUpdateDailog({ ...updateDailog, title: event.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={updateDailog.details}
            onChange={(event) => {
              setUpdateDailog({ ...updateDailog, details: event.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenE(false);
            }}
          >
            اغلاق
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* ========= Main Todos content ========= */}
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflowY: "scroll" }}
        >
          <CardContent>
            {/* ========= Title ========= */}
            <Typography variant="h2" color="text.secondary" gutterBottom>
              مهامي
              <Divider />
            </Typography>

            {/* ========= Buttons of Todos status ========= */}
            <div style={{ direction: "ltr", marginBottom: "10px" }}>
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
            </div>

            {todoItems}

            {/* ========= Adding new todo ========= */}
            <Box sx={{ width: "100%", marginTop: "20px" }}>
              <Grid container spacing={1}>
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
                    disabled={inputField.trim() === ""}
                  >
                    اضافة
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
