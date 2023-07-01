"use client";

import React from "react";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  VStack,
  Text,
  FormErrorMessage,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { SubmitButton } from "../button";
import { Footer } from "../landing";
import Link from "next/link";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    clearErrors();
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      userName: values.userName,
      password: values.password,
      redirect: false,
    });

    if (!result?.error) {
      if (typeof window !== "undefined")
        window.location.href = `/u/${values.userName}`;
    } else {
      setError("userName", { type: "custom", message: "Incorrect username." });
      setError("password", { type: "custom", message: "Incorrect password." });
    }
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
            {(Boolean(errors?.userName) || Boolean(errors?.password)) && (
              <Alert borderRadius={"lg"} status="error">
                <AlertIcon />
                <AlertDescription fontSize={"xs"}>
                  Incorrect username or password. Try again.
                </AlertDescription>
              </Alert>
            )}
            <FormControl isInvalid={Boolean(errors?.userName)}>
              <FormLabel color={"gray.500"} fontSize={"xs"}>
                Username
              </FormLabel>
              <Input
                size={"sm"}
                {...register("userName", { required: "Username is required" })}
                placeholder="Username"
                variant={"filled"}
              />
              <FormErrorMessage>
                {errors?.userName && errors?.userName?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors?.password)}>
              <FormLabel color={"gray.500"} fontSize={"xs"}>
                Password
              </FormLabel>
              <Input
                size={"sm"}
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                variant={"filled"}
                type="password"
              />
              <FormErrorMessage>
                {errors?.password && errors?.password?.message?.toString()}
              </FormErrorMessage>
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
