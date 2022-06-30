import { useDisclosure } from "@chakra-ui/hooks";
import { Button, Flex, Text, Select } from "@chakra-ui/react";
// import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import ManageTodo from "./ManageTodo";
import SingleTodo from "./SingleTodo";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/lib/auth/useAuth";

const Todo = () => {
  const { user } = useAuth();

  // const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [todofiltered, setTodoFiltered] = useState([]);
  const [selectedfilter, setSelectedFilter] = useState("all");

  const [modulecodesManage, setModuleCodesManage] = useState([]);
  // const [modulecodeManage, setModuleCodeManage] = useState(null);

  useEffect(() => {
    if (user) {
      supabase
        .from("modules")
        .select("*")
        .eq("user_id", user?.id)
        .then(({ data, error }) => {
          if (!error) {
            setModuleCodesManage(data);
            // console.log(modulecodesManage);
          }
        });
    }
    // console.log(modulecodesManage);
  }, [modulecodesManage, user]);

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

    // if (selectedfilter === "all") {
    //   setTodoFiltered(todos);
    //   console.log("🚀 ~ file: Todo.tsx ~ line 66 ~ useEffect ~ todos", todos);
    // }
    // if (selectedfilter === "normal") {
    //   const newTodo = todos.filter((item) => item.isComplete === true);
    //   setTodoFiltered(newTodo);
    //   console.log(
    //     "🚀 ~ file: Todo.tsx ~ line 70 ~ useEffect ~ newTodo",
    //     newTodo
    //   );
    // }
  }, [user, todos]);

  useEffect(() => {
    if (selectedfilter === "all") {
      setTodoFiltered(todos);
      console.log("🚀 ~ file: Todo.tsx ~ line 66 ~ useEffect ~ todos", todos);
    }
    if (selectedfilter === "normal") {
      const newTodo = todos.filter((item) => item.isComplete === false);
      setTodoFiltered(newTodo);
      console.log(
        "🚀 ~ file: Todo.tsx ~ line 70 ~ useEffect ~ newTodo",
        newTodo
      );
    }
  }, [todos, selectedfilter]);

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
    // setModuleCodeManage(clickedTodo);
    onOpen();
  };

  const deleteHandler = async (todoId) => {
    // setIsDeleteLoading(true);
    const { error } = await supabase.from("todos").delete().eq("id", todoId);
    if (!error) {
      setTodos(todos.filter((todoItem) => todoItem.id !== todoId));
    }
    // setIsDeleteLoading(false);
  };

  // const filterTodo = (filtermode) => {
  //   if (filtermode === "all") {
  //     return todos;
  //   }
  //   setTodoFiltered(todos.filter((todoItem) => todoItem.isComplete === false));
  // };

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
          <Button
            size="sm"
            alignSelf="center"
            mr="2"
            onClick={() => {
              setSelectedFilter("all");
              console.log(
                "🚀 ~ file: Todo.tsx ~ line 162 ~ Todo ~ setSelectedFilter",
                todofiltered
              );
            }}
          >
            {" "}
            All View
          </Button>
          <Button
            size="sm"
            alignSelf="center"
            onClick={() => {
              setSelectedFilter("normal");
              console.log(
                "🚀 ~ file: Todo.tsx ~ line 162 ~ Todo ~ setSelectedFilter",
                todofiltered
              );
            }}
          >
            {" "}
            Normal View
          </Button>
          {/* <Select placeholder="Select Filter">
            <option
              value="option1"
              onClick={() => {
                setSelectedFilter("all");
              }}
            >
              View Uncompeleted
            </option>
            <option
              value="option2"
              onClick={() => {
                setSelectedFilter("all");
                console.log(
                  "🚀 ~ file: Todo.tsx ~ line 162 ~ Todo ~ setSelectedFilter",
                  todofiltered
                );
              }}
            >
              View All
            </option>
            <option value="option3">Extra</option>
          </Select> */}
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

        {todofiltered.map((todoItem) => (
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
