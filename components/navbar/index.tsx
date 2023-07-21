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
  IconButton,
} from "@chakra-ui/react";

import { signIn, signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import { RiSearch2Line } from "react-icons/ri";

import { useGetProfilePic, useModalState } from "@/hooks";

import { SearchModal } from "@/components";

import Link from "next/link";

const Navbar = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const { getImageUri } = useGetProfilePic({});
  const { setModalId } = useModalState();
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
      <SearchModal />
      <Container maxW={"lg"}>
        <Box>
          <Flex
            paddingY={4}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Link href={session ? `/u/${session?.user?.userName}` : "/"}>
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
                  <HStack>
                    <IconButton
                      onClick={() => setModalId("SEARCH_MODAL")}
                      borderRadius={"full"}
                      size={"sm"}
                      icon={<RiSearch2Line />}
                      aria-label={"search-btn"}
                    />
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
                        {/* <Box textAlign={"right"}>
                        <Text>{session?.user?.name}</Text>
                        <Text color={"gray.500"}>
                          @{session?.user?.userName}
                        </Text>
                      </Box> */}
                        <Avatar
                          name={session?.user?.name}
                          src={getImageUri(session?.user?.userName ?? "")}
                          borderWidth={2}
                          borderColor={"gray.700"}
                          size={"sm"}
                          bg={"brand.200"}
                        />
                      </HStack>
                    </MenuButton>
                  </HStack>
                  <MenuList
                    minW={"120px"}
                    fontSize={"sm"}
                    alignItems={"center"}
                  >
                    <Link href={`/me/${session?.user?.userName}`}>
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Link href={"/signin"}>
                    <Button
                      colorScheme="white"
                      size={"xs"}
                      variant={"outline"}
                      // onClick={() => signIn()}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={"/signup"}>
                    <Button
                      bg={"brand.600"}
                      color={"white"}
                      size={"xs"}
                      variant={"solid"}
                      // onClick={() => router.push("/signup")}
                    >
                      Sign up
                    </Button>
                  </Link>
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
