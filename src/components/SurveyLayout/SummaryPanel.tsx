// components/SummaryPanel.tsx
import { Box, Typography } from '@mui/material';
import { useProgressContext } from '../context/ProgressContext';
import { preferences } from '../../data/preferences';

export default function SummaryPanel() {
    const { matchPerSlider, overallMatch } = useProgressContext();

    return (
        <Box sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6" gutterBottom>Résumé du profil</Typography>
            <Typography variant="body1">Compatibilité globale : {overallMatch}%</Typography>

            {preferences.map((label, index) => (
                <Typography key={label} variant="body2">
                    {label} : {matchPerSlider[index] ?? 0}%
                </Typography>
            ))}
        </Box>
    );
}
