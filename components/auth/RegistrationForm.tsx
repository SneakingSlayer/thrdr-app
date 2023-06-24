"use client";

import React from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  Flex,
  FormErrorMessage,
  Image,
  Text,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { SubmitButton } from "../button";

import { SIGN_UP_API } from "@/constants";
import { Footer } from "../landing";
import Link from "next/link";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      const result = await fetch(SIGN_UP_API, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex h={"100%"} flexDirection={"column"}>
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
            {"Ready to join us? Fill the form!"}
          </Text>
        </Flex>
        <Box maxW={350} onSubmit={handleSubmit(onSubmit)} as="form" w={"100%"}>
          <VStack>
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel fontSize={"xs"} color={"gray.500"} fontWeight={"bold"}>
                Name
              </FormLabel>
              <Input
                {...register("name", {
                  required: "Your name is required",
                  minLength: {
                    value: 2,
                    message: "Your name must contain atleast 2 letters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Your name must not exceed 50 letters.",
                  },
                })}
                variant={"filled"}
                size={"sm"}
                placeholder="Name"
              />
              <FormErrorMessage>
                {errors.name && errors.name.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.userName)}>
              <FormLabel fontSize={"xs"} color={"gray.500"} fontWeight={"bold"}>
                Username
              </FormLabel>
              <Input
                {...register("userName", {
                  required: "Your username is required",
                  minLength: {
                    value: 5,
                    message: "Your username must contain atleast 5 letters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Your name must not exceed 50 letters.",
                  },
                })}
                variant={"filled"}
                size={"sm"}
                placeholder="Username"
              />
              <FormErrorMessage>
                {errors.userName && errors.userName.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel fontSize={"xs"} color={"gray.500"} fontWeight={"bold"}>
                Password
              </FormLabel>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Your username must contain atleast 7 letters.",
                  },
                })}
                type="password"
                variant={"filled"}
                size={"sm"}
                placeholder="Password"
              />
              <FormErrorMessage>
                {errors.password && errors.password.message?.toString()}
              </FormErrorMessage>
            </FormControl>
          </VStack>
          <Flex justifyContent={"space-between"} alignItems={"center"} mt={4}>
            <SubmitButton isSubmitting={isSubmitting} title="Sign up" />
            <Text color={"gray.500"} fontSize={"xs"}>
              {"Have an account?"}{" "}
              <Link href={"/signin"}>
                <Text as={"span"} color={"brand.500"} fontWeight={"bold"}>
                  Sign in
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

export default RegistrationForm;
