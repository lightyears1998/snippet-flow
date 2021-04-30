import {
  Grid, Button, Container, TextField
} from "@material-ui/core";
import React from "react";

export const PostEditorPage = () => {
  return (<>
    <Container>
      <h2>Post Editor</h2>
      <form noValidate autoComplete="off">
        <TextField id="post-title" label="Post Title" variant="outlined" fullWidth />
      </form>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={3}><Button fullWidth variant="outlined">引用 Post</Button></Grid>
        <Grid item xs={3}><Button fullWidth variant="outlined">添加 Snippet</Button></Grid>
      </Grid>
    </Container>
  </>
  );
};

export default PostEditorPage;
