"use client";

import React from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SubmitButton } from "../button";
import { User } from "@/types";

import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { USERS_API } from "@/constants";
import { useRouter } from "next/navigation";

const ProfileForm = (props: User) => {
  const { name, email, userName, id } = props;

  const router = useRouter();

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      name,
      email,
      userName,
      password: "",
    },
  });

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (newValue) => {
      const result = await fetch(`${USERS_API}/${id}`, {
        method: "PUT",
        body: JSON.stringify(newValue),
      });
      const res = await result.json();
      return res;
    },
  });

  const onSubmit = async (values: any) => await mutate(values);

  React.useEffect(() => {
    if (isSuccess) router.push(`/me/${getValues("userName")}`);
  }, [getValues, isSuccess, router]);

  return (
    <Flex w={"100%"} justifyContent={"center"}>
      <Box onSubmit={handleSubmit(onSubmit)} as="form" w={"100%"} maxW={350}>
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
          <SubmitButton isSubmitting={isLoading} title="Save" />
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default ProfileForm;
