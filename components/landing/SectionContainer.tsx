"use client";

import React from "react";

import { Box } from "@chakra-ui/react";

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return <Box mb={9}>{children}</Box>;
};

export default SectionContainer;
