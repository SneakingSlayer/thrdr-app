"use client";

import React from "react";

import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SubmitButton } from "../button";
import { User } from "@/types";

import { useForm } from "react-hook-form";

const ProfileForm = (props: User) => {
  const { name, email, userName } = props;

  const { register } = useForm({
    defaultValues: {
      name,
      email,
      userName,
      password: "",
    },
  });
  return (
    <Box as="form">
      <VStack spacing={4}>
        <FormControl>
          <FormLabel fontSize={"xs"} color={"gray.500"}>
            Name
          </FormLabel>
          <Input
            {...register("name")}
            variant={"filled"}
            size={"sm"}
            placeholder="Name"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"xs"} color={"gray.500"}>
            Email
          </FormLabel>
          <Input
            {...register("email")}
            variant={"filled"}
            size={"sm"}
            placeholder="Email"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"xs"} color={"gray.500"}>
            Username
          </FormLabel>
          <Input
            {...register("userName")}
            variant={"filled"}
            size={"sm"}
            placeholder="Username"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"xs"} color={"gray.500"}>
            Password
          </FormLabel>
          <Input
            type="password"
            {...register("password")}
            variant={"filled"}
            size={"sm"}
            placeholder="Password"
          />
        </FormControl>
      </VStack>
      <ButtonGroup mt={4} w={"100%"} justifyContent={"flex-end"}>
        <Button variant={"ghost"} size={"sm"} color={"red.400"}>
          Delete Account
        </Button>
        <SubmitButton isSubmitting={false} title="Save" />
      </ButtonGroup>
    </Box>
  );
};

export default ProfileForm;
