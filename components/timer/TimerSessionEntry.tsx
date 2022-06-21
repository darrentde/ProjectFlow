import { Flex } from "@chakra-ui/layout";
import { supabase } from "../../src/lib";

const TimerSessionEntry = ({ session }) => {
  supabase.from("todos").select("title").eq("todo_id", session.todo_id);

  // if (error) {
  //   console.log(error);
  // }

  // const title = data[0].title;
  return <Flex>title</Flex>;
};

export default TimerSessionEntry;
