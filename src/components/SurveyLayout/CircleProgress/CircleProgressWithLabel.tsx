import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface CircleProgressWithLabelProps {
    value: number;
    label: string;
}

export default function CircleProgressWithLabel({ value, label }: CircleProgressWithLabelProps) {
    const [displayedValue, setDisplayedValue] = useState(value);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const startValue = displayedValue;
        const delta = value - startValue;
        const duration = 800; // durée en ms pour la transition
        const startTime = performance.now();

        const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            setDisplayedValue(startValue + delta * progress);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [value]);

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate" value={displayedValue} size={80} thickness={4} />
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
                        {`${Math.round(displayedValue)}%`}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>{label}</Typography>
        </Box>
    );
}
