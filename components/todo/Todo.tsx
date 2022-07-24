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
  Center,
  Spacer,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { BsListTask } from "react-icons/bs";
import { TbSortDescending, TbSortAscending } from "react-icons/tb";
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

  const [duedateFilter, setDueDateFilter] = useState(false);

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
        .order("dueDate", { ascending: duedateFilter ? true : false })
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
  }, [user, toggle, duedateFilter]); // Added this line fo

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
    dispatch(setToggle());

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
      // dispatch(setToggle());
      // console.log("🚀 ~ file: Todo.tsx ~ line 66 ~ useEffect ~ todos", todos);
    }
    if (selectedfilter === "normal") {
      const newTodo = todos.filter((item) => item.isComplete === false);
      setTodosFiltered(newTodo);
      // dispatch(setToggle());
      // console.log(
      //   "🚀 ~ file: Todo.tsx ~ line 70 ~ useEffect ~ newTodo",
      //   newTodo
      // );
    }
    // if (selectedfilter === "asc") {
    //   setDueDateFilter(true);
    //   dispatch(setToggle());
    // }
    // if (selectedfilter === "dsc") {
    //   setDueDateFilter(false);
    //   dispatch(setToggle());
    // }
  }, [todos, selectedfilter]);

  return (
    <Draggable bounds="body" handle=".Header">
      <Flex
        position="absolute"
        top="200px"
        left="320px"
        bg="white"
        border="0.1rem solid black"
        width="330px"
        height="450px"
        borderRadius="10px"
        overflowY="scroll"
        direction="column"
        id="todo-main"
      >
        {/* <Button onClick={fetchModules()}>Test</Button> */}
        <Flex minWidth="max-content">
          {/* <Text p="2" fontSize="md">
            Todo List
          </Text> */}
          {/* <Button
            onClick={() => {
              dispatch(setToggle());
              console.log(toggle);
            }}
          >
            Test:{toggle ? "true" : "false  "}
          </Button> */}
        </Flex>

        <Flex mt="2" mr="2">
          <Button id="addTodo" ml="2" mb="1" size="md" onClick={onOpen}>
            Add New Todo
          </Button>
          <Spacer />

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Filter"
              icon={<FaFilter />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                icon={<GrView />}
                onClick={() => {
                  setSelectedFilter("all");
                }}
              >
                View All Tasks
              </MenuItem>
              <MenuItem
                icon={<BsListTask />}
                onClick={() => {
                  setSelectedFilter("normal");
                }}
              >
                Unfinished Tasks
              </MenuItem>
              {/* <MenuItem
                icon={<FaFilter />}
                onClick={() => {
                  setSelectedFilter("normal");
                }}
              >
                Finished Tasks
              </MenuItem> */}
              <MenuItem
                icon={<TbSortDescending />}
                // onClick={() => setSelectedFilter("dsc")
                onClick={() => setDueDateFilter(false)}
              >
                Due Date Descending
              </MenuItem>
              <MenuItem
                icon={<TbSortAscending />}
                // onClick={() => setSelectedFilter("asc")
                onClick={() => setDueDateFilter(true)}
              >
                Due Date Ascending
              </MenuItem>
            </MenuList>
          </Menu>
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
