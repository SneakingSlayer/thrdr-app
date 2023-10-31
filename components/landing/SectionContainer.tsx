"use client";

import React from "react";

import { Box } from "@chakra-ui/react";

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
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
    }
  } else {
    if (userAgent.includes("wv")) {
      // Android webview
      console.log("WEBVIEW: true");
    } else {
      // Chrome
      console.log("WEBVIEW: false");
    }
  }
  return <Box mb={12}>{children}</Box>;
};

export default SectionContainer;
