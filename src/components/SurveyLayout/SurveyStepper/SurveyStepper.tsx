
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import { DEFAULT_PROFILE_INDEX } from '../../../config/surveyConfig';

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
            profileType={profileType}
        />,
        <StepFour sliders={sliders} />,
    ];

    return (
        <Box
            sx={{
                minHeight: '100dvh',
                width: '100%',
                bgcolor: theme => theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 900,
                    bgcolor: 'background.paper',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    border: '1px solid',
                    borderBottom: 'none',
                    borderColor: 'divider',
                    boxShadow: '0px -40px 40px rgba(0, 0, 0, 0.1)', //blur par affecté par overflow
                    display: 'flex',
                    flex: '0 0 88vh',
                    flexDirection: 'column',
                    position: 'relative',
                    overflowY: 'visible',
                }}
            >
                {/* Contenu animé de l'étape */}
                <Box sx={{ flexGrow: 1 }}
                >
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
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: '0 0 12vh',
                    bgcolor: 'background.paper',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    width: '100vw',
                }}
            >
                <Stepper activeStep={activeStep} alternativeLabel sx={{ minWidth: '50%' }}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Box>
    );
}