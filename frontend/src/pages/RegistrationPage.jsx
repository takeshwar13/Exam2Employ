import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
  FormControlLabel,
  Checkbox,
  Link,
  Stack,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Award,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Users,
  Building2,
  Briefcase,
} from "lucide-react";

// Define a custom dark theme to match the original design
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3B82F6", // Corresponds to blue-500
    },
    secondary: {
      main: "#A855F7", // Corresponds to purple-600
    },
    background: {
      default: "#0F172A", // Corresponds to slate-900
      paper: "rgba(255, 255, 255, 0.05)", // Corresponds to white/5 for cards
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#D1D5DB", // Corresponds to gray-300
    },
    error: {
      main: "#EF4444", // Corresponds to red-500
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif", // Set Inter as the default font
    h1: {
      fontSize: "3rem", // text-5xl
      fontWeight: 700, // font-bold
      lineHeight: 1.25, // leading-tight
      "@media (min-width:960px)": {
        // md breakpoint for larger screens
        fontSize: "3.75rem",
      },
    },
    h2: {
      fontSize: "1.5rem", // text-2xl for mobile
      fontWeight: 700,
      "@media (min-width:960px)": {
        // md breakpoint for larger screens
        fontSize: "2rem", // text-3xl
      },
    },
    h3: {
      fontSize: "1.25rem", // text-xl
      fontWeight: 600, // font-semibold
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem", // text-sm
    },
  },
  components: {
    // Inject Inter font and set the main background gradient
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(to bottom right, #0F172A, #5A2D8A, #0F172A); /* bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 */
        }
      `,
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "rgba(255, 255, 255, 0.1)", // bg-white/10
            backdropFilter: "blur(4px)", // backdrop-blur-sm
            borderRadius: "12px", // rounded-xl
            border: "1px solid rgba(255, 255, 255, 0.2)", // border border-white/20
            color: "white",
            transition: "all 0.3s ease",
            "&.Mui-focused": {
              borderColor: "#3B82F6", // focus:ring-blue-500
              boxShadow: "0 0 0 2px #3B82F6", // focus:ring-2
            },
            "&.Mui-error": {
              borderColor: "rgba(239, 68, 68, 0.5)", // border-red-500/50
              backgroundColor: "rgba(255, 80, 80, 0.1)", // bg-red-50/10
              "&.Mui-focused": {
                borderColor: "#EF4444",
                boxShadow: "0 0 0 2px #EF4444",
              },
            },
          },
          "& .MuiInputBase-input": {
            padding: "12px 16px", // py-3 px-4
            paddingLeft: "48px", // pl-12
            "&::placeholder": {
              color: "#D1D5DB", // placeholder-gray-300
              opacity: 1, // Ensure placeholder is visible
            },
          },
          "& .MuiInputLabel-root": {
            color: "#D1D5DB", // text-gray-300
            transform: "translate(48px, 12px) scale(1)", // Align label with input text
            "&.Mui-focused": {
              color: "#D1D5DB", // Keep label color consistent when focused
            },
            "&.MuiFormLabel-filled": {
              transform: "translate(14px, -9px) scale(0.75)", // Adjusted for filled state
            },
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -9px) scale(0.75)", // Adjusted for shrink state
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove default border
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // rounded-xl
          fontWeight: 600, // font-semibold
          textTransform: "none", // Prevent uppercase
          transition: "all 0.3s ease-in-out", // transition-all duration-300
          "&:hover": {
            transform: "scale(1.05)", // hover:scale-105
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // shadow-lg
          },
          "&.Mui-disabled": {
            opacity: 0.5, // disabled:opacity-50
            cursor: "not-allowed", // disabled:cursor-not-allowed
            transform: "none", // disabled:transform-none
          },
        },
        containedPrimary: {
          backgroundImage: "linear-gradient(to right, #3B82F6, #A855F7)", // bg-gradient-to-r from-blue-500 to-purple-600
          color: "white",
          "&:hover": {
            backgroundImage: "linear-gradient(to right, #2563EB, #9333EA)", // hover:from-blue-600 hover:to-purple-700
            boxShadow: "none", // Prevent default MUI hover shadow
          },
          "&:focus": {
            boxShadow: "0 0 0 2px #3B82F6, 0 0 0 4px #1F2937", // focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
          },
        },
        outlined: {
          // For social buttons and user type selection
          borderColor: "rgba(255, 255, 255, 0.2)", // border border-white/20
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05)", // hover:bg-white/5
            borderColor: "rgba(255, 255, 255, 0.3)",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#D1D5DB", // Default color for unchecked
          "&.Mui-checked": {
            color: "#3B82F6", // text-blue-600
          },
          "&.Mui-focusVisible": {
            boxShadow: "0 0 0 2px #3B82F6", // focus:ring-2 focus:ring-blue-500
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#60A5FA", // text-blue-400
          "&:hover": {
            color: "#93C5FD", // hover:text-blue-300
          },
          textDecoration: "none", // Remove underline
        },
      },
    },
  },
});

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "jobseeker",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registration submitted:", formData);
      // Handle successful registration here
    }, 2000);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2, // padding-4
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Elements */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "25%", // top-1/4
              left: "25%", // left-1/4
              width: "24rem", // w-96
              height: "24rem", // h-96
              backgroundColor: "rgba(59, 130, 246, 0.1)", // bg-blue-500/10
              borderRadius: "50%", // rounded-full
              filter: "blur(3rem)", // blur-3xl
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "25%", // bottom-1/4
              right: "25%", // right-1/4
              width: "24rem", // w-96
              height: "24rem", // h-96
              backgroundColor: "rgba(168, 85, 247, 0.1)", // bg-purple-500/10
              borderRadius: "50%", // rounded-full
              filter: "blur(3rem)", // blur-3xl
            }}
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1280px",
            mx: "auto",
          }}
        >
          {" "}
          {/* max-w-6xl mx-auto */}
          <Grid container spacing={4} alignItems="center">
            {" "}
            {/* grid lg:grid-cols-2 gap-8 items-center */}
            {/* Left Side - Branding & Info */}
            <Grid
              item
              xs={12}
              lg={6}
              sx={{ display: { xs: "none", lg: "block" }, color: "white" }}
            >
              {" "}
              {/* hidden lg:block text-white */}
              <Box sx={{ mb: 8 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    spaceX: 3,
                    mb: 6,
                  }}
                >
                  {" "}
                  {/* flex items-center space-x-3 mb-6 */}
                  <Box
                    sx={{
                      width: "3rem", // w-12
                      height: "3rem", // h-12
                      backgroundImage:
                        "linear-gradient(to right, #3B82F6, #A855F7)", // bg-gradient-to-r from-blue-500 to-purple-600
                      borderRadius: "0.75rem", // rounded-xl
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Award
                      sx={{
                        width: "1.75rem",
                        height: "1.75rem",
                        color: "white",
                      }}
                    />{" "}
                    {/* w-7 h-7 text-white */}
                  </Box>
                  <Typography
                    variant="h2"
                    component="span"
                    sx={{ fontSize: "1.875rem", fontWeight: 700 }}
                  >
                    {" "}
                    {/* text-3xl font-bold */}
                    Exam2Employ
                  </Typography>
                </Box>
                <Typography variant="h1" sx={{ mb: 4 }}>
                  {" "}
                  {/* text-5xl font-bold mb-4 leading-tight */}
                  Start Your
                  <Typography
                    component="span"
                    sx={{
                      backgroundImage:
                        "linear-gradient(to right, #60A5FA, #C084FC)", // from-blue-400 to-purple-400
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      ml: 1, // Add a small margin for separation
                    }}
                  >
                    Career Journey
                  </Typography>
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: "text.secondary", mb: 8, fontSize: "1.25rem" }}
                >
                  {" "}
                  {/* text-xl text-gray-300 mb-8 */}
                  Create your account and unlock personalized career
                  opportunities and skill assessments.
                </Typography>
              </Box>
              <Stack spacing={3}>
                {" "}
                {/* space-y-6 */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {" "}
                  {/* flex items-center space-x-4 */}
                  <Box
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: "rgba(59, 130, 246, 0.2)", // bg-blue-500/20
                      borderRadius: "0.5rem", // rounded-lg
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle
                      sx={{
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "#60A5FA",
                      }}
                    />{" "}
                    {/* w-6 h-6 text-blue-400 */}
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                      Personalized Dashboard
                    </Typography>{" "}
                    {/* font-semibold */}
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Track your progress and achievements
                    </Typography>{" "}
                    {/* text-gray-400 */}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: "rgba(168, 85, 247, 0.2)", // bg-purple-500/20
                      borderRadius: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle
                      sx={{
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "#C084FC",
                      }}
                    />{" "}
                    {/* text-purple-400 */}
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                      Skill Assessments
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Validate your skills with industry-standard tests
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: "rgba(34, 197, 94, 0.2)", // bg-green-500/20
                      borderRadius: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle
                      sx={{
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "#4ADE80",
                      }}
                    />{" "}
                    {/* text-green-400 */}
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                      Job Matching
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Get matched with relevant job opportunities
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
            {/* Right Side - Registration Form */}
            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "448px", // max-w-md
                  mx: "auto",
                  backgroundColor: "background.paper", // bg-white/5
                  backdropFilter: "blur(12px)", // backdrop-blur-xl
                  borderRadius: "1rem", // rounded-2xl
                  border: "1px solid rgba(255, 255, 255, 0.1)", // border border-white/10
                  p: 4, // p-8
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)", // shadow-2xl
                }}
              >
                {/* Mobile Header */}
                <Box
                  sx={{ display: { lg: "none" }, textAlign: "center", mb: 4 }}
                >
                  {" "}
                  {/* lg:hidden text-center mb-8 */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    {" "}
                    {/* flex items-center justify-center space-x-3 mb-4 */}
                    <Box
                      sx={{
                        width: "2.5rem", // w-10
                        height: "2.5rem", // h-10
                        backgroundImage:
                          "linear-gradient(to right, #3B82F6, #A855F7)", // bg-gradient-to-r from-blue-500 to-purple-600
                        borderRadius: "0.5rem", // rounded-lg
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Award
                        sx={{
                          width: "1.5rem",
                          height: "1.5rem",
                          color: "white",
                        }}
                      />{" "}
                      {/* w-6 h-6 text-white */}
                    </Box>
                    <Typography
                      variant="h2"
                      component="span"
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
                      {" "}
                      {/* text-2xl font-bold text-white */}
                      Exam2Employ
                    </Typography>
                  </Box>
                  <Typography variant="h2" sx={{ color: "white" }}>
                    Create Your Account
                  </Typography>{" "}
                  {/* text-2xl font-bold text-white */}
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", lg: "block" },
                    textAlign: "center",
                    mb: 4,
                  }}
                >
                  {" "}
                  {/* hidden lg:block text-center mb-8 */}
                  <Typography variant="h2" sx={{ color: "white", mb: 1 }}>
                    Sign Up
                  </Typography>{" "}
                  {/* text-3xl font-bold text-white mb-2 */}
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Create your account to get started
                  </Typography>{" "}
                  {/* text-gray-300 */}
                </Box>

                {/* User Type Selection */}
                <Box sx={{ mb: 3 }}>
                  {" "}
                  {/* mb-6 */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr", // grid grid-cols-2
                      gap: "8px", // gap-2
                      p: "4px", // p-1
                      backgroundColor: "rgba(255, 255, 255, 0.05)", // bg-white/5
                      borderRadius: "0.75rem", // rounded-xl
                    }}
                  >
                    <Button
                      variant={
                        formData.userType === "jobseeker"
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() =>
                        setFormData({ ...formData, userType: "jobseeker" })
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1, // space-x-2
                        px: 2, // px-4
                        py: 1.5, // py-3
                        borderRadius: "0.5rem", // rounded-lg
                        fontWeight: 500, // font-medium
                        ...(formData.userType === "jobseeker" && {
                          backgroundImage:
                            "linear-gradient(to right, #3B82F6, #A855F7)", // bg-gradient-to-r from-blue-500 to-purple-600
                          color: "white",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)", // shadow-lg
                        }),
                        ...(!(formData.userType === "jobseeker") && {
                          color: "text.secondary", // text-gray-300
                          borderColor: "transparent",
                          "&:hover": {
                            color: "white",
                            backgroundColor: "rgba(255, 255, 255, 0.05)", // hover:bg-white/5
                            borderColor: "transparent",
                          },
                        }),
                      }}
                    >
                      <Users sx={{ width: "1rem", height: "1rem" }} />{" "}
                      {/* w-4 h-4 */}
                      <span>Job Seeker</span>
                    </Button>
                    <Button
                      variant={
                        formData.userType === "employer"
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() =>
                        setFormData({ ...formData, userType: "employer" })
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1, // space-x-2
                        px: 2, // px-4
                        py: 1.5, // py-3
                        borderRadius: "0.5rem", // rounded-lg
                        fontWeight: 500, // font-medium
                        ...(formData.userType === "employer" && {
                          backgroundImage:
                            "linear-gradient(to right, #3B82F6, #A855F7)", // bg-gradient-to-r from-blue-500 to-purple-600
                          color: "white",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)", // shadow-lg
                        }),
                        ...(!(formData.userType === "employer") && {
                          color: "text.secondary", // text-gray-300
                          borderColor: "transparent",
                          "&:hover": {
                            color: "white",
                            backgroundColor: "rgba(255, 255, 255, 0.05)", // hover:bg-white/5
                            borderColor: "transparent",
                          },
                        }),
                      }}
                    >
                      <Building2 sx={{ width: "1rem", height: "1rem" }} />{" "}
                      {/* w-4 h-4 */}
                      <span>Employer</span>
                    </Button>
                  </Box>
                </Box>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  {" "}
                  {/* space-y-6 */}
                  {/* Name Field */}
                  <Box>
                    <Typography
                      variant="body2"
                      component="label"
                      htmlFor="name"
                      sx={{
                        display: "block",
                        fontWeight: 500,
                        color: "text.secondary",
                        mb: 1,
                      }}
                    >
                      {" "}
                      {/* block text-sm font-medium text-gray-300 mb-2 */}
                      Full Name
                    </Typography>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      error={!!errors.name}
                      helperText={
                        errors.name && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mt: 1,
                              color: "error.main",
                            }}
                          >
                            <AlertCircle
                              sx={{ width: "1rem", height: "1rem" }}
                            />
                            <Typography variant="body2">
                              {errors.name}
                            </Typography>
                          </Box>
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ position: "absolute", left: "16px" }}
                          >
                            <User
                              sx={{
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "text.secondary",
                              }}
                            />{" "}
                            {/* w-5 h-5 text-gray-400 */}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {/* Email Field */}
                  <Box>
                    <Typography
                      variant="body2"
                      component="label"
                      htmlFor="email"
                      sx={{
                        display: "block",
                        fontWeight: 500,
                        color: "text.secondary",
                        mb: 1,
                      }}
                    >
                      Email Address
                    </Typography>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      error={!!errors.email}
                      helperText={
                        errors.email && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mt: 1,
                              color: "error.main",
                            }}
                          >
                            <AlertCircle
                              sx={{ width: "1rem", height: "1rem" }}
                            />
                            <Typography variant="body2">
                              {errors.email}
                            </Typography>
                          </Box>
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ position: "absolute", left: "16px" }}
                          >
                            <Mail
                              sx={{
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "text.secondary",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {/* Password Field */}
                  <Box>
                    <Typography
                      variant="body2"
                      component="label"
                      htmlFor="password"
                      sx={{
                        display: "block",
                        fontWeight: 500,
                        color: "text.secondary",
                        mb: 1,
                      }}
                    >
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      error={!!errors.password}
                      helperText={
                        errors.password && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mt: 1,
                              color: "error.main",
                            }}
                          >
                            <AlertCircle
                              sx={{ width: "1rem", height: "1rem" }}
                            />
                            <Typography variant="body2">
                              {errors.password}
                            </Typography>
                          </Box>
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ position: "absolute", left: "16px" }}
                          >
                            <Lock
                              sx={{
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "text.secondary",
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{
                                color: "text.secondary",
                                "&:hover": { color: "white" },
                              }}
                            >
                              {showPassword ? (
                                <EyeOff
                                  sx={{ width: "1.25rem", height: "1.25rem" }}
                                />
                              ) : (
                                <Eye
                                  sx={{ width: "1.25rem", height: "1.25rem" }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {/* Confirm Password Field */}
                  <Box>
                    <Typography
                      variant="body2"
                      component="label"
                      htmlFor="confirmPassword"
                      sx={{
                        display: "block",
                        fontWeight: 500,
                        color: "text.secondary",
                        mb: 1,
                      }}
                    >
                      Confirm Password
                    </Typography>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      error={!!errors.confirmPassword}
                      helperText={
                        errors.confirmPassword && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mt: 1,
                              color: "error.main",
                            }}
                          >
                            <AlertCircle
                              sx={{ width: "1rem", height: "1rem" }}
                            />
                            <Typography variant="body2">
                              {errors.confirmPassword}
                            </Typography>
                          </Box>
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ position: "absolute", left: "16px" }}
                          >
                            <Lock
                              sx={{
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "text.secondary",
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              edge="end"
                              sx={{
                                color: "text.secondary",
                                "&:hover": { color: "white" },
                              }}
                            >
                              {showConfirmPassword ? (
                                <EyeOff
                                  sx={{ width: "1.25rem", height: "1.25rem" }}
                                />
                              ) : (
                                <Eye
                                  sx={{ width: "1.25rem", height: "1.25rem" }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {/* Additional Fields for Employers */}
                  {formData.userType === "employer" && (
                    <Box>
                      <Typography
                        variant="body2"
                        component="label"
                        htmlFor="companyName"
                        sx={{
                          display: "block",
                          fontWeight: 500,
                          color: "text.secondary",
                          mb: 1,
                        }}
                      >
                        Company Name
                      </Typography>
                      <TextField
                        fullWidth
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={formData.companyName || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your company name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{ position: "absolute", left: "16px" }}
                            >
                              <Briefcase
                                sx={{
                                  width: "1.25rem",
                                  height: "1.25rem",
                                  color: "text.secondary",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  )}
                  {/* Terms and Conditions */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="terms"
                        name="terms"
                        required
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: 20 }, // Adjust icon size
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {" "}
                        {/* text-gray-300 */}I agree to the{" "}
                        <Link
                          href="#"
                          sx={{
                            color: "#60A5FA",
                            "&:hover": { color: "#93C5FD" },
                          }}
                        >
                          {" "}
                          {/* text-blue-400 hover:text-blue-300 */}
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="#"
                          sx={{
                            color: "#60A5FA",
                            "&:hover": { color: "#93C5FD" },
                          }}
                        >
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                    sx={{ alignItems: "flex-start", mt: 1 }} // flex items-start
                  />
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      width: "100%",
                      px: 3, // px-6
                      py: 2, // py-4
                      height: "auto", // Ensure button height adjusts with content
                    }}
                  >
                    {isLoading ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {" "}
                        {/* flex items-center justify-center space-x-2 */}
                        <CircularProgress
                          size={20}
                          color="inherit"
                          sx={{ color: "white" }}
                        />{" "}
                        {/* w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin */}
                        <Typography>Creating Account...</Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {" "}
                        {/* flex items-center justify-center space-x-2 */}
                        <Typography>Create Account</Typography>
                        <ArrowRight
                          sx={{ width: "1.25rem", height: "1.25rem" }}
                        />{" "}
                        {/* w-5 h-5 */}
                      </Box>
                    )}
                  </Button>
                  {/* Divider */}
                  <Box sx={{ position: "relative", my: 2 }}>
                    {" "}
                    {/* relative */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {/* absolute inset-0 flex items-center */}
                      <Box
                        sx={{
                          width: "100%",
                          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                      />{" "}
                      {/* w-full border-t border-white/20 */}
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "0.875rem",
                      }}
                    >
                      {" "}
                      {/* relative flex justify-center text-sm */}
                      <Typography
                        component="span"
                        sx={{
                          px: 1,
                          backgroundColor: "#0F172A",
                          color: "text.secondary",
                        }}
                      >
                        {" "}
                        {/* px-2 bg-slate-900 text-gray-400 */}
                        Or sign up with
                      </Typography>
                    </Box>
                  </Box>
                  {/* Social Sign Up */}
                  <Grid container spacing={2}>
                    {" "}
                    {/* grid grid-cols-2 gap-4 */}
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        sx={{
                          width: "100%",
                          px: 2, // px-4
                          py: 1.5, // py-3
                          borderColor: "rgba(255, 255, 255, 0.2)", // border border-white/20
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.05)", // hover:bg-white/5
                          },
                        }}
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          viewBox="0 0 24 24"
                          style={{
                            width: "1.25rem",
                            height: "1.25rem",
                            marginRight: "0.5rem",
                          }}
                        >
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        sx={{
                          width: "100%",
                          px: 2, // px-4
                          py: 1.5, // py-3
                          borderColor: "rgba(255, 255, 255, 0.2)", // border border-white/20
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.05)", // hover:bg-white/5
                          },
                        }}
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{
                            width: "1.25rem",
                            height: "1.25rem",
                            marginRight: "0.5rem",
                          }}
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Twitter
                      </Button>
                    </Grid>
                  </Grid>
                  {/* Login Link */}
                  <Box sx={{ textAlign: "center" }}>
                    {" "}
                    {/* text-center */}
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      {" "}
                      {/* text-gray-300 */}
                      Already have an account?{" "}
                      <Link
                        href="#"
                        sx={{
                          color: "#60A5FA",
                          "&:hover": { color: "#93C5FD" },
                          fontWeight: 500,
                        }}
                      >
                        {" "}
                        {/* text-blue-400 hover:text-blue-300 font-medium */}
                        Sign in
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Footer Links */}
              <Box
                sx={{
                  mt: 4,
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "text.secondary",
                  "& > div": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                  },
                }}
              >
                {" "}
                {/* mt-8 text-center text-sm text-gray-400 space-y-2 */}
                <Box>
                  <Link href="#" sx={{ "&:hover": { color: "white" } }}>
                    Privacy Policy
                  </Link>
                  <Typography component="span">•</Typography>
                  <Link href="#" sx={{ "&:hover": { color: "white" } }}>
                    Terms of Service
                  </Link>
                  <Typography component="span">•</Typography>
                  <Link href="#" sx={{ "&:hover": { color: "white" } }}>
                    Help
                  </Link>
                </Box>
                <Typography>
                  &copy; 2025 Exam2Employ. All rights reserved.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RegistrationPage;
