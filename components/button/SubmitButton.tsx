"use client";

import React from "react";
import { Button, Spinner } from "@chakra-ui/react";

interface SubmitProps {
  title: string;
  isSubmitting: boolean;
  size?: "xs" | "sm";
}

const SubmitButton = ({ title, isSubmitting, size = "sm" }: SubmitProps) => {
  return (
    <Button
      _hover={{ bg: "brand.600" }}
      bg={"brand.500"}
      color={"white"}
      type="submit"
      size={size}
    >
      {isSubmitting ? <Spinner size={size} /> : title}
    </Button>
  );
};

export default SubmitButton;
