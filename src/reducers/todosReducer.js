import { v4 as uuidv4 } from "uuid";

export function reducer(currentTodo, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const updateTodos = [...currentTodo, newTodo];
      return updateTodos;
    }
    case "deleted": {
      return currentTodo.filter((t) => t.id !== action.payload.id);
    }
    case "updating": {
      const { id, ...updates } = action.payload;
      if (!id) return currentTodo;
      return currentTodo.map((t) => (t.id === id ? { ...t, ...updates } : t));
    }

    default: {
      throw Error("Unknown Action " + action.type);
    }
  }
}
