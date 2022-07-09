/* eslint-disable no-console */
import {
  Box,
  Divider,
  Text,
  Badge,
  Checkbox,
  IconButton,
  Flex,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../../src/lib/supabase";
import { RootState } from "../../redux/Store";
import { setShowAdditional, startTimer } from "../../redux/TimerSlice";
import { displayTimer } from "../../redux/WidgetSlice";
import { setSessionID, setSessionLabel } from "../../redux/SessionSlice";
import { useAuth } from "../../src/lib/auth/useAuth";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setToggle } from "../../redux/ToggleDataSlice";
import { setToggleCheck } from "../../redux/ToggleCheckSlice";

const SingleTodo = ({ todo, openHandler, mod }) => {
  const { user } = useAuth();

  const [check, setCheck] = useState(todo.isComplete);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const toggleCheck = useAppSelector((state) => state.togglecheck.value);
  const dispatchhook = useAppDispatch();

  const dispatch = useDispatch();
  const showTimer = useSelector((state: RootState) => state.widget.timerShow);
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);

  const addSession = async () => {
    const { data, error } = await supabase
      .from("sessions")
      .insert([{ todo_id: todo.id, user_id: user.id, start_at: new Date() }])
      .select("session_id");

    if (error) {
      console.log(error.message);
    } else {
      console.log(data);
      const currenSessionID = data[0].session_id;
      dispatch(setSessionID(currenSessionID));
      dispatch(setSessionLabel(todo.title));
    }
  };

  const handleStart = async () => {
    if (showTimer === false) {
      dispatch(displayTimer());
    }
    addSession();
    dispatch(startTimer());
    dispatch(setShowAdditional(false));
  };

  useEffect(() => {
    const fetchCheck = async () => {
      // setErrorMessage("");
      // setIsLoading(true);
      console.log("🚀 ~ file: SingleTodo.tsx ~ line 82 ~ fetchCheck", check);
      if (user) {
        await supabase
          .from("todos")
          .update({
            isComplete: check,
            user_id: user.id,
          })
          .eq("id", todo.id);
      }
    };
    fetchCheck();
    // console.log("modname", mod);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  return (
    <Box
      maxW="100%"
      borderWidth="2px"
      ml="2"
      mr="2"
      bg="white"
      border="0.1rem solid black"
      borderRadius="10px"
      p="2"
      mb="1"
      mt="1"
    >
      <Flex>
        <Badge ml="1">{mod}</Badge>
        <Spacer />
        <Icon
          as={FiEdit}
          onClick={() => {
            dispatchhook(setToggleCheck());
            openHandler(todo);
          }}
        />
      </Flex>

      <Flex>
        <Checkbox
          ml="2"
          isChecked={check}
          onChange={() => {
            setCheck(!check);
            dispatchhook(setToggleCheck());
            // dispatchhook(setToggle());

            // handleCheckbox();
          }}
        />

        <Text fontSize="lg" mt="1">
          {todo.title}
        </Text>
      </Flex>
      {isRunning ? null : (
        <IconButton
          icon={<IoMdPlay />}
          aria-label="start"
          variant="link"
          onClick={handleStart}
        />
      )}

      <Divider my="0.5" />
      <Text fontSize="xs" noOfLines={[1, 2]} color="gray.800">
        {todo.description}
      </Text>

      <Divider my="0.5" />
      <Text fontSize="xs" color="gray.800">
        Due Date:{todo.dueDate}
      </Text>
    </Box>
  );
};

export default SingleTodo;
