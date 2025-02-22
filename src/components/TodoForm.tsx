import React, { Dispatch, SetStateAction, useState } from "react";
import TodoService from "../Services/TodoService";
import TodoType from "../utils/todo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newTodoText, dueDate);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
      setDueDate(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-6 bg-white rounded-lg shadow-lg w-[600px]  mx-auto border-2 border-black-600">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyPress={handleKeyPress}
        autoFocus={true}
        placeholder="Add new Task"
        className="flex-grow p-3 mb-4 sm:mb-0 sm:mr-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        placeholderText="Select due date"
        className="p-3 mb-4 sm:mb-0 sm:mr-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <button
        onClick={handleAddTodo}
        className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105"
      >
        Add
      </button>
    </div>
  );
};

export default TodoForm;
