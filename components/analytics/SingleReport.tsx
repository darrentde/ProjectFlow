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
  Tr,
  Td,
  Tag,
  Center,
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

const SingleReport = ({ report, reporttitle, reportmodule }) => {
  const { user } = useAuth();

  const [modcode, setModCode] = useState("");

  // Convert timestamp to Date only
  const start = new Date(report.start_at);
  const end = new Date(report.end_at);
  const seconds = (end.getTime() - start.getTime()) / 1000;

  //   const dateOnly = start.toDateString();
  const year = start.getFullYear();
  const month = start.getMonth();
  const day = start.getDate();
  const dateOnly = day + "-" + month + "-" + year;
  return (
    <Tr>
      <Td>{dateOnly}</Td>
      <Td>
        <Flex>
          <Tag>{reportmodule}</Tag> <p>&nbsp;&nbsp;</p>
        </Flex>
      </Td>
      <Td>{reporttitle}</Td>
      <Td>{seconds} secs</Td>
    </Tr>
  );
};

export default SingleReport;

// [
//     {
//         "session_id": "b607f116-037a-11ed-9a68-06f8c67f73f0",
//         "user_id": "cf1abdeb-5af5-4175-90b8-f04efa2b8fe0",
//         "todo_id": 170,
//         "start_at": "2022-07-14T13:41:49.191+00:00",
//         "end_at": "2022-07-14T13:41:52.191+00:00"
//     },
//     {
//         "session_id": "639c421c-0279-11ed-a1d7-06f8c67f73f0",
//         "user_id": "cf1abdeb-5af5-4175-90b8-f04efa2b8fe0",
//         "todo_id": 169,
//         "start_at": "2022-07-13T06:59:50.125+00:00",
//         "end_at": "2022-07-13T06:59:55.125+00:00"
//     },
//     {
//         "session_id": "aab02806-0244-11ed-a50e-06f8c67f73f0",
//         "user_id": "cf1abdeb-5af5-4175-90b8-f04efa2b8fe0",
//         "todo_id": 168,
//         "start_at": "2022-07-13T00:42:26.228+00:00",
//         "end_at": "2022-07-13T00:42:32.228+00:00"
//     }
// ]
