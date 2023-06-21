"use client";

import React from "react";

import { Container as ChakraContainer } from "@chakra-ui/react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <ChakraContainer>{children}</ChakraContainer>;
};

export default Container;
