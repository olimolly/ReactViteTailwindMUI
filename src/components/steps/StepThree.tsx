import { Box, Button, Typography } from '@mui/material';
import { profiles, calculatePerSliderMatch } from '../../data/profiles';
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
                    Compatibility with <strong>{defaultProfile.name}</strong>
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
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
                    Looking for more options? We'll show how you match with other profiles next.
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
