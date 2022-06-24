import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib";

const TimerSessionEntry = ({ session }) => {
  const [title, setTitle] = useState("");
  const [module, setModule] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    const getTitle = async () => {
      const { data } = await supabase
        .from("todos")
        .select("title, module:module_id(code)")
        .eq("id", session.todo_id);
      setTitle(data[0].title);
      setModule(data[0].module.code);
    };
    getTitle();
    setStart(session.start_at);
    setEnd(session.end_at);
  }, [session.end_at, session.start_at, session.todo_id]);

  return (
    <Flex
      border="1px solid"
      border-color="red"
      margin="10px"
      padding="10px"
      justifyContent="space-around"
      direction="row"
    >
      <Flex direction="column">
        <Flex>{title}</Flex>
        <Flex>{module}</Flex>
      </Flex>

      <Flex>{new Date(start).toLocaleDateString()}</Flex>
    </Flex>
  );
};

export default TimerSessionEntry;
