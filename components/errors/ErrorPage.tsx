"use client";

import React from "react";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Footer } from "../landing";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
const ErrorPage = () => {
  return (
    <>
      <Flex
        h={"100%"}
        flexGrow={1}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box mb={4} textAlign={"center"}>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            ERROR 404
          </Text>
          <Text color={"gray.500"}>Page not found.</Text>
        </Box>
        <Button
          size={"sm"}
          variant={"ghost"}
          color={"brand.500"}
          rightIcon={<HiOutlineArrowLongRight fontSize={26} />}
        >
          Return Home
        </Button>
      </Flex>
      <Footer />
    </>
  );
};

export default ErrorPage;
