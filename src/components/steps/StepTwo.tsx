import { Box, Button, Checkbox, FormControlLabel, Slider, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { preferences } from '../../data/preferences';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepTwoProps {
  sliders: number[];
  setSliders: (values: number[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepTwo({
  sliders,
  setSliders,
  onBack,
  onNext,
}: StepTwoProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [confirmed, setConfirmed] = useState(false);
  const [checkboxTicked, setCheckboxTicked] = useState(false);

  const handleSliderChange = (index: number, value: number) => {
    const updated = [...sliders];
    updated[index] = value;
    setSliders(updated);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        gap: 4,
      }}
    >

      <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
        Ajustez vos préférences
      </Typography>

      <Box>
        <AnimatePresence >
          {!confirmed && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.95, maxHeight: 0 }}
              animate={{ opacity: 1, scaleY: 1, maxHeight: 200 }}
              exit={{ opacity: 0, scaleY: 0.95, maxHeight: 0 }}
              style={{ transformOrigin: 'top', overflow: 'hidden' }}
              transition={{
                opacity: { duration: 0.7, ease: 'circOut' },    // fade fluide
                scaleY: { duration: 0.9, ease: 'circOut' },   // adoucit l’expansion
                maxHeight: { duration: 0.9, ease: 'circOut' } // évite le saut brutal
              }}
            >
              <Box
                sx={{
                  m: 0,
                  p: 0,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'left',
                  cursor: 'pointer',
                  backgroundColor: 'background.paper',
                }}
                onClick={() => {
                  if (!checkboxTicked) {
                    setCheckboxTicked(true);
                    setTimeout(() => setConfirmed(true), 350);
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2">
                    Répondez à chaud pour définir votre style intuitivement. Customisable ultérieurement.
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkboxTicked}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setCheckboxTicked(checked);
                          if (checked) {
                            setTimeout(() => setConfirmed(true), 350);
                          } else {
                            setConfirmed(false);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    }
                    label="Lu"
                  />
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>



        {preferences.map((label, index) => (
          <Box key={label} sx={{ mb: 3 }}>
            <Typography>{label}</Typography>
            <Slider
              value={sliders[index]}
              onChange={(_, value) =>
                handleSliderChange(index, value as number)
              }
              min={0}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
          </Box>
        ))}

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
          Retour
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={onNext}
          disabled={!confirmed}
        >
          Continuer
        </Button>
      </Box>
    </Box>
  );
}
