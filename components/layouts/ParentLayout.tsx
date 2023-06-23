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
import { AuthModal, Navbar } from "@/components";

const poppins = Poppins({
  subsets: ["devanagari"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
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

    config,
  },
  withDefaultColorScheme({ colorScheme: "brand" }),
  withDefaultProps({
    defaultProps: {
      color: "brand.500",
    },
    components: ["Button"],
  })
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
                  <Container h={"100%"} paddingTop={"6rem"} maxW={"lg"}>
                    <Navbar session={null} />
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
