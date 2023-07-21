"use client";

import React from "react";

import { Box, Button, ButtonGroup, Flex, Image, Text } from "@chakra-ui/react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import Link from "next/link";

const Hero = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // first prevent the default behavior
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };
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
        <Link href={"/signup"}>
          <Button
            bg={"brand.600"}
            color={"white"}
            _hover={{ bg: "brand.700" }}
            size={"sm"}
          >
            Get Started
          </Button>
        </Link>
        <Link href="#about" onClick={handleScroll}>
          <Button
            color={"white"}
            _hover={{ color: "brand.500" }}
            size={"sm"}
            variant={"ghost"}
            rightIcon={<HiOutlineArrowNarrowRight fontSize={24} />}
          >
            Learn more
          </Button>
        </Link>
      </ButtonGroup>
      <Flex justifyContent={"center"} alignItems={"center"} my={10}>
        <Image w={"100%"} h={"auto"} maxW={400} src="/hero.png" alt="hero" />
      </Flex>
    </Box>
  );
};

export default Hero;
