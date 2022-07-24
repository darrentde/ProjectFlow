import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSessionID, setSessionLabel } from "../../redux/SessionSlice";
import { setShowAdditional, startTimer } from "../../redux/TimerSlice";
import { supabase } from "../../src/lib";

const TimerSessionEntry = ({ session }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [module, setModule] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [show, setShow] = useState(true);

  const addSession = async () => {
    const { data, error } = await supabase
      .from("sessions")
      .insert([
        {
          todo_id: session.todo_id,
          user_id: session.user_id,
          start_at: new Date(),
        },
      ])
      .select("session_id");

    if (error) {
      console.log(error.message);
    } else {
      console.log(data);
      const currenSessionID = data[0].session_id;
      dispatch(setSessionID(currenSessionID));
      dispatch(setSessionLabel(title));
    }
  };

  const displayTime = () => {
    const diff = Math.abs(new Date(end).getTime() - new Date(start).getTime());
    // const hours = Math.floor(diff / 3660);
    // const minutes = Math.floor((diff - hours * 3600) / 60);
    // const seconds = diff - hours * 3600 - minutes * 60;

    const minutes = Math.floor(diff / 1000 / 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // const timerHours = hours < 10 ? `0${hours}` : hours;
    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
      <Text>
        {/* {timerHours}:{timerMinutes}:{timerSeconds} */}
        {timerMinutes}:{timerSeconds}
      </Text>
    );
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("sessions")
      .delete()
      .eq("session_id", session.session_id);
    if (error) {
      console.log(error);
    } else {
      setShow(false);
    }
  };

  const handleStart = async () => {
    addSession();
    dispatch(startTimer());
    dispatch(setShowAdditional(false));
  };

  useEffect(() => {
    const getTitle = async () => {
      const { data } = await supabase
        .from("todos")
        .select("title, module:module_id(code)")
        .eq("id", session.todo_id);
      // console.log(data);
      setTitle(data[0].title);
      setModule(data[0].module.code);
    };
    getTitle();
    setStart(session.start_at);
    setEnd(session.end_at);
  }, [session.end_at, session.start_at, session.todo_id]);

  return (
    <Flex>
      {show ? (
        <Flex
          border="1px solid"
          padding="10px"
          direction="row"
          justifyContent="space-between"
        >
          <Flex direction="column">
            <Flex>{title}</Flex>
            <Flex>{module}</Flex>
            <Flex>
              {new Date(start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - "}
              {new Date(end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Flex>
          </Flex>
          <Flex>{displayTime()}</Flex>
          <Flex>
            <Button onClick={handleStart}> Start</Button>
          </Flex>
          <Flex>
            <Button onClick={handleDelete}> Delete</Button>
          </Flex>
        </Flex>
      ) : null}{" "}
    </Flex>

    // <Flex
    //   border="1px solid"
    //   padding="10px"
    //   direction="row"
    //   justifyContent="space-between"
    // >
    //   <Flex direction="column">
    //     <Flex>{title}</Flex>
    //     <Flex>{module}</Flex>
    //     <Flex>
    //       {new Date(start).toLocaleTimeString([], {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       })}
    //       {" - "}
    //       {new Date(end).toLocaleTimeString([], {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       })}
    //     </Flex>
    //   </Flex>
    //   <Flex>{displayTime()}</Flex>
    //   <Flex>
    //     <Button onClick={handleDelete}> Delete</Button>
    //   </Flex>
    // </Flex>
  );
};

export default TimerSessionEntry;
