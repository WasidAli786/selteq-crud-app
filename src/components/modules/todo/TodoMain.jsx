"use client";

import { useState } from "react";
import { Button, Input, ScrollShadow } from "@nextui-org/react";
import TodoCard from "./TodoCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { errorToast, successToast } from "@/utils/toaster";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { reorder } from "@/utils/reorder";
import DigitalClock from "./DigitalClock";

const TodoMain = () => {
  const { setStorageItem, getStorageItem } = useLocalStorage();
  const [todoValue, setTodoValue] = useState("");
  const [todoList, setTodoList] = useState(getStorageItem("todo") ?? []);
  const [todoEditValues, setTodoEditValues] = useState({});

  // *For setting the todo value in the state
  const handleTodoChange = (event) => {
    setTodoValue(event.target.value);
  };

  // *For create and update todo item
  const handleAddUpdateTodo = (event) => {
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

  // *For delete the todo item
  const handleDeleteTodo = (todoId) => {
    const filterTodo = todoList?.filter((items) => items?.id !== todoId);
    setTodoList(filterTodo);
    setStorageItem("todo", filterTodo);
    successToast("Todo deleted");
  };

  // *For setting the single todo value for edit
  const handleEditTodo = (todo) => {
    const editTodoValue = todoList?.find((items) => items?.id === todo?.id);
    setTodoValue(editTodoValue?.todo);
    setTodoEditValues(editTodoValue);
  };

  // *For drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedList = reorder(
      todoList,
      result.source.index,
      result.destination.index
    );
    setTodoList(updatedList);
    setStorageItem("todo", updatedList);
  };

  return (
    <>
      <div className="container py-10">
        <div className="max-w-xl mx-auto">
          <DigitalClock />
          <form onSubmit={handleAddUpdateTodo} className="mt-5">
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="draggable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {todoList.length > 0 && (
                    <ScrollShadow className="h-[75vh] mt-5" size={10}>
                      <div className="space-y-5">
                        {todoList.map((items, index) => (
                          <Draggable
                            key={`draggable-id-${items.id}`}
                            draggableId={`draggable-id-${items.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TodoCard
                                  key={items}
                                  items={items}
                                  handleEditTodo={() => handleEditTodo(items)}
                                  handleDeleteTodo={() =>
                                    handleDeleteTodo(items?.id)
                                  }
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    </ScrollShadow>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default TodoMain;
