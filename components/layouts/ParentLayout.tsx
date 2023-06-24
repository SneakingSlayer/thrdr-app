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
  defineStyleConfig,
} from "@chakra-ui/react";

// Google fonts
import { Poppins } from "next/font/google";

// Components
import { AuthModal, Navbar } from "@/components";
import { Session } from "next-auth";

const poppins = Poppins({
  subsets: ["devanagari"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors: {
    brand: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
  },
  components: {
    Textarea: {
      filled: {
        field: {
          _focus: {
            borderColor: "brand.500",
            borderWidth: 1,
          },
          borderRadius: "md",
          fontSize: "sm",
        },
      },
    },
    Input: {
      defaultProps: {
        background: "blue",
      },
      variants: {
        filled: {
          field: {
            _focus: {
              borderColor: "brand.500",
              borderWidth: 1,
            },
            borderRadius: "md",
            fontSize: "sm",
          },
        },
      },
    },
  },
  config,
});

const ParentLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <GlobalModalProvider>
              <CacheProvider>
                <ChakraProvider theme={theme}>
                  <Container h={"100%"} paddingTop={"6rem"} maxW={"lg"}>
                    <Navbar session={session} />
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
