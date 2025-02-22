import React, { useState } from "react";
import TodoType from "../utils/todo";
import TodoService from "../Services/TodoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import TodoForm from "./TodoForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");
  const [editedDueDate, setEditedDueDate] = useState<Date | null>(null);

  const handleEditStart = (id: number, text: string, dueDate: Date | null) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
    setEditedDueDate(dueDate);
  };

  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
    setEditedDueDate(null);
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updatedTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        dueDate: editedDueDate,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setEditingTodoId(null);
      setEditedTodoText("");
      setEditedDueDate(null);
    }
  };

  const handleDelete = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      handleEditSave(id);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-h-screen overflow-y-auto  h-[500px]">
      <div className="mb-4 flex ml-[400px] fixed z-10">
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="mt-[130px]">
        {todos.map((todo) => (
          <div
            className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg shadow-sm transition duration-300 transform hover:scale-105"
            key={todo.id}
          >
            {editingTodoId === todo.id ? (
              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, todo.id)}
                  autoFocus={true}
                  className="flex-grow p-2 mr-2 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <DatePicker
                  selected={editedDueDate}
                  onChange={(date) => setEditedDueDate(date)}
                  className="p-2 mr-2 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <button
                  onClick={() => handleEditSave(todo.id)}
                  className="p-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={handleEditCancel}
                  className="p-2 ml-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
                >
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="flex items-center w-full">
                <span className="flex-grow">{todo.text}</span>
                {todo.dueDate && (
                  <span className="text-sm text-gray-500 ml-2">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
                <button
                  onClick={() =>
                    handleEditStart(todo.id, todo.text, todo.dueDate)
                  }
                  className="p-2 text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="p-2 ml-2 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
                >
                  <GiCancel />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
