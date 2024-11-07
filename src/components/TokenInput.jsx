import React from "react";
import { Box, Typography, TextField, Grid } from "@mui/material";

const TokenInput = ({ color, formData, handleInputChange, error }) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" gutterBottom>
        {`${
          color.charAt(0).toUpperCase() + color.slice(1)
        } Token Configuration`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label={`Number of ${color} tokens`}
          name={`${color}Tokens`}
          type="number"
          value={formData[`${color}Tokens`]}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!error[`${color}Tokens`]}
          helperText={error[`${color}Tokens`] || ""}
        />
        <TextField
          label={`Prefix for ${color} tokens`}
          name={`${color}Prefix`}
          value={formData[`${color}Prefix`]}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!error[`${color}Prefix`]}
          helperText={error[`${color}Prefix`] || ""}
        />
        <TextField
          label={`${
            color.charAt(0).toUpperCase() + color.slice(1)
          } tokens per row`}
          name={`${color}TokensPerRow`}
          type="number"
          value={formData[`${color}TokensPerRow`]}
          onChange={handleInputChange}
          fullWidth
          required
          error={!!error[`${color}TokensPerRow`]}
          helperText={error[`${color}TokensPerRow`] || ""}
        />
      </Box>
    </Grid>
  );
};

export default TokenInput;
