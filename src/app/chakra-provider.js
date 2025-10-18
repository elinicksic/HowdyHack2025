"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Create a basic theme; you can customize this if needed
const theme = extendTheme({});

export function ChakraProviderWrapper({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
