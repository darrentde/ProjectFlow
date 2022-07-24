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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { nextStep } from "../../redux/TourSlice";

const Todo = () => {
  const { user } = useAuth();

  const runningTour = useSelector((state: RootState) => state.tour.run);
  const stepIndex = useSelector((state: RootState) => state.tour.stepIndex);
  const toggle = useAppSelector((state) => state.toggledata.value);
  const dispatch = useAppDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);

  const [todosfiltered, setTodosFiltered] = useState([]);
  const [selectedfilter, setSelectedFilter] = useState("all");

  const [modulecodesManage, setModuleCodesManage] = useState([]);

  const [ModList, setModList] = useState([]);

  function moduleRelated(todoItem) {
    const arrayModules = Object.values(ModList);

    if (arrayModules.length > 0) {
      const filteredModules = arrayModules.find(
        (item) => item.module_id === todoItem.module_id
      );
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

    return () => {
      todoListener.unsubscribe();
    };
  });

  const openHandler = (clickedTodo) => {
    dispatch(setToggle());

    setTodo(clickedTodo);
    onOpen();
  };

  const openAddNewTodo = () => {
    onOpen();
    if (runningTour && stepIndex === 9) {
      setTimeout(() => dispatch(nextStep("next")), 50);
    }
  };

  const onCloseTodo = () => {
    onClose();
    if (runningTour && stepIndex === 10) {
      setTimeout(() => dispatch(nextStep("next")), 1000);
    }
  };

  // Delete works
  const deleteHandler = async (todoId) => {
    const { error } = await supabase.from("todos").delete().eq("id", todoId);
    if (!error) {
      setTodos(todos.filter((todoItem) => todoItem.id !== todoId));
      dispatch(setToggle());
    }
  };

  useEffect(() => {
    if (selectedfilter === "all") {
      setTodosFiltered(todos);
    }
    if (selectedfilter === "normal") {
      const newTodo = todos.filter((item) => item.isComplete === false);
      setTodosFiltered(newTodo);
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
        height="400px"
        borderRadius="10px"
        overflowY="scroll"
        direction="column"
        id="todo-main"
      >
        <Flex className="Header" cursor="pointer">
          <Text p="2" fontSize="md">
            Todo List
          </Text>

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
                }}
              >
                Things to do
              </MenuItem>
              <MenuItem
                icon={<FaFilter />}
                onClick={() => {
                  setSelectedFilter("all");
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
          <Button id="add-todo" ml="2" size="sm" onClick={openAddNewTodo}>
            Add New Todo
          </Button>
        </Flex>

        <ManageTodo
          isOpen={isOpen}
          onClose={onCloseTodo}
          initialRef={initialRef}
          todo={todo}
          setTodo={setTodo}
          deleteHandler={deleteHandler}
          modules={modulecodesManage}
        />

        {todosfiltered.map((todoItem) => (
          <SingleTodo
            key={todoItem.id}
            todo={todoItem}
            openHandler={openHandler}
            mod={moduleRelated(todoItem)}
          />
        ))}
      </Flex>
    </Draggable>
  );
};

export default Todo;
