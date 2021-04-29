import { Box, Typography } from "@material-ui/core";

export default function ResetPasswordPage(): JSX.Element {
  return (
    <Box paddingTop={4} textAlign="center">
      <Typography>
        <p>If you have any problem with your account, please <a href="mailto:admin@example.com">contact</a> our admin team.</p>
        <p>We are happy to help. : )</p>
      </Typography>
    </Box>
  );
}
