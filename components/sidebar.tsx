import NextImage from "next/image";
import NextLink from "next/link";
import { IconButton } from "@chakra-ui/react";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const sidebarMenu = [
  {
    name: "To-Do",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Timer",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Music",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Vibes",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Stats",
    icon: MdHome,
    route: "/",
  },
];

const Sidebar = () => {
  return (
    <Box w="100%">
      <Text>Sidebar below</Text>
      <List spacing={3}>
        {sidebarMenu.map((menu) => (
          <ListItem paddingX="30px" fontSize="16px" key={menu.name}>
            <LinkBox>
              <NextLink href={menu.route} passHref>
                <LinkOverlay>
                  {/* <ListIcon as={menu.icon} color="white" marginRight="20px" />
                  {menu.name} */}
                  <IconButton
                    colorScheme="teal"
                    aria-label="Call Segun"
                    size="lg"
                    as={menu.icon}
                  />
                  {menu.name}
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
