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

const Details = ({ sessions, ModList, todotitles }) => {
  const { user } = useAuth();

  function moduleRelated(sessionItem) {
    // const arrayModules = Object.values(ModList);
    // if (arrayModules.length > 0) {
    //   const filteredModules = arrayModules.find(
    //     (item) => item.id === sessionItem.todo_id
    //   );
    //   // console.log(
    //   //   "🚀 ~ file: Details.tsx ~ line 51 ~ moduleRelated ~ filteredModules.modules.code",
    //   //   filteredModules.modules.code
    //   // );
    //   return filteredModules.modules.code;
    // }
  }

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
      // position="absolute"
      // top="100px"
      // left="340px"
      bg="white"
      border="0.1rem solid black"
      width="800px"
      height="500px"
      borderRadius="10px"
      // overflowY="scroll"
      direction="column"
    >
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
    </Flex>
  );
};

export default Details;
