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
} from "@chakra-ui/react";

import { useModalState } from "@/hooks";

const AuthModal = () => {
  const { isOpen, setModalId } = useModalState();
  return (
    <>
      <Modal isOpen={isOpen("AUTH_GUARD_MODAL")} onClose={() => setModalId("")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas eu massa feugiat.
              </Text>
              <Button w={"100%"} borderRadius={"full"} fontSize={"sm"}>
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
