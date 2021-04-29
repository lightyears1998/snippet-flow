import {
  Button,
  createStyles, makeStyles, Paper, Container, Grid, TextField, Box, Snackbar
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {
  getConfig, saveConfig, ConfigKey
} from "../lib/config";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      justifyContent: "center"
    },
    paper: { padding: theme.spacing(4) },
    button: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    formControl: { margin: theme.spacing(1) }
  })
);

export default function SettingsPage(): JSX.Element {
  const classes = useStyles({});

  const router = useRouter();

  const [serverUrl, setServerUrl] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setServerUrl(url);
  };

  const updateServerUrl = () => {
    saveConfig(ConfigKey.SERVER_URL, serverUrl);
    setSnackBarOpen(true);
  };

  useEffect(() => {
    const savedUrl = getConfig(ConfigKey.SERVER_URL) as string;
    if (savedUrl) {
      setServerUrl(savedUrl);
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={snackBarOpen} onClose={() => {
        setSnackBarOpen(false);
        router.back();
      }} message="服务器地址已更新"></Snackbar>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={4}>
          <Paper className={classes.paper} >
            <form>
              <TextField id="server-input" label="服务器地址" variant="outlined" fullWidth value={serverUrl} onChange={onTextFieldChange} />
            </form>
            <Box marginTop={2}>
              <Button variant="contained" onClick={updateServerUrl}>更新</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

    </Container>
  );
}
