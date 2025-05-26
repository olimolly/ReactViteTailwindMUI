import { Box, Button, Checkbox, FormControlLabel, Slider, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { preferences } from '../../data/preferences';
import { useState } from 'react';

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
        justifyContent: 'space-between',
        gap: 4,
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          Ajustez vos préférences
        </Typography>

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

        <Box
          sx={{
            mt: 4,
            p: 2,
            // bgcolor: 'warning.light',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            textAlign: 'left',
            cursor: 'pointer', // ✅ indique que la zone est interactive
          }}
          onClick={() => setConfirmed(prev => !prev)} // ✅ rend tout le bloc cliquable
        >
          <Typography variant="body2">
            Répondez sans trop réfléchir pour définir votre style intuitivement. Modifiable ultérieurement si nécessaire. 
          </Typography>

          <Box textAlign="right" sx={{ mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  onClick={(e) => e.stopPropagation()} // ⛔ empêche le double toggle quand on clique juste sur la checkbox
                />
              }
              label="J’ai compris"
            />
          </Box>
        </Box>
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
