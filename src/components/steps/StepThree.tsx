import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { profiles, calculatePerSliderMatch, getBestMatchingProfile } from '../../data/profiles';
import { preferences } from '../../data/preferences';
import CircleProgressWithLabel from '../CircleProgress/CircleProgressWithLabel';

interface StepThreeProps {
    sliders: number[];
    onBack: () => void;
    onNext: () => void;
}



export default function StepThree({ sliders, onBack, onNext }: StepThreeProps) {
    const matchPerSlider = calculatePerSliderMatch(sliders, profiles[0].values);

    const { bestProfile, matchPercentages } = getBestMatchingProfile(sliders, profiles);

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 4 },
                height: '100%',
                width: '100%',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 4,
            }}
        >

            <Box>
                <Typography variant="h5" gutterBottom>
                    Your Results
                </Typography>

                {/* {preferences.map((label, index) => (
                    <Box key={label} sx={{ mb: 3 }}>
                        <Typography>{label}</Typography>
                        <LinearProgress variant="determinate" value={matchPerSlider[index]} />
                        <Typography variant="caption">Match: {matchPerSlider[index]}%</Typography>
                    </Box>
                ))} */}

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
                        gap: 3,
                        mt: 2,
                    }}
                >
                    {preferences.map((label, index) => (
                        <CircleProgressWithLabel
                            key={label}
                            label={label}
                            value={matchPerSlider[index]}
                        />
                    ))}
                </Box>


                <Typography variant="h6" sx={{ mt: 4 }}>
                    🏆 Best Match: <strong>{bestProfile.name}</strong> ({matchPercentages[profiles.indexOf(bestProfile)]}%)
                </Typography>

                <Box sx={{ mt: 2 }}>
                    {profiles.map((profile, i) => (
                        <Typography key={profile.name}>
                            {profile.name}: {matchPercentages[i]}%
                        </Typography>
                    ))}
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Button variant="outlined" fullWidth={true} onClick={onBack}>
                    Back
                </Button>
                <Button variant="contained" fullWidth={true} onClick={onNext}>
                    Continue
                </Button>
            </Box>
        </Box>
    );
}