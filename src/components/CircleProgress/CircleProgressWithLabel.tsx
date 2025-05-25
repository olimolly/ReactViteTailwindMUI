import { Box, CircularProgress, Typography } from '@mui/material';

interface CircleProgressWithLabelProps {
    value: number;
    label: string;
}

export default function CircleProgressWithLabel({ value, label }: CircleProgressWithLabelProps) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate" value={value} size={80} thickness={4} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${value}%`}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>{label}</Typography>
        </Box>
    );
}
