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
import { startTimer } from "../../redux/TimerSlice";
import { displayTimer } from "../../redux/WidgetSlice";
import { setSessionID } from "../../redux/SessionSlice";
import { useAuth } from "../../src/lib/auth/useAuth";

const SingleTodo = ({ todo, openHandler }) => {
  const { user } = useAuth();

  // States for module codes foreign table
  const [modulecode, setModuleCode] = useState("");
  const [check, setCheck] = useState(todo.isComplete);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

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
      const currenSessionID = data[0].session_id;
      dispatch(setSessionID(currenSessionID));
    }
  };

  const handleStart = async () => {
    if (showTimer === false) {
      dispatch(displayTimer());
    }
    addSession();
    dispatch(startTimer());
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  useEffect(() => {
    if (todo) {
      supabase
        .from("modules")
        .select("code")
        .eq("id", todo.module_id)
        .then(({ data, error }) => {
          if (!error) {
            setModuleCode(data[0].code); // on signout,
          }
        });
    }
  }, [todo]);

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
        <Badge ml="1">{modulecode}</Badge>
        <Spacer />
        <Icon as={FiEdit} onClick={() => openHandler(todo)} />
      </Flex>

      <Flex>
        <Checkbox
          ml="2"
          isChecked={check}
          onChange={() => {
            setCheck(!check);
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
      {/* <Text color="gray.400" mt="1" fontSize="sm">
        {getDateInMonthDayYear(todo.insertedat)}
      </Text> */}

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
