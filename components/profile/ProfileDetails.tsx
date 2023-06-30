"use client";

import React from "react";

import {
  Avatar,
  Text,
  Flex,
  VStack,
  HStack,
  IconButton,
  Tooltip,
  Input,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api";
import { User } from "@/types";
import { useGetProfilePic } from "@/hooks";
import { BsLink45Deg } from "react-icons/bs";

const ProfileDetails = (props: User) => {
  const { data } = useQuery({
    queryKey: ["profile", props?.userName],
    initialData: props,
    queryFn: async () => await getUserById(props?.userName),
    enabled: !props,
  });

  const { getImageUri } = useGetProfilePic({});

  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "";

  return (
    <Flex mb={5} w={"100%"} justifyContent={"center"} alignItems={"center"}>
      <VStack spacing={3}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            bg={"brand.200"}
            src={getImageUri(data?.userName)}
            name={data.name}
            mb={3}
          />
          <Text fontWeight={"bold"} fontSize={"sm"} color={"brand.400"}>
            {data.name}{" "}
          </Text>
          <Text color={"gray.200"} fontSize={"xs"} fontWeight={"bold"}>
            @{data.userName}
          </Text>
        </Flex>
        {/*  <Flex alignItems={"center"} justifyContent={"center"} gap={3}>
          <Text color={"gray.500"} noOfLines={1} maxW={"100px"} fontSize={"xs"}>
            {profileUrl}
          </Text>
          <Tooltip fontSize={"xs"} hasArrow label="Copy your link">
            <IconButton
              size={"xs"}
              icon={<BsLink45Deg />}
              aria-label="copy-link"
            />
          </Tooltip>
        </Flex> */}

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
        <HStack spacing={0}>
          <Input
            maxW={"110x"}
            disabled
            variant={"filled"}
            fontSize={"xs"}
            noOfLines={1}
            size={"xs"}
            value={profileUrl}
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
          />
          <Tooltip fontSize={"xs"} hasArrow label="Share this profile">
            <IconButton
              onClick={() => navigator.clipboard.writeText(profileUrl)}
              _hover={{ bg: "brand.500" }}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              size={"xs"}
              icon={<BsLink45Deg />}
              aria-label="copy-link"
            />
          </Tooltip>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default ProfileDetails;
