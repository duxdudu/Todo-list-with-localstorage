import React from "react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="min-h-screen max-h-[600px] flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Schedulaling your Tasks</h1>
        <div className="w-full max-w-screen  h-[400px] border border-red-500 mb-[200px]">
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
