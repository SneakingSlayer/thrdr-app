"use client";

import React from "react";

import {
  Box,
  Button,
  Text,
  Flex,
  Container,
  Avatar,
  ButtonGroup,
  HStack,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

import { RiNotification4Line } from "react-icons/ri";

const Navbar = ({ session }: { session: any }) => {
  return (
    <Flex
      as="nav"
      position={"fixed"}
      w={"100%"}
      left={0}
      top={0}
      zIndex={9}
      backdropFilter={"auto"}
      backdropBlur={"8px"}
    >
      <Container maxW={"lg"}>
        <Box>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box>
              <Image
                w={"90px"}
                h={"100%"}
                src="/thrdr-logo-full.svg"
                alt="thrdr-logo"
              />
            </Box>
            <ButtonGroup spacing={2}>
              {session ? (
                <Menu placement="bottom-end">
                  <MenuButton
                    as={Button}
                    size={"xs"}
                    p={0}
                    borderRadius={"full"}
                  >
                    <Avatar
                      name={session?.user?.name}
                      src={session?.user?.image}
                      borderWidth={2}
                      borderColor={"gray.500"}
                      size={"xs"}
                    />
                  </MenuButton>
                  <MenuList
                    minW={"120px"}
                    fontSize={"sm"}
                    alignItems={"center"}
                  >
                    <MenuItem>Profile</MenuItem>
                    <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button size={"xs"} onClick={() => signIn()}>
                  Sign in
                </Button>
              )}
            </ButtonGroup>
          </Flex>
        </Box>
      </Container>
    </Flex>
  );
};

export default Navbar;
