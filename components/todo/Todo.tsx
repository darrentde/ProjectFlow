import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Button, HStack, SimpleGrid, Tag } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ManageTodo from "./ManageTodo";
import SingleTodo from "./SingleTodo";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/lib/auth/useAuth";

const Todo = () => {
  const initialRef = useRef();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useAuth();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/signin");
  //   }
  // }, [user, router]);

  useEffect(() => {
    if (user) {
      supabase
        .from("todos")
        .select("*")
        .eq("user_id", user?.id)
        .order("id", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setTodos(data);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    const todoListener = supabase
      .from("todos")
      .on("*", (payload) => {
        if (payload.eventType !== "DELETE") {
          const newTodo = payload.new;
          setTodos((oldTodos) => {
            const exists = oldTodos.find(
              (todoItem) => todoItem.id === newTodo.id
            );
            let newTodos;
            if (exists) {
              const oldTodoIndex = oldTodos.findIndex(
                (obj) => obj.id === newTodo.id
              );
              oldTodos[oldTodoIndex] = newTodo;
              newTodos = oldTodos;
            } else {
              newTodos = [...oldTodos, newTodo];
            }
            newTodos.sort((a, b) => b.id - a.id);
            return newTodos;
          });
        }
      })
      .subscribe();

    return () => {
      todoListener.unsubscribe();
    };
  }, []);

  const openHandler = (clickedTodo) => {
    setTodo(clickedTodo);
    onOpen();
  };

  const deleteHandler = async (todoId) => {
    setIsDeleteLoading(true);
    const { error } = await supabase.from("todos").delete().eq("id", todoId);
    if (!error) {
      setTodos(todos.filter((todoItem) => todoItem.id !== todoId));
    }
    setIsDeleteLoading(false);
  };

  return (
    <Box
      position="absolute"
      top="200px"
      left="160px"
      bg="white"
      border="0.1rem solid black"
      width="400px"
      // maxHeight="500px"
      // overflowY="scroll"
    >
      <h2>Todo List</h2>
      <Button onClick={onOpen}>Add New Todo</Button>
      {/* Map as a list <SingleTodo></SingleTodo> */}
      <ManageTodo
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        todo={todo}
        setTodo={setTodo}
        deleteHandler={deleteHandler}
        isDeleteLoading={isDeleteLoading}
      />
      {todos.map((todoItem) => (
        <SingleTodo
          todo={todoItem}
          key={todoItem.id}
          openHandler={openHandler}
        />
      ))}
    </Box>
  );
};

export default Todo;
