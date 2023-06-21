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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { SubmitButton } from "../button";

import { SIGN_UP_API } from "@/constants";

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
    <Flex
      h={"100%"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box onSubmit={handleSubmit(onSubmit)} as="form" w={"100%"}>
        <VStack>
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel fontSize={"sm"} color={"gray.500"} fontWeight={"bold"}>
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
              borderRadius={"md"}
              background={"gray.900"}
              size={"sm"}
              placeholder="Name"
              border={0}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.userName)}>
            <FormLabel fontSize={"sm"} color={"gray.500"} fontWeight={"bold"}>
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
              borderRadius={"md"}
              background={"gray.900"}
              size={"sm"}
              placeholder="Username"
              border={0}
            />
            <FormErrorMessage>
              {errors.userName && errors.userName.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel fontSize={"sm"} color={"gray.500"} fontWeight={"bold"}>
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
              background={"gray.900"}
              size={"sm"}
              placeholder="Password"
              borderRadius={"md"}
              border={0}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message?.toString()}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <SubmitButton title="Sign up" isSubmitting={isSubmitting} />
        {/* <Button type="submit" w={"100%"} size={"sm"} my={"1rem"}>
          Sign up
        </Button> */}
      </Box>
    </Flex>
  );
};

export default RegistrationForm;
