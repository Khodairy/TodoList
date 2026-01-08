import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useToast } from "../UseContext/toastContext";
import { useTodos } from "../UseContext/todoContext";

export default function TodoInfo({ todo, ShowDeleteDialog, ShowEditeDialog }) {
  const { dispatch } = useTodos();
  // const { handleSnakBar } = useContext(ToastContext);
  const { handleSnakBar } = useToast();

  // ==== Done Button =====
  function handlerDoneBtn() {
    if (typeof dispatch !== "function") {
      console.error("dispatch is not a function in handlerDoneBtn", dispatch);
      handleSnakBar("خطأ داخلي: الرجاء إعادة تحميل الصفحة");
      return;
    }
    dispatch({ type: "updating", payload: { id: todo.id, isCompleted: !todo.isCompleted } });
    if (todo.isCompleted) {
      handleSnakBar("تم الأضافة للمهام الغير منجزة");
    } else {
      handleSnakBar("تمت الأضافة للمهام المنجزة");
    }
  }

  // =========== Delete Dialog ============
  function handleDeleteDialog() {
    ShowDeleteDialog(todo);
  }
  // =========== Edite Dialog ============
  function hadnleEditeDialog() {
    ShowEditeDialog(todo);
  }

  return (
    <>
      <Card
        className="card"
        sx={{ minWidth: 275 }}
        style={{
          backgroundColor: "#283593",
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={8} style={{ color: "white", textAlign: "right" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </Typography>
                <Typography variant="body1" component="div">
                  {todo.details}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  direction="row"
                  spacing={2}
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    className="iconButton"
                    aria-label="mark as done"
                    size="large"
                    style={{
                      marginLeft: "10px",
                      color: todo.isCompleted ? "white" : "#8bc34a",
                      border: "1px solid #8bc34a",
                      backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                    }}
                    onClick={handlerDoneBtn}
                  >
                    <DoneOutlinedIcon />
                  </IconButton>
                  <IconButton
                    className="iconButton"
                    aria-label="edit"
                    size="large"
                    style={{
                      marginLeft: "10px",
                      color: "#1769aa",
                      border: "1px solid #1769aa",
                      backgroundColor: "white",
                    }}
                    onClick={hadnleEditeDialog}
                  >
                    <CreateOutlinedIcon />
                  </IconButton>
                  <IconButton
                    className="iconButton"
                    aria-label="delete"
                    size="large"
                    style={{
                      marginLeft: "10px",
                      color: "#b23c17",
                      border: "1px solid #b23c17",
                      backgroundColor: "white",
                    }}
                    onClick={handleDeleteDialog}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
