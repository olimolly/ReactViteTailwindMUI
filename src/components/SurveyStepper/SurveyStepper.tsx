import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StepOne from '../steps/StepOne';
import StepTwo from '../steps/StepTwo';
import StepThree from '../steps/StepThree';
import StepFour from '../steps/StepFour';
import { DEFAULT_PROFILE_INDEX } from '../../config/surveyConfig';

const steps = ['Profile', 'Preferences', 'Default Match', 'Other Matches'];

export default function SurveyStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [profileType, setProfileType] = useState<'individual' | 'group' | null>(null);
    const [sliders, setSliders] = useState<number[]>(Array(6).fill(5));

    const handleNext = () => setActiveStep(prev => prev + 1);
    const handleBack = () => setActiveStep(prev => prev - 1);

    const stepContent = [
        <StepOne profileType={profileType} setProfileType={setProfileType} onNext={handleNext} />,
        <StepTwo sliders={sliders} setSliders={setSliders} onBack={handleBack} onNext={handleNext} />,
        <StepThree
            sliders={sliders}
            defaultProfileIndex={DEFAULT_PROFILE_INDEX}
            onBack={handleBack}
            onNext={handleNext}
        />,
        <StepFour sliders={sliders} />,
    ];

    return (
        <Box
            sx={{
                height: '100dvh',
                width: '100%',
                overflow: 'hidden',
                bgcolor: theme => theme.palette.grey[100],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: '90vw',
                    maxWidth: 900,
                    height: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Contenu animé de l'étape */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            style={{ height: '100%' }}
                        >
                            {stepContent[activeStep]}
                        </motion.div>
                    </AnimatePresence>
                </Box>

                {/* Stepper intégré en bas */}
                <Box
                    sx={{
                        borderTop: '1px solid',
                        borderColor: 'divider',
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
            </Box>
        </Box>
    );
}
