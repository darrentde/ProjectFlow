import { useDisclosure } from "@chakra-ui/hooks";
import { Button, Flex, Text } from "@chakra-ui/react";
// import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
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
  // const [modulecodeManage, setModuleCodeManage] = useState(null);

  // const handleInserts = (payload) => {
  //   console.log("Change received!", payload);
  // };

  // const { data, error } = await supabase
  //   .from("todos")
  //   .on("INSERT", handleInserts)
  //   .subscribe();

  useEffect(() => {
    const getModules = async () => {
      const { data, error } = await supabase.from("modules").select("*");
      if (!error) {
        // console.log(data);
        setModuleCodesManage(data);
      }
    };
    getModules();
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/signin");
  //   }
  // }, [user, router]);

  // const mySubscription = supabase
  //   .from("todos")
  //   .on("*", (payload) => {
  //     // setTodos(payload);
  //     console.log("Change received!", payload);
  //   })
  //   .subscribe();
  const getTodos = useCallback(async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("insertedat", { ascending: false });
    if (!error) {
      // console.log(data);
      setTodos(data);
    }
  }, []);

  // Show todo
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  useEffect(() => {
    const todoListener = supabase
      .from("todos")
      .on("*", (payload) => {
        console.log("Yes");
        const newTodo = payload.new;
        setTodos((oldTodos) => {
          const newTodos = [newTodo, ...oldTodos];
          return newTodos;
        });
      })
      .subscribe();

    return () => {
      todoListener.unsubscribe();
    };
  }, []);

  // if (user) {
  //   supabase
  //     .from("todos")
  //     .select("*")
  //     .eq("user_id", user?.id)
  //     .order("id", { ascending: false })
  //     .then(({ data, error }) => {
  //       if (!error) {
  //         console.log(data);
  //         setTodos(data);
  //       }
  //     });
  // }
  // }, [user, todos]);
  // The second argument, useEffect it pays attention what that param changes

  // useEffect(() => {
  //   const todoListener = supabase
  //     .from("todos")
  //     .on("*", (payload) => {
  //       console.log(payload.eventType);
  //       if (payload.eventType !== "DELETE") {
  //         const newTodo = payload.new;
  //         setTodos((oldTodos) => {
  //           const exists = oldTodos.find(
  //             (todoItem) => todoItem.id === newTodo.id
  //           );
  //           let newTodos;
  //           if (exists) {
  //             const oldTodoIndex = oldTodos.findIndex(
  //               (obj) => obj.id === newTodo.id
  //             );
  //             oldTodos[oldTodoIndex] = newTodo;
  //             newTodos = oldTodos;
  //           } else {
  //             newTodos = [...oldTodos, newTodo];
  //           }
  //           newTodos.sort((a, b) => b.id - a.id);
  //           return newTodos;
  //         });
  //       }
  //     })
  //     .subscribe();

  //   return () => {
  //     todoListener.unsubscribe();
  //   };
  // });

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
