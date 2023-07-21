"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Button,
  ModalFooter,
  Text,
  Image,
  Flex,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  Icon,
  Avatar,
  HStack,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";

import { useModalState } from "@/hooks";

import { RiSearch2Line } from "react-icons/ri";

import Link from "next/link";

const SearchModal = () => {
  const router = useRouter();
  const { isOpen, setModalId } = useModalState();
  const handleNavigate = React.useCallback(
    (path: string) => {
      router.push(path);
      setModalId("");
    },
    [router, setModalId]
  );
  return (
    <>
      <Modal isOpen={isOpen("SEARCH_MODAL")} onClose={() => setModalId("")}>
        <ModalOverlay />
        <ModalContent
          py={5}
          background={"transparent"}
          // backdropFilter={"auto"}
          // backdropBlur={"8px"}
          mx={3}
          p={0}
          boxShadow={"none"}
          shadow={"none"}
        >
          <ModalBody p={0}>
            <InputGroup>
              <InputLeftElement>
                <Icon as={RiSearch2Line} color={"gray.500"} />
              </InputLeftElement>
              <Input
                background={"rgba(45, 55, 72, .3)"}
                backdropFilter={"auto"}
                backdropBlur={"8px"}
                fontSize={"sm"}
                placeholder="Search thrdr"
                border={0}
                mb={3}
              />
            </InputGroup>
            <Box
              background={"rgba(45, 55, 72, .3)"}
              backdropFilter={"auto"}
              backdropBlur={"8px"}
              borderRadius={"lg"}
              px={5}
              py={3}
            >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text fontWeight={"bold"} fontSize={"sm"}>
                  Recent
                </Text>
                <Button variant={"ghost"} size={"xs"} p={1} color={"brand.500"}>
                  Clear searches
                </Button>
              </Flex>
              <Box py={3}>
                <HStack>
                  <Avatar size={"sm"} />
                  <Box>
                    <Text
                      color={"gray.200"}
                      fontSize={"xs"}
                      fontWeight={"bold"}
                    >
                      @thelancethe
                    </Text>
                    <Text color="gray.500" fontSize={"xs"}>
                      Lance Endaya
                    </Text>
                  </Box>
                </HStack>
                {/*  <Text color={"gray.500"} fontSize={"xs"} textAlign={"center"}>
                  No recent searches.
                </Text> */}
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack>
              <Text
                as={"h1"}
                fontSize={"4xl"}
                color={"Highlight"}
                fontWeight={"black"}
              >
                thrdr.
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"sm"}
                color={"gray.300"}
                maxW={"xs"}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas eu massa feugiat.
              </Text>
              <Button
                w={"100%"}
                borderRadius={"full"}
                fontSize={"sm"}
                colorScheme="blue"
              >
                Sign up
              </Button>
              <Text fontSize={"xs"} color={"gray.400"}>
                Already have an account?{" "}
                <Text as={"span"} color={"Highlight"} fontWeight={"bold"}>
                  Sign in
                </Text>
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            {/*  <Button colorScheme="blue" mr={3}>
      Save
    </Button>
    <Button>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
