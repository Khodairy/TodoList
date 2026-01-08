import "./App.css";
import ChildApp from "./ChildApp";
import { ToastProvider } from "./UseContext/toastContext";
import { TodosProvider } from "./UseContext/todoContext";

function App() {
  return (
    <div className="App" style={{ direction: "rtl" }}>
      <ToastProvider>
        <TodosProvider>
          <ChildApp />
        </TodosProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
