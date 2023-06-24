"use client";

import {
  Container,
  IconButton,
  Box,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

import { motion, AnimatePresence, isValidMotionProp } from "framer-motion";

const ScrollToTop = () => {
  const [y, setY] = React.useState(0);

  const handleNavigation = React.useCallback((e: any) => {
    const window = e.currentTarget;
    setY(window.scrollY);
  }, []);

  React.useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", (e) => handleNavigation(e));
    return () =>
      window.removeEventListener("scroll", (e) => handleNavigation(e));
  }, [handleNavigation]);

  return (
    <AnimatePresence>
      {y < 20 ? (
        <></>
      ) : (
        <ChakraBox
          key={"scroll-to-top"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // @ts-ignore no problem in operation, although type error appears.
          transition={{ duration: 0.5 }}
          w={"100%"}
          position={"fixed"}
          bottom={0}
          left={0}
          zIndex={10}
        >
          <Container maxW={"lg"} position={"relative"}>
            <IconButton
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size={"sm"}
              bg={"brand.100"}
              color={"brand.500"}
              position={"absolute"}
              right={5}
              bottom={5}
              icon={<FaArrowUp />}
              aria-label={""}
              _hover={{
                opacity: 0.8,
              }}
            />
          </Container>
        </ChakraBox>
      )}
    </AnimatePresence>
  );
};

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default ScrollToTop;
