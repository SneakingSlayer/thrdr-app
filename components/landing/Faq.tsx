"use client";

import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";

const Faq = () => {
  const faqItems = [
    {
      title: "Can my posts be anonymous?",
      description:
        "Yes, if you tick on the anonymous checkbox, your identity will be hidden from other users. This feature includes posts & and comments only.",
    },
    {
      title: "How do I reset my forgotten password?",
      description:
        'You can reset your password by hitting the "forgot password" link in the sign in page.',
    },
    {
      title: "Can I follow someone?",
      description:
        "This feature is still on the works but you will be able to pretty soon!",
    },
  ];

  return (
    <Box>
      <Text mb={4} fontWeight={"bold"} textAlign={"center"}>
        Frequently Asked Questions
      </Text>
      <Accordion defaultIndex={0}>
        {faqItems.map((faq, i) => (
          <AccordionItem key={i} border={0}>
            <AccordionButton
              _expanded={{
                color: "brand.400",
                borderWidth: 2,
                borderColor: "brand.500",
                bg: "rgba(99, 102, 241, .10)",
              }}
              borderRadius={"lg"}
            >
              <Box as="span" flex="1" textAlign="left" fontSize={"sm"}>
                {faq.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel fontSize={"sm"} color={"gray.500"}>
              {faq.description}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default Faq;
