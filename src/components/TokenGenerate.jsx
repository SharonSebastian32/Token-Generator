import React, { useState, useMemo } from "react";
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getDesignTokens } from "../theme/theme";
import ThemeToggle from "./ThemeToggle";
import TokenInput from "./TokenInput";
import TokenDisplay from "./TokenDisplay";

const TokenGenerator = () => {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const [formData, setFormData] = useState({
    blueTokens: "",
    bluePrefix: "",
    blueTokensPerRow: "",
    redTokens: "",
    redPrefix: "",
    redTokensPerRow: "",
  });

  const [tokens, setTokens] = useState({ blue: [], red: [] });
  const [errors, setErrors] = useState({});

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const {
      blueTokens,
      redTokens,
      bluePrefix,
      redPrefix,
      blueTokensPerRow,
      redTokensPerRow,
    } = formData;

    if (!blueTokens || isNaN(blueTokens) || parseInt(blueTokens) <= 0) {
      newErrors.blueTokens = "Number of blue tokens must be a positive number.";
    }
    if (!bluePrefix) {
      newErrors.bluePrefix = "Blue tokens prefix is required.";
    }
    if (
      !blueTokensPerRow ||
      isNaN(blueTokensPerRow) ||
      parseInt(blueTokensPerRow) <= 0
    ) {
      newErrors.blueTokensPerRow =
        "Blue tokens per row must be a positive number.";
    }

    if (!redTokens || isNaN(redTokens) || parseInt(redTokens) <= 0) {
      newErrors.redTokens = "Number of red tokens must be a positive number.";
    }
    if (!redPrefix) {
      newErrors.redPrefix = "Red tokens prefix is required.";
    }
    if (
      !redTokensPerRow ||
      isNaN(redTokensPerRow) ||
      parseInt(redTokensPerRow) <= 0
    ) {
      newErrors.redTokensPerRow =
        "Red tokens per row must be a positive number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generateTokens = () => {
    if (!validateForm()) return;

    const createTokenArray = (prefix, count) =>
      Array.from({ length: parseInt(count) }, (_, i) => `${prefix}${i + 1}`);

    setTokens({
      blue: createTokenArray(formData.bluePrefix, formData.blueTokens),
      red: createTokenArray(formData.redPrefix, formData.redTokens),
    });
  };

  const clearAll = () => {
    setFormData({
      blueTokens: "",
      bluePrefix: "",
      blueTokensPerRow: "",
      redTokens: "",
      redPrefix: "",
      redTokensPerRow: "",
    });
    setTokens({ blue: [], red: [] });
    setErrors({});
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          transition: "background-color 0.3s ease",
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 3, pb: 4 }}>
          <Card>
            <CardHeader
              action={
                <ThemeToggle mode={mode} toggleColorMode={toggleColorMode} />
              }
            />
            <h1 style={{ textAlign: "center" }}>Token Generator</h1>
            <CardContent>
              {Object.keys(errors).length > 0 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  <ul>
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </Alert>
              )}

              <Grid container spacing={3}>
                <TokenInput
                  color="blue"
                  formData={formData}
                  handleInputChange={handleInputChange}
                  error={errors}
                />
                <TokenInput
                  color="red"
                  formData={formData}
                  handleInputChange={handleInputChange}
                  error={errors}
                />
              </Grid>

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={generateTokens}
                >
                  Generate
                </Button>
                <Button variant="outlined" onClick={clearAll}>
                  Clear
                </Button>
              </Box>

              <Box sx={{ mt: 4 }}>
                <TokenDisplay
                  tokens={tokens.blue}
                  tokensPerRow={formData.blueTokensPerRow}
                  color="blue"
                />
                <TokenDisplay
                  tokens={tokens.red}
                  tokensPerRow={formData.redTokensPerRow}
                  color="red"
                />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TokenGenerator;
