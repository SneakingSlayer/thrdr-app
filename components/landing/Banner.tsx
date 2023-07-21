"use client";

import React from "react";

import { Box, Button, Image, Text } from "@chakra-ui/react";
import { CgArrowLongRight } from "react-icons/cg";

import { SectionContainer } from "@/components";

import Link from "next/link";

const Banner = () => {
  return (
    <Box
      w={"100%"}
      bg={"brand.600"}
      p={5}
      position={"relative"}
      borderRadius={"xl"}
      overflow={"hidden"}
    >
      <Image
        src="/thrdr-icon-nude.svg"
        alt="thrdr-icon"
        position={"absolute"}
        right={5}
        top={-5}
        w={"100%"}
        h={"auto"}
        maxW={180}
        transform={"rotate(45deg)"}
        opacity={0.1}
      />
      <Box
        bg={
          "linear-gradient(135deg, rgba(249,249,249,0.21060924369747902) 0%, rgba(79,70,229,0) 49%)"
        }
        borderRadius={"xl"}
        position={"absolute"}
        h={"100%"}
        w={"100%"}
        top={0}
        left={0}
        zIndex={2}
      />
      <Box>
        <Box mb={2}>
          <Text fontWeight={"bold"}>Join us now!</Text>
          <Text fontSize={"sm"} color={"gray.300"}>
            Sign up now & start posting, liking, & commenting on threads from
            our community. We have over 500 users worldwide!
          </Text>
        </Box>
        <Link href={"/signin"}>
          <Button
            size={"xs"}
            rightIcon={<CgArrowLongRight />}
            variant={"solid"}
            zIndex={3}
          >
            Get started
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Banner;
