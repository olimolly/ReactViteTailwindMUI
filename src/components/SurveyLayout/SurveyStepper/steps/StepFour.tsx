import { Box, Typography } from '@mui/material';
import { profiles, getSortedMatches } from '../../../../data/profiles';
import { DEFAULT_PROFILE_INDEX } from '../../../../config/surveyConfig';

interface StepFourProps {
  sliders: number[];
}

export default function StepFour({ sliders }: StepFourProps) {
  const sortedMatches = getSortedMatches(sliders, profiles).filter(
    ({ index }) => index !== DEFAULT_PROFILE_INDEX
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Other Compatible Profiles
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Here's how you match with the other profiles, ranked by compatibility:
      </Typography>

      {sortedMatches.map(({ profile, match }) => (
        <Box key={profile.name} sx={{ mb: 2 }}>
          <Typography>
            <strong>{profile.name}</strong>: {match}%
          </Typography>
        </Box>
      ))}

      <Typography variant="body2" sx={{ mt: 4 }}>
        These results can help you explore alternative fits based on your preferences.
      </Typography>
    </Box>
  );
}
