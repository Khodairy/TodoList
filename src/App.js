import "./App.css";
import ChildApp from "./ChildApp";
import { ToastProvider } from "./UseContext/toastContext";

function App() {
  return (
    <div className="App" style={{ direction: "rtl" }}>
      <ToastProvider>
        <ChildApp />
      </ToastProvider>
    </div>
  );
}

export default App;
