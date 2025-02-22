import TodoType from "../utils/todo";
const LOCAL_STORAGE_KEY = "todoList";

const TodoService = {

    getTodos: (): TodoType[] => {
        const todoString=localStorage.getItem(LOCAL_STORAGE_KEY);
        return todoString ? JSON.parse(todoString) : [];
    }
};
export default TodoService;