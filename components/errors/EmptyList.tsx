"use client";

import { Icon, Box, Text } from "@chakra-ui/react";
import React from "react";
import { BsRocketTakeoffFill } from "react-icons/bs";

const EmptyList = () => {
  return (
    <Box textAlign={"center"} maxW={150}>
      <Icon
        fontSize={"2xl"}
        color={"gray.500"}
        as={BsRocketTakeoffFill}
        mb={1}
      />
      <Text fontSize={"xs"} color={"gray.500"}>
        Nothing here yet. Care to be the first?
      </Text>
    </Box>
  );
};

export default EmptyList;
