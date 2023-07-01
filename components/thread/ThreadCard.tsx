import React from "react";

import moment from "moment";

import {
  Card,
  CardHeader,
  HStack,
  Avatar,
  Box,
  Text,
  CardBody,
  CardFooter,
  Button,
  Stack,
  AvatarGroup,
  Spinner,
} from "@chakra-ui/react";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { useLikeThreadMutation, useGetProfilePic } from "@/hooks";

import type { Thread } from "@/types";

const ThreadCard = ({ thread, userId }: { thread: Thread; userId: string }) => {
  const router = useRouter();
  const userLikesId = thread?.likes?.map((like) => like.userId) ?? [];
  const hasLiked = userLikesId.includes(userId);
  const params = useParams();

  const { mutate, isLoading } = useLikeThreadMutation({
    hasLiked,
    createdFor: params?.id,
    forSingleThread: false,
  });

  const { getImageUri } = useGetProfilePic({});

  return (
    <Card w={"100%"}>
      <CardHeader pb={0}>
        <HStack>
          <Avatar
            bg={"brand.200"}
            name={thread.createdBy.name}
            src={getImageUri(thread.createdBy.userName)}
            size={"sm"}
          />
          <Box>
            <Link href={`/u/${thread.createdBy.userName}`}>
              <Text
                _hover={{ textDecoration: "underline" }}
                fontSize={"xs"}
                color={"brand.200"}
                fontWeight={"700"}
              >
                {thread.createdBy.userName}
              </Text>
            </Link>
            <Text fontSize={"xs"} color={"gray.500"}>
              {moment(thread.createdAt).fromNow()}
            </Text>
          </Box>
        </HStack>
      </CardHeader>
      <CardBody py={3}>
        <Text>{thread.description}</Text>
      </CardBody>
      <CardFooter pt={0}>
        <Stack
          w={"100%"}
          spacing={4}
          direction={{ base: "column-reverse", md: "row" }}
          justifyContent={"space-between"}
        >
          <HStack>
            <Button
              onClick={async () =>
                await mutate({
                  userId,
                  threadId: thread.id,
                })
              }
              leftIcon={<AiOutlineHeart />}
              size={"xs"}
              disabled={hasLiked}
              bg={hasLiked ? "brand.500" : "whiteAlpha.200"}
            >
              {thread._count.likes} Likes
            </Button>
            <Link href={`/thread/${thread.id}`} prefetch={false}>
              <Button leftIcon={<BiComment />} size={"xs"}>
                {thread._count.comments} Replies
              </Button>
            </Link>
            {isLoading && <Spinner size={"xs"} />}
          </HStack>
          {thread.comments?.length > 0 ? (
            <HStack>
              <AvatarGroup size={"xs"} fontSize={"xs"} spacing={-2}>
                {thread?.comments?.map((el, i) => (
                  <Avatar
                    bg={"brand.200"}
                    key={i}
                    name={el.createdBy.name}
                    src={getImageUri(el?.createdBy?.userName)}
                    borderColor={"gray.700"}
                    borderWidth={1}
                  />
                ))}
              </AvatarGroup>
              <Text fontSize={"xs"} color={"gray.500"}>
                {thread._count.comments > 2
                  ? `and ${thread._count.comments - 2} others...`
                  : "is here"}
              </Text>
            </HStack>
          ) : (
            <Text fontSize={"xs"} color={"gray.500"}>
              Nobody is here yet.
            </Text>
          )}
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
