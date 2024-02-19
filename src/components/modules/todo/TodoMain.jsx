"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import TodoCard from "./TodoCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { errorToast, successToast } from "@/utils/toaster";

const TodoMain = () => {
  const { setStorageItem, getStorageItem } = useLocalStorage();
  const [todoValue, setTodoValue] = useState("");
  const [todoList, setTodoList] = useState(getStorageItem("todo") ?? []);
  const [todoEditValues, setTodoEditValues] = useState({});

  const handleTodoChange = (event) => {
    setTodoValue(event.target.value);
  };

  const handleAddTodo = (event) => {
    const todoData = {
      id: Math.random(),
      todo: todoValue,
    };
    event.preventDefault();
    if (todoValue === "") return;
    if (todoEditValues?.id) {
      const updatedTodo = todoList?.map((items) =>
        items?.id === todoEditValues?.id ? { ...items, todo: todoValue } : items
      );
      setTodoList(updatedTodo);
      setTodoValue("");
      setStorageItem("todo", updatedTodo);
      successToast("Todo updated");
    } else {
      const isTodoExist = todoList?.find((items) => items?.todo === todoValue);
      if (isTodoExist) {
        errorToast("This todo is already exist");
      } else {
        const updatedTodo = [...todoList, todoData];
        setTodoList(updatedTodo);
        setTodoValue("");
        setStorageItem("todo", updatedTodo);
        successToast("Todo added");
      }
    }
    setTodoEditValues({});
  };

  const handleDeleteTodo = (todoId) => {
    const filterTodo = todoList?.filter((items) => items?.id !== todoId);
    setTodoList(filterTodo);
    setStorageItem("todo", filterTodo);
    successToast("Todo deleted");
  };

  const handleEditTodo = (todo) => {
    const editTodoValue = todoList?.find((items) => items?.id === todo?.id);
    setTodoValue(editTodoValue?.todo);
    setTodoEditValues(editTodoValue);
  };

  return (
    <>
      <div className="container py-10">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleAddTodo}>
            <Input
              label="Add Todo"
              placeholder="Add todo"
              variant="faded"
              color="primary"
              size="lg"
              value={todoValue}
              onChange={handleTodoChange}
              endContent={
                <Button color="primary" type="submit">
                  {todoEditValues?.id ? "Update Todo" : "Add Todo"}
                </Button>
              }
            />
          </form>
          {todoList.length > 0 && (
            <div className="mt-10 space-y-4">
              {todoList.map((items) => (
                <TodoCard
                  key={items}
                  items={items}
                  handleEditTodo={() => handleEditTodo(items)}
                  handleDeleteTodo={() => handleDeleteTodo(items?.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoMain;
