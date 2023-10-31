"use client";

import React from "react";

import { Box } from "@chakra-ui/react";

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  const [isWebview, setIsWebview] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      var standalone = (window.navigator as any).standalone,
        userAgent = window.navigator.userAgent.toLowerCase(),
        safari = /safari/.test(userAgent),
        ios = /iphone|ipod|ipad/.test(userAgent);

      if (ios) {
        if (!standalone && safari) {
          // Safari
          console.log("WEBVIEW: false");
        } else if (!standalone && !safari) {
          // iOS webview
          console.log("WEBVIEW: true");
          setIsWebview(true);
        }
      } else {
        if (userAgent.includes("wv")) {
          // Android webview
          console.log("WEBVIEW: true");
          setIsWebview(true);
        } else {
          // Chrome
          console.log("WEBVIEW: false");
        }
      }
    }
  }, []);

  return (
    <Box mb={12}>
      {isWebview && <h1 style={{ color: "white" }}>WEBVIEW</h1>}
      {children}
    </Box>
  );
};

export default SectionContainer;
