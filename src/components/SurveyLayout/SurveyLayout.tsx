import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import SurveyStepper from './SurveyStepper/SurveyStepper';
import CircleProgressWithLabel from './CircleProgress/CircleProgressWithLabel';
import { Box } from '@mui/material';
import { preferences } from '../../data/preferences';
import CircleColumn from './CircleColumn';
import { useProgressContext } from '../context/ProgressContext';

export default function SurveyLayout() {

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: {
                    xs: "column", // mobile : vertical
                    md: "row", // desktop : horizontal
                },
                justifyContent: "center",
                // backgroundColor: "custom.blueSpy",
                // background: `linear-gradient(180deg,
                //     rgba(0, 35, 102, 1) 0%,
                //     rgba(4, 20, 50, 1) 100%
                //     )`,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Colonne gauche */}
            <CircleColumn labels={preferences.slice(0, 3)} baseDelayIndex={0} />


            <Box
                position="relative"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    flex: { xs: "3 1 auto", md: "12 1 0", lg: "6 1 0", xl: "3 1 0" },
                    minWidth: { md: 0 },
                    zIndex: 2,
                    textAlign: "center",
                    minHeight: {
                        xs: "50vh",
                        md: "100vh",
                    },
                    borderRadius: "24px",
                    // background: `linear-gradient(45deg,
                    // rgba(0, 35, 102, 0.9) 0%,
                    // rgba(0, 35, 102, 0.25) 75%,
                    // rgba(4, 20, 50, 0.9) 100%
                    // )`,
                    // backgroundColor: `${theme.palette.custom.blueMarineDark}`,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
                    overflowX: 'visible',
                    overflowY: 'visible',
                }}>

                <SurveyStepper />

            </Box>

            {/* Colonne droite */}
            <CircleColumn labels={preferences.slice(3, 6)} offset={3} baseDelayIndex={675} />

        </Box>
    );
}
