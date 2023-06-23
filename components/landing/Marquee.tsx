"use client";

import { Box, Icon, Text } from "@chakra-ui/react";
import React from "react";

import RFMarquee from "react-fast-marquee";

import { FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiPrisma,
  SiReactquery,
  SiChakraui,
  SiNodedotjs,
  SiVercel,
  SiSupabase,
} from "react-icons/si";

const Marquee = () => {
  return (
    <Box mt={5}>
      <RFMarquee
        speed={20}
        gradient
        gradientColor={[26, 32, 44]}
        gradientWidth={100}
      >
        <Icon mr={10} fontSize={"4xl"} as={FaReact} />
        <Icon mr={10} fontSize={"4xl"} as={SiNextdotjs} />
        <Icon mr={10} fontSize={"4xl"} as={SiPrisma} />
        <Icon mr={10} fontSize={"4xl"} as={SiReactquery} />
        <Icon mr={10} fontSize={"4xl"} as={SiVercel} />
        <Icon mr={10} fontSize={"4xl"} as={SiChakraui} />
        <Icon mr={10} fontSize={"4xl"} as={SiNodedotjs} />
        <Icon mr={10} fontSize={"4xl"} as={SiSupabase} />
      </RFMarquee>
      <Text mt={4} textAlign={"center"} fontSize={"xs"} color={"gray.500"}>
        Powered by
      </Text>
    </Box>
  );
};

export default Marquee;
