import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import StepOne from '../steps/StepOne';
import StepTwo from '../steps/StepTwo';
import StepThree from '../steps/StepThree';
import StepFour from '../steps/StepFour';

const steps = ['Profile', 'Preferences', 'Results', 'Share'];

export default function SurveyStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [profileType, setProfileType] = useState<'individual' | 'group' | null>(null);
    const [sliders, setSliders] = useState<number[]>(Array(6).fill(5));

    const handleNext = () => setActiveStep(prev => prev + 1);
    const handleBack = () => setActiveStep(prev => prev - 1);

    const stepContent = [
        <StepOne
            profileType={profileType}
            setProfileType={setProfileType}
            onNext={handleNext}
        />,
        <StepTwo
            sliders={sliders}
            setSliders={setSliders}
            onBack={handleBack}
            onNext={handleNext}
        />,
        <StepThree
            sliders={sliders}
            onBack={handleBack}
            onNext={handleNext}
        />,
        <StepFour />
    ];

    return (
        <Box
            sx={{
                minHeight: '100dvh',
                width: '100%',
                maxWidth: '100%',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Stepper fixé en haut */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    bgcolor: 'background.default',
                }}
            >
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Contenu scrollable si besoin */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                }}
            >
                {stepContent[activeStep]}
            </Box>
        </Box>


    );
}
