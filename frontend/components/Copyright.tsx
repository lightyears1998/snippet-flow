import { Typography } from "@material-ui/core";
import React from "react";

import Link from "./Link";

export default function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://snippet.qfstudio.net/">
        Snippet Flow
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
