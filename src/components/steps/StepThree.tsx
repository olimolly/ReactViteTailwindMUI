import { Box, Button, Typography } from '@mui/material';
import { profiles, calculatePerSliderMatch, calculateOverallMatch } from '../../data/profiles';
import CircleProgressWithLabel from '../CircleProgress/CircleProgressWithLabel';
import { preferences } from '../../data/preferences';

interface StepThreeProps {
    sliders: number[];
    defaultProfileIndex: number;
    onBack: () => void;
    onNext: () => void;
}

export default function StepThree({
    sliders,
    defaultProfileIndex,
    onBack,
    onNext,
}: StepThreeProps) {
    const defaultProfile = profiles[defaultProfileIndex];
    const matchPerSlider = calculatePerSliderMatch(sliders, defaultProfile.values);
    const overallMatch = calculateOverallMatch(sliders, defaultProfile.values);

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
                    {overallMatch}% Compatibility with <strong>{defaultProfile.name}</strong>
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        gap: 3,
                        mt: 2,
                    }}
                >
                    {preferences.map((label: string, index: number) => (
                        <CircleProgressWithLabel
                            key={label}
                            label={label}
                            value={matchPerSlider[index]}
                        />
                    ))}
                </Box>

                <Typography variant="body2" sx={{ mt: 4 }}>
                    If you think it's similar enough to your expectations, complete the joining process with few informations.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Button variant="outlined" fullWidth onClick={onBack}>
                    Back
                </Button>
                <Button variant="contained" fullWidth onClick={onNext}>
                    Continue
                </Button>
            </Box>
        </Box>
    );
}
