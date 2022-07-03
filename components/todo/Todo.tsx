import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import ManageTodo from "./ManageTodo";
import SingleTodo from "./SingleTodo";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/lib/auth/useAuth";

const Todo = () => {
  // const router = useRouter();
  const { user } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [todofiltered, setTodoFiltered] = useState([]);
  const [selectedfilter, setSelectedFilter] = useState("all");

  const [modulecodesManage, setModuleCodesManage] = useState([]);

  async function fetchTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("insertedat", { ascending: false });
    if (!error) {
      setTodos(data);
    }
  }
  async function fetchModules() {
    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .order("insertedat", { ascending: false });
    if (!error) {
      setModuleCodesManage(data);
    }
  }

  // useEffect(() => {
  //   if (user) {
  //     supabase
  //       .from("modules")
  //       .select("*")
  //       .eq("user_id", user?.id)
  //       .then(({ data, error }) => {
  //         if (!error) {
  //           setModuleCodesManage(data);
  //           // console.log(modulecodesManage);
  //         }
  //       });
  //   }
  //   // console.log(modulecodesManage);
  // }, [modulecodesManage, user]);

  // Initial render
  useEffect(() => {
    if (user) {
      fetchTodos();
      fetchModules();
    }
  }, [user]);

  // Works on local host
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

            if (targetTodoIndex !== -1) {
              currentTodos[targetTodoIndex] = newTodo;
              return [...currentTodos];
            }
            return [newTodo, ...currentTodos];
          });
        }
      })
      .subscribe();
    // .subscribe((status) => {
    //   console.log(status);
    // });

    return () => {
      todoListener.unsubscribe();
    };
  });

  // To update with delete / add sessions listener
  // useEffect(() => {
  //   const sessionListener = supabase
  //     .from("sessions")
  //     .on("*", (payload) => {
  //       if (payload.eventType !== "DELETE") {
  //         const newSession = payload.new;
  //         setPreFormattedSession((oldSessions) => {
  //           const exists = oldSessions.find(
  //             (sessionEntry) =>
  //               sessionEntry.session_id === newSession.session_id
  //           );
  //           let newSessions;
  //           if (exists) {
  //             const oldSessionIndex = oldSessions.findIndex(
  //               (obj) => obj.session_id === newSession.session_id
  //             );
  //             oldSessions[oldSessionIndex] = newSession;
  //             newSessions = oldSessions;
  //           } else {
  //             newSessions = [...oldSessions, newSession];
  //           }
  //           findDates(newSession);
  //           return newSessions;
  //         });
  //       }
  //       console.log("Change received!", payload);
  //     })
  //     .subscribe();
  //   return () => {
  //     sessionListener.unsubscribe();
  //   };
  // }, []);

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

  // const filterTodo = (filtermode) => {
  //   if (filtermode === "all") {
  //     return todos;
  //   }
  //   setTodoFiltered(todos.filter((todoItem) => todoItem.isComplete === false));
  // };

  useEffect(() => {
    if (selectedfilter === "all") {
      setTodoFiltered(todos);
      // console.log("🚀 ~ file: Todo.tsx ~ line 66 ~ useEffect ~ todos", todos);
    }
    if (selectedfilter === "normal") {
      const newTodo = todos.filter((item) => item.isComplete === false);
      setTodoFiltered(newTodo);
      // console.log(
      //   "🚀 ~ file: Todo.tsx ~ line 70 ~ useEffect ~ newTodo",
      //   newTodo
      // );
    }
  }, [todos, selectedfilter]);

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
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Filter"
              icon={<FaFilter />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                icon={<FaFilter />}
                onClick={() => {
                  setSelectedFilter("normal");
                  console.log(
                    "🚀 ~ file: Todo.tsx ~ line 162 ~ Todo ~ setSelectedFilter",
                    todofiltered
                  );
                }}
              >
                Things to do
              </MenuItem>
              <MenuItem
                icon={<FaFilter />}
                onClick={() => {
                  setSelectedFilter("all");
                  console.log(
                    "🚀 ~ file: Todo.tsx ~ line 162 ~ Todo ~ setSelectedFilter",
                    todofiltered
                  );
                }}
              >
                All tasks
              </MenuItem>
              <MenuItem icon={<FaFilter />}>CS2030S</MenuItem>
              <MenuItem icon={<FaFilter />}>CS2040S</MenuItem>
            </MenuList>
          </Menu>
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
