import { Box, Button, Typography } from '@mui/material';
import { useColorMode } from '../../ThemeContext';

interface StepOneProps {
    profileType: 'individual' | 'group' | null;
    setProfileType: (type: 'individual' | 'group') => void;
    onNext: () => void;
}

export default function StepOne({ profileType, setProfileType, onNext }: StepOneProps) {
    const { toggleColorMode } = useColorMode();

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
                px: 2,
                textAlign: 'center'
            }}
        >
            <Typography variant="h4">Welcome to the Survey</Typography>
            <Typography>Select your profile type:</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant={profileType === 'individual' ? 'contained' : 'outlined'}
                    onClick={() => setProfileType('individual')}
                >
                    Individual
                </Button>
                <Button
                    variant={profileType === 'group' ? 'contained' : 'outlined'}
                    onClick={() => setProfileType('group')}
                >
                    Group
                </Button>
            </Box>
            <Button
                variant="contained"
                onClick={onNext}
                disabled={!profileType}
                sx={{ mt: 4 }}
            >
                Continue
            </Button>

            {/* Toggle theme button */}
            <Button onClick={toggleColorMode} sx={{ position: 'absolute', top: 16, right: 16 }}>
                Toggle Theme
            </Button>
        </Box>
    );
}
