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
  AppBar,
  Toolbar,
  Container,
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
  BarChart2,
  FileText,
  Zap,
} from "lucide-react";

// Define a custom dark theme to match the original design
// This theme is defined once and used by all components.
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

// LandingPage Component
const LandingPage = ({ onNavigate }) => {
  const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <Box
      sx={{
        backgroundColor: "background.paper", // bg-white/5
        backdropFilter: "blur(12px)", // backdrop-blur-xl
        borderRadius: "1rem", // rounded-2xl
        border: "1px solid rgba(255, 255, 255, 0.1)", // border border-white/10
        p: 4, // p-8
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)", // shadow-2xl
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        height: "100%", // Ensure cards have equal height
      }}
    >
      <Box
        sx={{
          width: "4rem", // w-16
          height: "4rem", // h-16
          backgroundColor: color,
          borderRadius: "0.75rem", // rounded-xl
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Icon sx={{ width: "2.5rem", height: "2.5rem", color: "white" }} />
      </Box>
      <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
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
            zIndex: -1, // Send to back
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "30rem",
              height: "30rem",
              backgroundColor: "rgba(59, 130, 246, 0.1)", // bg-blue-500/10
              borderRadius: "50%",
              filter: "blur(4rem)", // blur-3xl
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "5%",
              right: "10%",
              width: "30rem",
              height: "30rem",
              backgroundColor: "rgba(168, 85, 247, 0.1)", // bg-purple-500/10
              borderRadius: "50%",
              filter: "blur(4rem)", // blur-3xl
            }}
          />
        </Box>

        {/* Header/Navigation */}
        <AppBar
          position="static"
          sx={{ background: "transparent", boxShadow: "none", py: 2 }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundImage:
                      "linear-gradient(to right, #3B82F6, #A855F7)",
                    borderRadius: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Award
                    sx={{ width: "1.5rem", height: "1.5rem", color: "white" }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: 700, color: "white" }}
                >
                  Exam2Employ
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  sx={{ px: 3, py: 1.2 }}
                  onClick={() => onNavigate("login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{ px: 3, py: 1.2 }}
                  onClick={() => onNavigate("register")}
                >
                  Sign Up
                </Button>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero Section */}
        <Container
          maxWidth="md"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: { xs: 8, md: 12 },
          }}
        >
          <Box>
            <Typography variant="h1" sx={{ color: "white", mb: 3 }}>
              Unlock Your Potential.
              <Typography
                component="span"
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #60A5FA, #C084FC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  ml: 1,
                }}
              >
                Discover Your Next Career.
              </Typography>
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: "text.secondary",
                mb: 5,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Exam2Employ connects job seekers with employers through
              intelligent skill evaluations, personalized reports, and
              streamlined hiring processes.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                sx={{ py: 1.5, px: 4 }}
                endIcon={<ArrowRight />}
                onClick={() => onNavigate("register")} // Direct to registration
              >
                Get Started as Candidate
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ py: 1.5, px: 4 }}
                endIcon={<Briefcase />}
                onClick={() => onNavigate("register")} // Direct to registration for employers too, or a specific employer signup
              >
                Hire Top Talent
              </Button>
            </Stack>
          </Box>
        </Container>

        {/* Feature Highlights Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{ color: "white", textAlign: "center", mb: 8 }}
          >
            Why Choose Exam2Employ?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={Zap}
                title="Intelligent Skill Evaluations"
                description="Assess technical and soft skills with adaptive, real-time tests designed by industry experts."
                color="rgba(59, 130, 246, 0.2)" // bg-blue-500/20
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={FileText}
                title="Personalized Performance Reports"
                description="Receive detailed feedback, identify strengths, and pinpoint areas for improvement after each assessment."
                color="rgba(168, 85, 247, 0.2)" // bg-purple-500/20
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={BarChart2}
                title="Data-Driven Hiring Decisions"
                description="Employers gain actionable insights into candidate performance, streamlining recruitment and reducing bias."
                color="rgba(34, 197, 94, 0.2)" // bg-green-500/20
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={Users}
                title="Connect with Top Talent"
                description="Job seekers get matched with relevant opportunities from leading companies based on their validated skills."
                color="rgba(234, 88, 12, 0.2)" // bg-orange-500/20
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={CheckCircle}
                title="Streamlined Hiring Process"
                description="Reduce interview rounds and accelerate time-to-hire with pre-qualified candidates and automated evaluations."
                color="rgba(251, 191, 36, 0.2)" // bg-yellow-500/20
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={Briefcase}
                title="Comprehensive Job Matching"
                description="Our intelligent algorithms connect candidates to jobs that truly fit their skill set and career aspirations."
                color="rgba(236, 72, 153, 0.2)" // bg-pink-500/20
              />
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            py: 4,
            mt: "auto",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Exam2Employ. All rights
              reserved.
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              <Typography
                variant="body2"
                component="a"
                href="#"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="#"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Contact
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="#"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href="#"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Terms of Service
              </Typography>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

// RegistrationPage Component
const RegistrationPage = ({ onNavigate }) => {
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
      alert("Registration Successful! Please log in."); // Use a custom modal in production
      onNavigate("login"); // Navigate to login page after successful registration
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
                    gap: 1, // space-x-3
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
                              sx={{ color: "text.secondary" }}
                            >
                              {showPassword ? <EyeOff /> : <Eye />}
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
                              sx={{ color: "text.secondary" }}
                            >
                              {showConfirmPassword ? <EyeOff /> : <Eye />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {/* Terms & Conditions Checkbox */}
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        I agree to the{" "}
                        <Link href="#" color="primary">
                          Terms and Conditions
                        </Link>
                      </Typography>
                    }
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "text.secondary",
                      },
                    }}
                  />
                  {/* Register Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isLoading}
                    sx={{
                      py: 1.5, // py-3
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1, // space-x-2
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <>
                        Create Account{" "}
                        <ArrowRight
                          sx={{ width: "1.25rem", height: "1.25rem" }}
                        />
                      </>
                    )}
                  </Button>
                  {/* Login Link */}
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
                  >
                    Already have an account?{" "}
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => onNavigate("login")}
                    >
                      Sign In
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

// LoginPage Component
const LoginPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    username: "", // Using username as per your User model
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.username) {
      newErrors.username = "Username or Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      // Replace with your actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // const data = await response.json();

      // Simulate API call success/failure
      const simulatedSuccess =
        formData.username === "testuser" && formData.password === "password123";

      if (simulatedSuccess) {
        console.log("Login successful:", formData);
        // In a real app, you would store the JWT/token and redirect
        // For now, just log success
        alert("Login Successful! Redirecting to dashboard..."); // Use a custom modal in production
        onNavigate("dashboard"); // Navigate to a dashboard page
      } else {
        setErrors({ general: "Invalid username or password." });
        console.error("Login failed");
      }
    } catch (error) {
      setErrors({
        general: "An error occurred during login. Please try again.",
      });
      console.error("Login API call error:", error);
    } finally {
      setIsLoading(false);
    }
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
          {/* max-w-6xl mx-auto */}
          <Grid container spacing={4} alignItems="center">
            {/* grid lg:grid-cols-2 gap-8 items-center */}
            {/* Left Side - Branding & Info */}
            <Grid
              item
              xs={12}
              lg={6}
              sx={{ display: { xs: "none", lg: "block" }, color: "white" }}
            >
              {/* hidden lg:block text-white */}
              <Box sx={{ mb: 8 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1, // space-x-3
                    mb: 6,
                  }}
                >
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
                  Welcome Back to
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
                    Your Future
                  </Typography>
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: "text.secondary", mb: 8, fontSize: "1.25rem" }}
                >
                  {" "}
                  {/* text-xl text-gray-300 mb-8 */}
                  Sign in to access your personalized dashboard, assessments,
                  and job opportunities.
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
                    <Mail
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
                      Secure Login
                    </Typography>{" "}
                    {/* font-semibold */}
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Your data is protected with industry-standard security.
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
                    <Lock
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
                      Access All Features
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Unlock personalized assessments and job matching.
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
                    <ArrowRight
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
                      Seamless Experience
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Continue your journey towards a better career.
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
            {/* Right Side - Login Form */}
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
                    Sign In
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
                    Sign In
                  </Typography>{" "}
                  {/* text-3xl font-bold text-white mb-2 */}
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Welcome back! Please sign in to your account.
                  </Typography>{" "}
                  {/* text-gray-300 */}
                </Box>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  {" "}
                  {/* space-y-6 */}
                  {/* Username/Email Field */}
                  <Box>
                    <Typography
                      variant="body2"
                      component="label"
                      htmlFor="username"
                      sx={{
                        display: "block",
                        fontWeight: 500,
                        color: "text.secondary",
                        mb: 1,
                      }}
                    >
                      {" "}
                      {/* block text-sm font-medium text-gray-300 mb-2 */}
                      Username or Email
                    </Typography>
                    <TextField
                      fullWidth
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username or email"
                      error={!!errors.username}
                      helperText={
                        errors.username && (
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
                              {errors.username}
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
                            />{" "}
                            {/* w-5 h-5 text-gray-400 */}
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
                              sx={{ color: "text.secondary" }}
                            >
                              {showPassword ? <EyeOff /> : <Eye />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {/* General Error Message */}
                  {errors.general && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "error.main",
                        mt: -1, // Adjust margin to fit well
                      }}
                    >
                      <AlertCircle sx={{ width: "1rem", height: "1rem" }} />
                      <Typography variant="body2">{errors.general}</Typography>
                    </Box>
                  )}
                  {/* Forgot Password Link */}
                  <Box sx={{ textAlign: "right", mt: -1 }}>
                    <Link href="#" variant="body2">
                      Forgot Password?
                    </Link>
                  </Box>
                  {/* Login Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isLoading}
                    sx={{
                      py: 1.5, // py-3
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1, // space-x-2
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <>
                        Sign In{" "}
                        <ArrowRight
                          sx={{ width: "1.25rem", height: "1.25rem" }}
                        />
                      </>
                    )}
                  </Button>
                  {/* Sign Up Link */}
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
                  >
                    Don't have an account?{" "}
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => onNavigate("register")}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const App = () => {
  // State to manage the current page view
  // 'landing', 'register', 'login', 'dashboard' (future)
  const [currentPage, setCurrentPage] = useState("landing");

  // Function to navigate between pages
  const handleNavigate = (pageName) => {
    setCurrentPage(pageName);
  };

  // Conditional rendering based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={handleNavigate} />;
      case "register":
        return <RegistrationPage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      // Add more cases for other pages (e.g., 'dashboard', 'profile')
      // case 'dashboard':
      //   return <DashboardPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;
