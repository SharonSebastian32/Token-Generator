import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const TokenDisplay = ({ tokens, tokensPerRow, color }) => {
  const renderTokenRows = () => {
    const rows = [];
    const itemsPerRow = parseInt(tokensPerRow) || 5;

    for (let i = 0; i < tokens.length; i += itemsPerRow) {
      const row = tokens.slice(i, i + itemsPerRow);
      rows.push(row);
    }

    return rows.map((row, rowIndex) => (
      <Box key={rowIndex} sx={{ display: "flex", gap: 1, mb: 1 }}>
        {row.map((token, tokenIndex) => (
          <Paper
            key={tokenIndex}
            sx={{
              p: 1,
              minWidth: 100,
              textAlign: "center",
              bgcolor: color === "blue" ? "primary.main" : "error.main",
              color: "white",
              fontWeight: "bold",
              padding: 3,
              margin: 1,
            }}
          >
            {token}
          </Paper>
        ))}
      </Box>
    ));
  };

  return tokens.length > 0 ? (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {color.charAt(0).toUpperCase() + color.slice(1)} Tokens
      </Typography>
      {renderTokenRows()}
    </Box>
  ) : null;
};

export default TokenDisplay;
