import React, { useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import Copyright from "../../components/Copyright";
import { setUser, User } from "../../lib/user";

const SIGN_IN = gql`mutation ($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    userId
    username
  }
}`;

const useStyles = makeStyles((theme) => ({
  root: { height: "100vh" },
  image: {
    backgroundImage: "url(https://pic.tjsky.net/?/pixiv/pic/2015/01/05_daily/%E3%81%A9%E3%80%9C%E3%82%89%20-%20%E9%9B%AA%E3%81%AE%E5%BA%AD%E5%9C%92.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: { margin: theme.spacing(3, 0, 2) }
}));

export default function SignInPage(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const usernameInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();

  const [signIn, { loading: signingIn, error: signInError }] = useMutation<{ signIn: User }>(SIGN_IN);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          { signingIn && <Typography>正在登录。</Typography> }
          { signInError && <Typography>{signInError.message}</Typography> }
          <form className={classes.form} noValidate onSubmit={async (e) => {
            e.preventDefault();
            try {
              const result = await signIn({ variables: { username: usernameInput.current.value, password: passwordInput.current.value } });
              setUser(result.data.signIn);
              router.push("/");
            } catch {}
          }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              inputRef={usernameInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordInput}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box marginTop={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
