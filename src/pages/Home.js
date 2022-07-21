import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
function Home() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "end",
          p: "10px",
        }}
      >
        <Button
          component={Link}
          to="/login"
          startIcon={<LoginIcon />}
          variant="contained"
          color="primary"
        >
          LogIn
        </Button>
      </Box>
    </>
  );
}

export default Home;
