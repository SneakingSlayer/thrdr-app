"use client";

import React from "react";

import {
  Box,
  Button,
  Flex,
  Container,
  Avatar,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";

import { signIn, signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";

const Navbar = ({ session }: { session: Session }) => {
  const router = useRouter();
  console.log("NAVBAR", session);
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
          <Flex
            paddingY={4}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Link href={"/"}>
              <Image
                w={"35px"}
                h={"100%"}
                src="/thrdr-icon.svg"
                alt="thrdr-logo"
              />
            </Link>
            <ButtonGroup spacing={2}>
              {session ? (
                <Menu placement="bottom-end">
                  <MenuButton
                    as={Button}
                    size={"xs"}
                    p={0}
                    borderRadius={"full"}
                    bg={"transparent"}
                    _hover={{ bg: "transparent", opacity: 0.7 }}
                    _focus={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                  >
                    <HStack>
                      <Avatar
                        name={session?.user?.name}
                        src={session?.user?.image}
                        borderWidth={2}
                        borderColor={"gray.700"}
                        size={"sm"}
                      />
                      <Box textAlign={"left"}>
                        <Text>{session?.user?.name}</Text>
                        <Text color={"gray.500"}>
                          @{session?.user?.userName}
                        </Text>
                      </Box>
                    </HStack>
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
                <>
                  <Button
                    colorScheme="white"
                    size={"xs"}
                    variant={"outline"}
                    onClick={() => signIn()}
                  >
                    Login
                  </Button>
                  <Button
                    bg={"brand.600"}
                    color={"white"}
                    size={"xs"}
                    variant={"solid"}
                    onClick={() => router.push("/signup")}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Flex>
        </Box>
      </Container>
    </Flex>
  );
};

export default Navbar;
