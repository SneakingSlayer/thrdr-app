"use client";

import React from "react";

import { Box, Flex, HStack, Text, Icon } from "@chakra-ui/react";

import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

import moment from "moment";
import Link from "next/link";
import {
  FACEBOOK_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  TWITTER_URL,
} from "@/constants";

const Footer = () => {
  return (
    <Box as={"footer"} py={5}>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HStack spacing={4} mb={3}>
          <Link target="_blank" rel="noopener noreferrer" href={FACEBOOK_URL}>
            <Icon
              color={"gray.500"}
              _hover={{ color: "Highlight" }}
              as={BsFacebook}
            />
          </Link>
          <Link target="_blank" rel="noopener noreferrer" href={INSTAGRAM_URL}>
            <Icon
              color={"gray.500"}
              _hover={{ color: "Highlight" }}
              as={BsInstagram}
            />
          </Link>
          <Link target="_blank" rel="noopener noreferrer" href={TWITTER_URL}>
            <Icon
              color={"gray.500"}
              _hover={{ color: "Highlight" }}
              as={BsTwitter}
            />
          </Link>
          <Link target="_blank" rel="noopener noreferrer" href={GITHUB_URL}>
            <Icon
              color={"gray.500"}
              _hover={{ color: "Highlight" }}
              as={BsGithub}
            />
          </Link>
        </HStack>
        <Box textAlign={"center"}>
          <Text color={"gray.500"} fontSize={"xs"}>
            © {moment().year()} Marama Networks. All rights reserved.
          </Text>
          <Text color={"gray.500"} fontSize={"xs"}>
            Developed by Lance Endaya
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
