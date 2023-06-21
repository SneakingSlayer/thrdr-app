"use client";

import React from "react";

import { Avatar, Text, Flex, VStack, HStack } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById } from "@/queries";
import { User } from "@/types";

const ProfileSection = (props: User) => {
  const { data } = useQuery({
    queryKey: ["profile", props?.userName],
    initialData: props,
    queryFn: async () => await getUserById(props?.userName),
    enabled: !props,
  });

  return (
    <Flex mb={5} w={"100%"} justifyContent={"center"} alignItems={"center"}>
      <VStack spacing={3}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar src={data.image} name={data.name} mb={3} />
          <Text color={"Highlight"} fontSize={"xs"} fontWeight={"bold"}>
            @{data.userName}
          </Text>
        </Flex>
        <HStack spacing={3}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {data?._count?.creationsFor}{" "}
            <Text
              fontSize={"xs"}
              color={"gray.500"}
              as="span"
              fontWeight={"normal"}
            >
              Threads
            </Text>
          </Text>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {data?._count?.comments}{" "}
            <Text
              fontSize={"xs"}
              color={"gray.500"}
              as="span"
              fontWeight={"normal"}
            >
              Comments
            </Text>
          </Text>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {data?._count?.likes}{" "}
            <Text
              fontSize={"xs"}
              color={"gray.500"}
              as="span"
              fontWeight={"normal"}
            >
              Likes
            </Text>
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default ProfileSection;
