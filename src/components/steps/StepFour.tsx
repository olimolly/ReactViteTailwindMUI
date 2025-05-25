import { Box, Typography, Link } from '@mui/material';

export default function StepFour() {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', px: 4 }}>
      <Typography variant="h4" gutterBottom>Thank you!</Typography>
      <Typography variant="body1" gutterBottom>
        Here's your custom profile link:
      </Typography>
      <Link href="https://yourdomain.com/share/abc123" target="_blank">
        https://yourdomain.com/share/abc123
      </Link>
      <Typography variant="caption" sx={{ mt: 2 }}>
        You can share this link with your team or friends.
      </Typography>
    </Box>
  );
}
