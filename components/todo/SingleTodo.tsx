/* eslint-disable no-console */
import {
  Box,
  Divider,
  Text,
  Badge,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { IoMdPlay } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { startTimer } from "../../redux/TimerSlice";
import { displayTimer } from "../../redux/WidgetSlice";
import { setSessionID } from "../../redux/SessionSlice";
import { supabase } from "../../src/lib";

const SingleTodo = ({ todo, openHandler }) => {
  //   const getDateInMonthDayYear = (date) => {
  //     const d = new Date(date);
  //     const options = {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //       minute: "numeric",
  //     };
  //     const n = d.toLocaleDateString("en-US", options);
  //     const replase = n.replace(new RegExp(",", "g"), " ");
  //     return replase;
  //   };
  const dispatch = useDispatch();
  const showTimer = useSelector((state: RootState) => state.widget.timerShow);

  const handleStart = async () => {
    if (showTimer === false) {
      dispatch(displayTimer());
    }

    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from("sessions")
      .insert([{ todo_id: todo.id, user_id: user.id, start_at: new Date() }])
      .select("session_id");

    const currenSessionID = data[0].session_id;
    const supabaseError = error;

    if (supabaseError) {
      console.log(supabaseError.message);
    } else {
      dispatch(setSessionID(currenSessionID));
    }
    dispatch(startTimer());
  };

  return (
    <Box
      maxW="100%"
      borderWidth="2px"
      borderRadius="lg"
      border="1px"
      borderColor="black"
      //   overflow="hidden"
      p="2"
      mb="1"
      mt="1"
      onClick={() => openHandler(todo)}
    >
      <Text fontSize="lg" mt="1">
        {todo.title}
        <Badge ml="1">CS2040S Module FK</Badge>
        <Checkbox ml="2" colorScheme="purple" isChecked={todo.isComplete}>
          Check
        </Checkbox>
        <IconButton
          icon={<IoMdPlay />}
          aria-label="start"
          variant="link"
          onClick={handleStart}
        />
      </Text>
      {/* <Text color="gray.400" mt="1" fontSize="sm">
        {getDateInMonthDayYear(todo.insertedat)}
      </Text> */}
      <Divider my="0.5" />
      <Text fontSize="xs" noOfLines={[1, 2]} color="gray.800">
        {todo.description}
      </Text>
    </Box>
  );
};

export default SingleTodo;
