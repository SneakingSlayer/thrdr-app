"use client";

import React from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  BsFillRocketTakeoffFill,
  BsQuestionCircleFill,
  BsPencilFill,
} from "react-icons/bs";

const About = () => {
  const aboutItems = [
    {
      title: "Think",
      description: "Think of something engaging & interesting!",
      icon: BsQuestionCircleFill,
    },
    {
      title: "Write",
      description: "Write it down & keep it concise.",
      icon: BsPencilFill,
    },
    {
      title: "Post",
      description: "Ship it across the world!",
      icon: BsFillRocketTakeoffFill,
    },
  ];

  return (
    <VStack>
      <Box mb={3}>
        <Text mb={1} as={"h2"} fontSize={"lg"} fontWeight={"bold"}>
          What is thrdr?
        </Text>
        <Text fontSize={"sm"} color={"gray.500"}>
          A platform where you can share your thoughts in bite-sized messages
          with people from around the world!
        </Text>
      </Box>
      <SimpleGrid gap={7} w={"100%"} columns={{ base: 1, sm: 2 }}>
        {aboutItems.map((item, i) => (
          <HStack gap={2} alignItems={"base"} key={i}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"lg"}
              bg={"rgba(99, 102, 241, .15)"}
              minW={35}
              h={35}
              borderWidth={1}
              borderColor={"brand.500"}
            >
              <Icon
                borderColor={"brand.500"}
                color={"brand.500"}
                as={item.icon}
              />
            </Flex>
            <Box>
              <Text fontSize={"sm"}>{item.title}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                {item.description}
              </Text>
            </Box>
          </HStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default About;
