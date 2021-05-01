import {
  Grid, Button, Container, TextField, makeStyles, createStyles
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    row: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  })
);

export const PostEditorPage = () => {
  const classes = useStyles({});

  return (<>
    <Container>
      <h2>Post Editor</h2>
      <form noValidate autoComplete="off">
        <TextField id="post-title" label="Post Title" variant="outlined" fullWidth />
      </form>
      <Grid className={classes.row} container justify="center" spacing={2}>
        <Grid item xs={3}><Button fullWidth variant="outlined">引用 Post</Button></Grid>
        <Grid item xs={3}><Button fullWidth variant="outlined">添加 Snippet</Button></Grid>
      </Grid>
    </Container>
  </>
  );
};

export default PostEditorPage;
