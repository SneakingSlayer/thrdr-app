"use client";

import React, { Suspense } from "react";

// Providers
import { Box, ChakraProvider, Spinner, extendTheme } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Chakra UI
import { Container, IconButton } from "@chakra-ui/react";

// Google fonts
import { Poppins } from "next/font/google";

// Components
import {
  AuthModal,
  Navbar,
  ScrollToTop,
  GlobalModalProvider,
} from "@/components";
import { Session } from "next-auth";

import NextTopLoader from "nextjs-toploader";

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
    Input: {
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
    Textarea: {
      variants: {
        filled: {
          _focus: {
            borderColor: "brand.500",
          },
          fontSize: "sm",
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
        <NextTopLoader
          color="#7c3aed"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <GlobalModalProvider>
              <CacheProvider>
                <ChakraProvider theme={theme}>
                  <Container h={"100%"} paddingTop={"6rem"} maxW={"lg"}>
                    <ScrollToTop />
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
