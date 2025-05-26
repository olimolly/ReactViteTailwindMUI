import { Box, Grid, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { profiles, calculatePerSliderMatch, calculateOverallMatch } from '../../data/profiles';
import CircleProgressWithLabel from '../CircleProgress/CircleProgressWithLabel';
import { preferences } from '../../data/preferences';
import { useState } from 'react';

interface StepThreeProps {
    sliders: number[];
    defaultProfileIndex: number;
    onBack: () => void;
    onNext: () => void;
    profileType: 'individual' | 'group' | null;
}

export default function StepThree({
    sliders, defaultProfileIndex, onBack, onNext, profileType }: StepThreeProps) {
    const defaultProfile = profiles[defaultProfileIndex];
    const matchPerSlider = calculatePerSliderMatch(sliders, defaultProfile.values);
    const overallMatch = calculateOverallMatch(sliders, defaultProfile.values);

    const [dataConsent, setDataConsent] = useState(false);
    const [rulesConsent, setRulesConsent] = useState(false);

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
                <Typography variant="h6" sx={{ m: 2 }}>
                    Compare your approach with our own.
                </Typography>
                <Typography variant="body2" sx={{ m: 2 }}>

                </Typography>
                <Typography variant="body2" gutterBottom sx={{ m: 2 }}>
                    If {overallMatch}% meets your expectations with us at <strong>{defaultProfile.name}</strong>, complete the process with minimal information and join now !
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        gap: 3,
                        mt: 2,
                    }}
                >
                    {preferences.map((label: string, index: number) => (
                        <CircleProgressWithLabel
                            key={label}
                            label={label}
                            value={matchPerSlider[index]}
                        />
                    ))}
                </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 4 }}>
                Informations d’inscription
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Nom / Pseudo" fullWidth required />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        label="Date de naissance"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Adresse email" type="email" fullWidth required />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Mot de passe" type="password" fullWidth required />
                </Grid>
                {profileType === 'group' && (
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField label="Nom du groupe" fullWidth required />
                    </Grid>
                )}
                <Grid size='grow'>
                    <TextField label="Régularité estimée" fullWidth />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField label="Expérience théorique" multiline minRows={3} fullWidth />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <TextField label="Expérience pratique" multiline minRows={3} fullWidth />
                </Grid>
                <Grid size={{ xs: 12 }} textAlign={'left'}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Recevoir les prochaines infos pertinentes par newsletter (mensuel)"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={dataConsent}
                                onChange={(e) => setDataConsent(e.target.checked)}
                                required
                            />
                        }
                        label={
                            <span>
                                J’autorise ce site à traiter mes données dans le cadre de cette inscription selon la{' '}
                                <a
                                    href="/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'underline' }}
                                >
                                    politique de confidentialité
                                </a>{' '}#RGPD.
                            </span>
                        }
                    />

                </Grid>
                <Grid size={{ xs: 12 }} textAlign={'left'}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rulesConsent}
                                onChange={(e) => setRulesConsent(e.target.checked)}
                                required
                            />
                        }
                        label={
                            <span>
                                J’ai lu et j'approuve les {' '}
                                <a
                                    href="/rules"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'underline' }}
                                >
                                    les règles du GESE
                                </a>
                            </span>
                        }
                    />
                </Grid>
            </Grid>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Button variant="outlined" fullWidth onClick={onNext}>
                    Check other results
                </Button>
                <Button variant="outlined" fullWidth href="#" target="_blank" rel="noopener noreferrer">
                    Contact us on Discord
                </Button>
                <Button variant="contained" fullWidth onClick={onNext} disabled={!(dataConsent && rulesConsent)}>
                    Validate
                </Button>
            </Box>
        </Box>
    );
}
