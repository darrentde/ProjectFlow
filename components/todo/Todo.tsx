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
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setToggle } from "../../redux/ToggleDataSlice";

const Todo = () => {
  // const router = useRouter();
  const { user } = useAuth();

  const toggle = useAppSelector((state) => state.toggledata.value);
  const dispatch = useAppDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [todosfiltered, setTodosFiltered] = useState([]);
  const [selectedfilter, setSelectedFilter] = useState("all");

  const [modulecodesManage, setModuleCodesManage] = useState([]);

  const [ModList, setModList] = useState([]);

  function moduleRelated(todoItem) {
    // console.log("start test", Object.keys(ModList));
    // console.log("object", Object.values(ModList));
    const arrayModules = Object.values(ModList);
    // console.log("array", arrayModules);

    if (arrayModules.length > 0) {
      const filteredModules = arrayModules.find(
        (item) => item.module_id === todoItem.module_id
      );
      // console.log(
      //   "🚀 ~ file: Todo.tsx ~ line 48 ~ moduleRelated ~ filteredModules",
      //   filteredModules.modules.code
      // );
      return filteredModules.modules.code;
    }
  }

  // Initial render
  useEffect(() => {
    if (user) {
      supabase
        .from("todos")
        .select("*")
        .eq("user_id", user?.id)
        .order("insertedat", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setTodos(data);
            // console.log("🚀 ~ file: Todo.tsx ~ line 68 ~ .then ~ data", data);
          }
        });

      supabase
        .from("todos")
        .select(
          `
          module_id,
          modules (
            code
          )
          `
        )
        .eq("user_id", user?.id)
        .then(({ data, error }) => {
          if (!error) {
            setModList(data);
            // console.log("🚀 ~ file: Todo.tsx ~ line 68 ~ .then ~ data", data);
          } else {
            console.log("foreign table", error);
          }
        });

      supabase
        .from("modules")
        .select("*")
        .eq("user_id", user?.id)
        .order("insertedat", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setModuleCodesManage(data);
            // console.log("🚀 ~ file: Todo.tsx ~ line 81 ~ .then ~ data", data);
          }
        });
    } else {
      setTodos([]);
      setModuleCodesManage([]);
    }
  }, [user, toggle]); // Added this line fo

  // Works on local host
  useEffect(() => {
    const todoListener = supabase
      .from("todos")
      .on("*", (payload) => {
        if (payload.eventType !== "DELETE") {
          const newTodo = payload.new;

          console.log("listener", payload.eventType);

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
      dispatch(setToggle());
    }
    // setIsDeleteLoading(false);
  };

  useEffect(() => {
    if (selectedfilter === "all") {
      setTodosFiltered(todos);
      dispatch(setToggle());
      // console.log("🚀 ~ file: Todo.tsx ~ line 66 ~ useEffect ~ todos", todos);
    }
    if (selectedfilter === "normal") {
      const newTodo = todos.filter((item) => item.isComplete === false);
      setTodosFiltered(newTodo);
      dispatch(setToggle());
      // console.log(
      //   "🚀 ~ file: Todo.tsx ~ line 70 ~ useEffect ~ newTodo",
      //   newTodo
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, selectedfilter, toggle]);

  return (
    <Draggable bounds="body" handle=".Header">
      <Flex
        position="absolute"
        top="200px"
        left="320px"
        bg="white"
        border="0.1rem solid black"
        width="400px"
        height="400px"
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
            onClick={() => {
              dispatch(setToggle());
              console.log(toggle);
            }}
          >
            Test:{toggle ? "true" : "false  "}
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
                    todosfiltered
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
                    todosfiltered
                  );
                }}
              >
                All tasks
              </MenuItem>
              <MenuItem icon={<FaFilter />}>Developing..</MenuItem>
              <MenuItem icon={<FaFilter />}>Developing..</MenuItem>
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
          // key={todo.id} // Added this
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

        {todosfiltered.map((todoItem) => (
          <SingleTodo
            key={todoItem.id}
            todo={todoItem}
            openHandler={openHandler}
            mod={moduleRelated(todoItem)}
          />
        ))}
        {/* {ModList.map((item) => {
          const result = Object.values(item);
          console.log("🚀 ~ file: Todo.tsx ~ line 289 ~ {/*{ModList.map ~ result", result)
          console.log("ModList", result);
          console.log("🚀 ~ file: Todo.tsx ~ line 291 ~ {/*{ModList.map ~ result", result)
          console.log("ModList", result[1].code);
          console.log("🚀 ~ file: Todo.tsx ~ line 293 ~ {/*{ModList.map ~ result", result)
          console.log("ModList", result[0]);
          console.log("🚀 ~ file: Todo.tsx ~ line 295 ~ {/*{ModList.map ~ result", result)

          // ModList (2)[143, {…}]
          // ModList CS2040S
          // ModList 143
        })} */}
        {/* 
        <Button
          onClick={() => todos.map((todoItem) => moduleRelated(todoItem))}
        >
          Test
        </Button> */}
      </Flex>
    </Draggable>
  );
};

export default Todo;
