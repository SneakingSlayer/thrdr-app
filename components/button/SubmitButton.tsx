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
    <Button type="submit" size={size}>
      {isSubmitting ? <Spinner size={size} /> : title}
    </Button>
  );
};

export default SubmitButton;
