"use client";

import { useState } from "react";
import { Input, Button, Box, Text } from "@chakra-ui/react";

export default function GeminiInput() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace the URL below with the actual free Gemini API endpoint
      const res = await fetch("https://api.gemini.example.com/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: text })
      });
      const data = await res.json();
      setResponse(data.response || "No answer received");
    } catch (error) {
      setResponse("Error calling API");
    }
    setLoading(false);
  }

  return (
    <Box mt={8}>
      <form onSubmit={handleSubmit}>
        <Box>
          <Text as="label" htmlFor="gemini-input" mb={2} fontWeight="semibold">
            Ask Gemini
          </Text>
          <Input
            id="gemini-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your question here"
          />
        </Box>
        <Button mt={4} type="submit" colorScheme="blue" isLoading={loading}>
          Submit
        </Button>
      </form>
      {response && (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
          <Text>{response}</Text>
        </Box>
      )}
    </Box>
  );
}
