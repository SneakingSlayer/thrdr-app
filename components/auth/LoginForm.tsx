"use client";

import React from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { SubmitButton } from "../button";
import { Footer } from "../landing";
import Link from "next/link";
const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const searchParams = useSearchParams();

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    await signIn("credentials", {
      userName: values.userName,
      password: values.password,
      callbackUrl: `/${values.userName}`,
    });
    setIsSubmitting(false);
  };

  return (
    <Flex flexDirection={"column"} w={"100%"} h={"100%"}>
      <Flex
        flexGrow={1}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          my={5}
        >
          <Image
            w={"100%"}
            h={"auto"}
            maxW={200}
            src="/thrdr-logo-full.svg"
            alt="thrdr-logo"
          />
          <Text mt={2} color={"gray.500"} fontSize={"sm"}>
            {"Hello there, let's get threading!"}
          </Text>
        </Flex>
        <Box w={"100%"} maxW={350} as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <FormControl>
              <FormLabel color={"gray.500"} fontSize={"xs"}>
                Username
              </FormLabel>
              <Input
                size={"sm"}
                {...register("userName")}
                placeholder="Username"
                variant={"filled"}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"gray.500"} fontSize={"xs"}>
                Password
              </FormLabel>
              <Input
                size={"sm"}
                {...register("password")}
                placeholder="Password"
                variant={"filled"}
                type="password"
              />
            </FormControl>
          </VStack>
          <Flex justifyContent={"space-between"} alignItems={"center"} mt={4}>
            <SubmitButton isSubmitting={isSubmitting} title="Login" />
            <Text color={"gray.500"} fontSize={"xs"}>
              {"Don't have an account?"}{" "}
              <Link href={"/signup"}>
                <Text as={"span"} color={"brand.500"} fontWeight={"bold"}>
                  Sign up
                </Text>
              </Link>
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default LoginForm;
