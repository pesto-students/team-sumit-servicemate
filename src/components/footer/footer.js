import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2, 0),
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  transform: "translateY(100%)", // Initially, the footer is hidden
  transition: "transform 0.3s ease-in-out",
}));

const Footer = () => {
  const [showFooter, setShowFooter] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      // Check if the mouse is near the bottom of the page
      if (e.clientY >= window.innerHeight - 10) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    // Add the mousemove event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <FooterContainer style={{ transform: showFooter ? "translateY(0)" : "translateY(100%)" }}>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            &copy; {new Date().getFullYear()} ServiceMate. All rights reserved.
          </Typography>
          <Box>
            <IconButton
              component="a"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{ color: "inherit" }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{ color: "inherit" }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
