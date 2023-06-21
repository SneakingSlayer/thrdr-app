"use client";

import React from "react";

// Providers
import { ChakraProvider, Spinner, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalModalProvider } from "@/components";

// Chakra UI
import {
  Container,
  withDefaultColorScheme,
  withDefaultProps,
} from "@chakra-ui/react";

// Google fonts
import { Poppins } from "next/font/google";

// Components
import { AuthModal } from "@/components";
import { GlobalModalContext } from "../modals/GlobalModalProvider";

const poppins = Poppins({
  subsets: ["devanagari"],
  weight: "400",
});

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
    /*  colors: {
      brand: {
        50: "#b3c3f3",
        100: "#a0b4f0",
        200: "#8da5ed",
        300: "#7a96ea",
        400: "#6787e7",
        500: "#5478e4",
        600: "#4169e1",
        700: "#3b5fcb",
        800: "#3454b4",
        900: "#2e4a9e",
      },
    }, */

    config,
  }
  /*  withDefaultColorScheme({ colorScheme: "brand" }),
  withDefaultProps({
    defaultProps: {
      color: "brand.500",
    },
    components: ["Button"],
  }) */
);

const ParentLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <GlobalModalProvider>
              <CacheProvider>
                <ChakraProvider theme={theme}>
                  <Container h={"100%"} paddingTop={"5rem"} maxW={"lg"}>
                    {children}
                  </Container>
                  <RootModals />
                </ChakraProvider>
              </CacheProvider>
            </GlobalModalProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

const RootModals = () => {
  return (
    <>
      <AuthModal />
    </>
  );
};

export default ParentLayout;
