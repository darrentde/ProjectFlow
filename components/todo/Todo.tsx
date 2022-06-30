import { useDisclosure } from "@chakra-ui/hooks";
import { Button, Flex, Text } from "@chakra-ui/react";
// import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import ManageTodo from "./ManageTodo";
import SingleTodo from "./SingleTodo";
import { supabase } from "../../src/lib/supabase";

const Todo = () => {
  // const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [modulecodesManage, setModuleCodesManage] = useState([]);

  async function fetchModules() {
    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .order("insertedat", { ascending: false });
    if (!error) {
      setModuleCodesManage(data);
    }
  }

  async function fetchTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("insertedat", { ascending: false });
    if (!error) {
      setTodos(data);
    }
  }

  // Initial render
  useEffect(() => {
    fetchModules();
    fetchTodos();
  }, []);

  // If no dependency array, useeffect will run on mount and update
  // Current issue, adding new to dos renders on screen but updating to dos does not render
  useEffect(() => {
    const todoListener = supabase
      .from("todos")
      .on("*", (payload) => {
        if (payload.eventType !== "DELETE") {
          const newTodo = payload.new;

          // Check if new todo is in list
          setTodos((currentTodos) => {
            const targetTodoIndex = currentTodos.findIndex(
              (obj) => obj.id === newTodo.id
            );

            let newTodos;
            if (targetTodoIndex !== -1) {
              currentTodos[targetTodoIndex] = newTodo;
              newTodos = currentTodos;
              // console.log(payload.eventType);
            } else {
              newTodos = [newTodo, ...currentTodos];
              // console.log(payload.eventType);
            }
            // console.log(newTodos);
            return newTodos;
          });
        }
      })
      .subscribe();

    return () => {
      todoListener.unsubscribe();
    };
  });

  // Get updates for modules

  const openHandler = (clickedTodo) => {
    setTodo(clickedTodo);
    // setModuleCodeManage(clickedTodo);
    onOpen();
  };

  // Delete works
  const deleteHandler = async (todoId) => {
    // setIsDeleteLoading(true);
    const { error } = await supabase.from("todos").delete().eq("id", todoId);
    if (!error) {
      setTodos(todos.filter((todoItem) => todoItem.id !== todoId));
    }
    // setIsDeleteLoading(false);
  };

  return (
    <Draggable bounds="body" handle=".Header">
      <Flex
        position="absolute"
        top="200px"
        left="320px"
        bg="white"
        border="0.1rem solid black"
        width="400px"
        maxHeight="500px"
        borderRadius="10px"
        overflowY="scroll"
        direction="column"
      >
        {/* <Button onClick={fetchModules()}>Test</Button> */}
        <Flex className="Header" cursor="pointer">
          <Text p="2" fontSize="md">
            Todo List
          </Text>
        </Flex>
        <Flex>
          <Button ml="2" size="sm" onClick={onOpen}>
            Add New Todo
          </Button>
        </Flex>

        {/* Map as a list <SingleTodo></SingleTodo> */}
        <ManageTodo
          isOpen={isOpen}
          onClose={onClose}
          initialRef={initialRef}
          todo={todo}
          setTodo={setTodo}
          deleteHandler={deleteHandler}
          // isDeleteLoading={isDeleteLoading}
          modules={modulecodesManage}
          // setModule={setModuleCodeManage}
        />

        {todos.map((todoItem) => (
          <SingleTodo
            key={todoItem.id}
            todo={todoItem}
            openHandler={openHandler}
          />
        ))}
      </Flex>
    </Draggable>
  );
};

export default Todo;
