import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Avatar,
} from "@chakra-ui/react";
import Module from "./module/Module";
import { useEffect, useState } from "react";
import { supabase } from "../src/lib/supabase";
import ProfileModal from "./ProfileModal";
import Logout from "./user/Logout";
const ProfileMenu = () => {
  const user = supabase.auth.user();
  const [avatarurl, setAvatarurl] = useState("");
  const [username, setUsername] = useState("");

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
      <MenuButton>
        <Avatar
          size="md"
          src={avatarurl || ""}
          name={username || user?.email}
        />
      </MenuButton>

      <MenuList>
        <ProfileModal />
        <Module />
        <Logout />
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
