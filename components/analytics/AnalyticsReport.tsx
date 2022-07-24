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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/lib/auth/useAuth";
import { useAppSelector, useAppDispatch } from "../../hooks";
import SingleReport from "./SingleReport";
import Details from "./Details";

const AnalyticsReport = () => {
  const { user } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [todotitles, setTodoTitles] = useState([]);
  const [todomodules, setTodoModules] = useState([]);
  const [modulecodesManage, setModuleCodesManage] = useState([]);

  const [ModList, setModList] = useState([]);

  function moduleRelated(sessionItem) {
    // console.log("start test", Object.keys(ModList));
    // console.log("object", Object.values(ModList));
    const arrayModules = Object.values(ModList);
    // console.log("array", arrayModules);

    if (arrayModules.length > 0) {
      const filteredModules = arrayModules.find(
        (item) => item.id === sessionItem.todo_id
      );
      // console.log(
      //   "🚀 ~ file: AnalyticsReport.tsx ~ line 51 ~ moduleRelated ~ filteredModules.modules.code",
      //   filteredModules.modules.code
      // );

      return filteredModules.modules.code;
    }
  }

  // Initial render
  useEffect(() => {
    if (user) {
      supabase
        .from("sessions")
        .select("*")
        .eq("user_id", user?.id)
        .order("end_at", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setSessions(data);
            // console.log("🚀 ~ file: Todo.tsx ~ line 68 ~ .then ~ data", data);
          }
        });

      supabase
        .from("sessions")
        .select(
          `
          todo_id,
          todos (
            title
          )
          `
        )
        .eq("user_id", user?.id)
        .then(({ data, error }) => {
          if (!error) {
            setTodoTitles(data);
          }
        });

      supabase
        .from("sessions")
        .select(
          `
          todo_id,
          todos (
            module_id
          )
          `
        )
        .eq("user_id", user?.id)
        .then(({ data, error }) => {
          if (!error) {
            setTodoModules(data);
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

      supabase
        .from("todos")
        .select(
          `
          id,
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
    }
  }, [user]);

  function single_title(sessionItem) {
    if (todotitles.length > 0) {
      const result = todotitles.find(
        (title) => title.todo_id === sessionItem.todo_id
      );
      // console.log("result  ", result);
      return result.todos.title;
    }
  }

  return (
    <Flex
      position="absolute"
      top="100px"
      left="340px"
      bg="white"
      border="0.1rem solid black"
      width="800px"
      height="500px"
      borderRadius="10px"
      // overflowY="scroll"
      direction="column"
    >
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Summary</Tab>
          <Tab>Detail</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Summary Component</p>
          </TabPanel>
          <TabPanel>
            <p>Detail Component</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <>
        <TableContainer overflowY="scroll">
          <Table variant="simple" size="sm">
            <TableCaption>
              Data analytics for all your studying habits
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Module Code | Task Name</Th>
                <Th>Duration</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sessions.map((report) => (
                <SingleReport
                  key={report.id}
                  report={report}
                  reporttitle={single_title(report)}
                  // reportmodule={single_module(report)}
                  reportmodule={moduleRelated(report)}
                ></SingleReport>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </>

      <Button
        onClick={() => {
          console.log("sessions ", sessions);
          console.log("titiles ", todotitles);
          console.log("modulelist ", modulecodesManage);
          console.log("modlist ", ModList);
        }}
      >
        Test
      </Button>
    </Flex>
  );
};

export default AnalyticsReport;
