"use client";

import React from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const onSubmit = async (values: any) => {
    await signIn("credentials", {
      userName: "123123",
      password: "123123",
      callbackUrl,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            {...register("userName")}
            placeholder="Username"
            bg={"gray.900"}
            border={0}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            placeholder="Password"
            bg={"gray.900"}
            border={0}
          />
        </FormControl>
        <Button type="submit" size={"sm"} w={"100%"}>
          Sign In
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
