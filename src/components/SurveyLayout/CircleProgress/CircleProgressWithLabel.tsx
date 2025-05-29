import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface CircleProgressWithLabelProps {
    value: number;          // valeur cible (0–100)
    label: string;          // libellé en dessous du cercle
    delay?: number;         // délai avant le démarrage de l’animation (ms)
}

export default function CircleProgressWithLabel({
    value,
    label,
    delay = 0,
}: CircleProgressWithLabelProps) {
    const [displayedValue, setDisplayedValue] = useState(0);
    const rafRef = useRef<number | null>(null);
    const startValueRef = useRef(0); // mémorise la dernière valeur utilisée comme point de départ

    useEffect(() => {
        let rafId: number;
        const duration = 800;
        const startValue = 0; // toujours 0 au démarrage
        const delta = value - startValue;

        const animate = (startTime: number) => {
            const loop = (time: number) => {
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                setDisplayedValue(startValue + delta * easedProgress);

                if (progress < 1) {
                    rafId = requestAnimationFrame(loop);
                }
            };

            rafId = requestAnimationFrame(loop);
        };

        const timeoutId = setTimeout(() => {
            requestAnimationFrame(animate);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(rafId);
        };
    }, [value, delay]);


    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate" value={displayedValue} size={80} thickness={4} />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
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
