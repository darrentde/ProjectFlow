import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import Module from "./module/Module";
import { useEffect, useState } from "react";
import { supabase } from "../src/lib/supabase";
import ProfileModal from "./ProfileModal";
import Logout from "./user/Logout";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../redux/TourSlice";
import { RootState } from "../redux/Store";

const DropdownMenu = () => {
  const user = supabase.auth.user();
  const dispatch = useDispatch();
  const runningTour = useSelector((state: RootState) => state.tour.run);
  const stepIndex = useSelector((state: RootState) => state.tour.stepIndex);

  const [avatarurl, setAvatarurl] = useState("");
  const [username, setUsername] = useState("");

  const handleTour = () => {
    dispatch(nextStep("RESTART"));
  };

  const handleClick = () => {
    if (runningTour && stepIndex === 1) {
      setTimeout(() => dispatch(nextStep("next")), 50);
    }
  };

  useEffect(() => {
    if (user) {
      // Fetch data and fill profile page information page
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .then(({ data, error }) => {
          if (!error) {
            setUsername(data[0].username || "");
            setAvatarurl(data[0].avatarurl || "");
          } else {
            console.log(error);
          }
        });
    }
  }, [user]);

  return (
    <Menu id="menu">
      <MenuButton onClick={handleClick}>
        <Avatar
          size="md"
          src={avatarurl || ""}
          name={username || user?.email}
        />
      </MenuButton>

      <MenuList>
        <ProfileModal />
        <Module />
        <MenuItem onClick={handleTour}>Start Tour</MenuItem>
        <Logout />
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
