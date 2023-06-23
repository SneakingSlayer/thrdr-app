"use client";

import React from "react";

import { Box, Button, ButtonGroup, Flex, Image, Text } from "@chakra-ui/react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Hero = () => {
  return (
    <Box textAlign={"center"}>
      <Box mb={6}>
        <Text mb={2} as={"h1"} fontSize={"4xl"} fontWeight={"bold"}>
          Bump your friends & stir up something spicy!
        </Text>
        {/** Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
          laoreet risus. */}
        <Text fontSize={"sm"} as={"p"} color={"gray.500"}>
          Your Digital Oasis of Discussions: Where Ideas Flourish, Friendships
          Bloom, and Where Genuine Connections are Cultivated.
        </Text>
      </Box>
      <ButtonGroup>
        <Button
          bg={"brand.600"}
          color={"white"}
          _hover={{ bg: "brand.700" }}
          size={"sm"}
        >
          Get Started
        </Button>
        <Button
          color={"white"}
          _hover={{ color: "brand.500" }}
          size={"sm"}
          variant={"ghost"}
          rightIcon={<HiOutlineArrowNarrowRight fontSize={24} />}
        >
          Learn more
        </Button>
      </ButtonGroup>
      <Flex justifyContent={"center"} alignItems={"center"} my={10}>
        <Image w={"100%"} h={"auto"} maxW={400} src="/hero.png" alt="hero" />
      </Flex>
    </Box>
  );
};

export default Hero;
