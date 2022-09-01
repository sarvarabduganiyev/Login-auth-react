import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Input } from "../components/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export default function Login() {
  const [token, setToken] = useAuth();
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [subdomain, setSubdomain] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=sv5kf16fjae5cba5u372ebb1fp");

    const urlencoded = new URLSearchParams();
    urlencoded.append("_username", username);
    urlencoded.append("_password", password);
    urlencoded.append("_subdomain", subdomain);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch("https://toko.ox-sys.com/security/auth_check", requestOptions)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data.token);
            history("/");
            setToken(data.token);
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Alert severity="info" sx={{ my: "15px" }}>
          Username: user_task | Password: user_task | Subdomain: toko
        </Alert>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Input
            type="text"
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <Input
            type="password"
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            id="subdomain"
            label="Subdomain"
            name="subdomain"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            autoComplete="subdomain"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
