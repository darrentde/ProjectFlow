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
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { join } from "path";

ChartJS.register(ArcElement, Tooltip, Legend);


const AnalyticsReport = () => {
  const { user } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [todotitles, setTodoTitles] = useState([]);
  const [todos, setTodos] = useState([]);
  const [modulecodesManage, setModuleCodesManage] = useState([]);
  const [joindata, setJoindata] = useState([]);


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
        .from("todos")
        .select("id,module_id")
        .eq("user_id", user?.id)
        .then(({ data, error }) => {
          if (!error) {
            setTodos(data);
          }
        });

      supabase
        .from("modules")
        .select("*")
        .eq("user_id", user?.id)
        .order("id", { ascending: false }) // Order was wrong earlier
        .then(({ data, error }) => {
          if (!error) {
            setModuleCodesManage(data);
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
      supabase
        .from("temptable7")
        .select("*")
        .eq("user_id", user?.id)
        .order("module_id", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setJoindata(data);
          }
        });

      // supabase.rpc("query_stats").then(({ data, error }) => {
      //   if (!error) {
      //     console.log("rpc test ", data);
      //   }
      // });

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

  // const data = {
  //   labels: modulecodesManage.map((data) => data.code),
  //   datasets: [
  //     {
  //       label: "% of time spent",
  //       data: modulecodesManage.map((data) => data.code),
  //       // [12, 19, 3, 5, 2, 3],
  //       // backgroundColor: [
  //       //   "rgba(255, 99, 132, 0.2)",
  //       //   "rgba(54, 162, 235, 0.2)",
  //       //   "rgba(255, 206, 86, 0.2)",
  //       //   "rgba(75, 192, 192, 0.2)",
  //       //   "rgba(153, 102, 255, 0.2)",
  //       //   "rgba(255, 159, 64, 0.2)",
  //       // ],
  //       // borderColor: [
  //       //   "rgba(255, 99, 132, 1)",
  //       //   "rgba(54, 162, 235, 1)",
  //       //   "rgba(255, 206, 86, 1)",
  //       //   "rgba(75, 192, 192, 1)",
  //       //   "rgba(153, 102, 255, 1)",
  //       //   "rgba(255, 159, 64, 1)",
  //       // ],
  //       // borderWidth: 1,
  //     },
  //   ],
  // };

  // const test = () => {
  //   // const result = modulecodesManage.map((data) => {
  //   //   console.log("data", data);

  //   //   ModList.filter((todo) => {
  //   //     console.log("todo ", todo.modules.code);
  //   //     console.log("data.code", data.code);
  //   //     todo.modules.code === data.code;
  //   //   });
  //   // });

  //   // console.log("testing ", result);

  //   // return result;
  //   const todoBasedOnModule = modulecodesManage.map((module) => {
  //     const todoCorrectCode = todos.filter(
  //       (todo) => todo.module_id === module.id
  //     ); // List of todos to associated module
  //     console.log("todoCorrectCode ", todoCorrectCode);
  //     return todoCorrectCode;
  //   });

  //   // Provide todo_id and return all the according session details
  //   const sessionDetails = todoBasedOnModule.map((todoArray) => {
  //     // console.log("todoArray", todoArray);
  //     const tempArray = todoArray.map((todoItem) => {
  //       console.log("todoItem", todoItem);

  //       const tempTodoId = todoItem.id;

  //       const singleItem = sessions.filter((session) => {
  //         console.log("session", session.todo_id);
  //         console.log("tempTodoId", tempTodoId);

  //         session.todo_id === tempTodoId;
  //       });
  //       console.log("tempArray ~ singleItem", singleItem);

  //       return singleItem;

  //       // sessions.filter((session) => {
  //       //   console.log("sessions.filter ~ session", session);
  //       //   session.todo_id = todoItem.id;
  //       // });
  //       // console.log("temp array", tempArray);
  //     });
  //   });

  //   // const sessionsBasedOnModule = sessions.
  //   // const result3 = result2.map((todo) => {
  //   //   sessions.map((session) => {
  //   //     session.todo_id === todo.id;
  //   //   });
  //   // });

  //   // console.log("result3", result3);

  //   const convertTime = (item, option) => {
  //     if (option === "start_at") {
  //       const result = new Date(item.start_at);
  //       return result.getTime();
  //     } else {
  //       const result = new Date(item.end_at);
  //       return result.getTime();
  //     }
  //   };

  //   const sessionArray = sessions.map((session) => {
  //     const seconds =
  //       (convertTime(session, "end_at") - convertTime(session, "start_at")) /
  //       1000;
  //     return seconds;
  //   });

  //   const totalSeconds = sessionArray.reduce((acc, curr) => acc + curr);
  //   console.log(totalSeconds);
  // };

  // const sessionByModule = (module) => {
  //   const code = module.code;
  //   console.log(
  //     "🚀 ~ file: AnalyticsReport.tsx ~ line 282 ~ sessionByModule ~ code",
  //     code
  //   );
  //   const data = joindata.filter((item) => {
  //     console.log("data ", data);
  //     item.code === code;
  //   });
  //   // const accumulated_value = data.reduce((acc, curr) => {
  //   //   return acc.sum_duration + curr.sum_duration;
  //   // });
  //   // console.log("acc ", accumulated_value);
  //   // return accumulated_value;
  // };

  // const test_rpc = () => {
  //   console.log("testing joindate", joindata);
  //   console.log("modulecodes ", modulecodesManage);

  //   const acc_data = modulecodesManage.map((mod) => {
  //     sessionByModule(mod);
  //   });

  //   console.log("acc", acc_data);
  //   return acc_data;
  // };

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
          <Tab>Detail</Tab>
          <Tab>Summary (Feature coming soon)</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <>
              <TableContainer overflowY="scroll">
                <Table variant="simple" size="sm">
                  <TableCaption>
                    “It is a capital mistake to theorize before one has data.” —
                    Sherlock Holmes
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Module Code</Th>
                      <Th>Task Name</Th>
                      <Th>Duration</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sessions.map((report) => (
                      <SingleReport
                        key={report.id}
                        report={report}
                        reporttitle={single_title(report)}
                        reportmodule={moduleRelated(report)}
                      ></SingleReport>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          </TabPanel>
          <TabPanel>
            {/* <Pie data={data} /> */}
            <Text>
              Feature will be implemented in future extension to provide smart
              analytics for users to deeply understand their study habits
            </Text>

          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Button
        onClick={() => {
          // console.log("sessions ", sessions);
          // console.log("titiles ", todotitles);
          // console.log("modulelist ", modulecodesManage);
          // console.log("modlist ", ModList);
          // console.log("todoModule new ", todoByModule());
          test();
          test_rpc();
        }}
      >
        Test
      </Button> */}

    </Flex>
  );
};

export default AnalyticsReport;
