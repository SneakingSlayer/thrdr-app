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
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";

import { useModalState } from "@/hooks";
import Link from "next/link";

const AuthModal = () => {
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
      <Modal isOpen={isOpen("AUTH_GUARD_MODAL")} onClose={() => setModalId("")}>
        <ModalOverlay />
        <ModalContent
          py={5}
          background={"rgba(45, 55, 72, .5)"}
          backdropFilter={"auto"}
          backdropBlur={"8px"}
          mx={3}
        >
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Image
                w={"180px"}
                h={"100%"}
                src="/thrdr-logo-full.svg"
                alt="thrdr-logo"
              />
              <Text
                textAlign={"center"}
                fontSize={"sm"}
                color={"gray.300"}
                maxW={"xs"}
              >
                {
                  "Ooppss... it seems that you're not yet logged in. Please try again."
                }
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Flex
              flexDirection={"column"}
              w={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                w={"40%"}
                mb={3}
                bg={"brand.500"}
                borderRadius={"full"}
                size="sm"
                onClick={() => handleNavigate("/signup")}
              >
                Sign up
              </Button>
              <Text fontSize={"xs"} color={"gray.500"}>
                Already have an account?{" "}
                <Button
                  variant={"unstyled"}
                  size={"xs"}
                  onClick={() => handleNavigate("/signin")}
                >
                  <Text as={"span"} color={"brand.500"} fontWeight={"bold"}>
                    Sign in
                  </Text>
                </Button>
              </Text>
            </Flex>
          </ModalFooter>
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

export default AuthModal;
