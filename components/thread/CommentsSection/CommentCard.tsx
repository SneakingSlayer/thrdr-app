"use client";

import React from "react";
import { Box, HStack, Avatar, Text, Link } from "@chakra-ui/react";
import moment from "moment";
import { Comments } from "@/types";

const CommentCard = ({ comment }: { comment: Comments }) => {
  return (
    <Box>
      <HStack mb={3}>
        <Avatar
          size={"xs"}
          src={comment.createdBy.image}
          name={comment.createdBy.name}
        />
        <Box>
          <Text color={"Highlight"} fontWeight={"bold"} fontSize={"xs"}>
            <Link href={`/${comment.createdBy.userName}`}>
              {comment.createdBy.userName}
            </Link>{" "}
            <Text
              fontWeight={"normal"}
              color={"gray.500"}
              fontSize={"xs"}
              as={"span"}
            >
              {moment(comment.createdAt).fromNow()}
            </Text>
          </Text>
        </Box>
      </HStack>
      <Text fontSize={"sm"}>{comment.comment}</Text>
    </Box>
  );
};

export default CommentCard;
