import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Stack,
  AppBar,
  Toolbar,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import {
  Award,
  ArrowRight,
  Users,
  Briefcase,
  BarChart2,
  FileText,
  Zap,
  CheckCircle,
} from 'lucide-react';

// Define a custom dark theme to match the original design
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6', // Corresponds to blue-500
    },
    secondary: {
      main: '#A855F7', // Corresponds to purple-600
    },
    background: {
      default: '#0F172A', // Corresponds to slate-900
      paper: 'rgba(255, 255, 255, 0.05)', // Corresponds to white/5 for cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D1D5DB', // Corresponds to gray-300
    },
    error: {
      main: '#EF4444', // Corresponds to red-500
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // Set Inter as the default font
    h1: {
      fontSize: '3rem', // text-5xl
      fontWeight: 700, // font-bold
      lineHeight: 1.25, // leading-tight
      '@media (min-width:960px)': {
        // md breakpoint for larger screens
        fontSize: '3.75rem',
      },
    },
    h2: {
      fontSize: '1.5rem', // text-2xl for mobile
      fontWeight: 700,
      '@media (min-width:960px)': {
        // md breakpoint for larger screens
        fontSize: '2rem', // text-3xl
      },
    },
    h3: {
      fontSize: '1.25rem', // text-xl
      fontWeight: 600, // font-semibold
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem', // text-sm
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // rounded-xl
          fontWeight: 600, // font-semibold
          textTransform: 'none', // Prevent uppercase
          transition: 'all 0.3s ease-in-out', // transition-all duration-300
          '&:hover': {
            transform: 'scale(1.05)', // hover:scale-105
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
          },
          '&.Mui-disabled': {
            opacity: 0.5, // disabled:opacity-50
            cursor: 'not-allowed', // disabled:cursor-not-allowed
            transform: 'none', // disabled:transform-none
          },
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(to right, #3B82F6, #A855F7)', // bg-gradient-to-r from-blue-500 to-purple-600
          color: 'white',
          '&:hover': {
            backgroundImage: 'linear-gradient(to right, #2563EB, #9333EA)', // hover:from-blue-600 hover:to-purple-700
            boxShadow: 'none', // Prevent default MUI hover shadow
          },
          '&:focus': {
            boxShadow: '0 0 0 2px #3B82F6, 0 0 0 4px #1F2937', // focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)', // border border-white/20
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)', // hover:bg-white/5
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#60A5FA', // text-blue-400
          '&:hover': {
            color: '#93C5FD', // hover:text-blue-300
          },
          textDecoration: 'none', // Remove underline
        },
      },
    },
  },
});

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <Box
    sx={{
      backgroundColor: 'background.paper', // bg-white/5
      backdropFilter: 'blur(12px)', // backdrop-blur-xl
      borderRadius: '1rem', // rounded-2xl
      border: '1px solid rgba(255, 255, 255, 0.1)', // border border-white/10
      p: 4, // p-8
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)', // shadow-2xl
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      height: '100%', // Ensure cards have equal height
    }}
  >
    <Box
      sx={{
        width: '4rem', // w-16
        height: '4rem', // h-16
        backgroundColor: color,
        borderRadius: '0.75rem', // rounded-xl
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <Icon sx={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
    </Box>
    <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
      {description}
    </Typography>
  </Box>
);

const LandingPage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: -1, // Send to back
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '30rem',
              height: '30rem',
              backgroundColor: 'rgba(59, 130, 246, 0.1)', // bg-blue-500/10
              borderRadius: '50%',
              filter: 'blur(4rem)', // blur-3xl
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '5%',
              right: '10%',
              width: '30rem',
              height: '30rem',
              backgroundColor: 'rgba(168, 85, 247, 0.1)', // bg-purple-500/10
              borderRadius: '50%',
              filter: 'blur(4rem)', // blur-3xl
            }}
          />
        </Box>

        {/* Header/Navigation */}
        <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', py: 2 }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundImage: 'linear-gradient(to right, #3B82F6, #A855F7)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Award sx={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                </Box>
                <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'white' }}>
                  Exam2Employ
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" sx={{ px: 3, py: 1.2 }}>
                  Login
                </Button>
                <Button variant="contained" sx={{ px: 3, py: 1.2 }}>
                  Sign Up
                </Button>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero Section */}
        <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: { xs: 8, md: 12 } }}>
          <Box>
            <Typography variant="h1" sx={{ color: 'white', mb: 3 }}>
              Unlock Your Potential.
              <Typography
                // component="span"
                sx={{
                  backgroundImage: 'linear-gradient(to right, #60A5FA, #C084FC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  ml: 1,
                }}
              >

                Discover Your Next Career.
              </Typography>
            </Typography>
            <Typography variant="h3" sx={{ color: 'text.secondary', mb: 5, fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Exam2Employ connects job seekers with employers through intelligent skill evaluations, personalized reports, and streamlined hiring processes.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                sx={{ py: 1.5, px: 4 }}
                endIcon={<ArrowRight />}
              >
                Get Started as Candidate
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ py: 1.5, px: 4 }}
                endIcon={<Briefcase />}
              >
                Hire Top Talent
              </Button>
            </Stack>
          </Box>
        </Container>

        {/* Feature Highlights Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Typography variant="h2" sx={{ color: 'white', textAlign: 'center', mb: 8 }}>
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
        <Box sx={{ py: 4, mt: 'auto', textAlign: 'center', color: 'text.secondary' }}>
          <Container maxWidth="lg">
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Exam2Employ. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 2 }}>
              <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                About Us
              </Typography>
              <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Contact
              </Typography>
              <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Terms of Service
              </Typography>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
