import TodoType from "../utils/todo";
const LOCAL_STORAGE_KEY = "todoList";

const TodoService = {
     //get Todos
    getTodos: (): TodoType[] => {
        const todoString=localStorage.getItem(LOCAL_STORAGE_KEY);
        return todoString ? JSON.parse(todoString) : [];
    },
    //Adding Todos
    addTodos:(text: string, dueDate: Date | null):TodoType =>{
        const todos=TodoService.getTodos(); 
        const newTodo : TodoType={id: todos.length+1, text, completed:false, dueDate: null};
        const updatedTodos=[...todos, newTodo];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        return newTodo;
    },

    //updating the todos
    updateTodo:(todo:TodoType):TodoType=>{
        const todos=TodoService.getTodos();
        const updatedTodos=todos.map((t)=>t.id===todo.id ? todo : t);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        return todo;
    },
    //deleting the todos
    deleteTodo:(id:number):void=>{
        const todos=TodoService.getTodos();
        const updatedTodos=todos.filter((t)=>t.id!==id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
    }
};
export default TodoService;