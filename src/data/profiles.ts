export interface Profile {
    name: string;
    values: number[];
}

export const profiles: Profile[] = [
    {
        name: 'Solo Operative',
        values: [9, 3, 7, 8, 4, 9],
    },
    {
        name: 'Creative Collaborator',
        values: [4, 9, 8, 3, 9, 5],
    },
    {
        name: 'Balanced Strategist',
        values: [6, 6, 6, 6, 6, 6],
    },
];



export function calculateMatch(userValues: number[], preset: number[]): number {
    const total = userValues.length;
    let matchSum = 0;

    for (let i = 0; i < total; i++) {
        const diff = Math.abs(userValues[i] - preset[i]);
        const match = 1 - diff / 10; // normalisé entre 0 et 1
        matchSum += match;
    }

    return Math.round((matchSum / total) * 100); // renvoie un %
}

export function calculatePerSliderMatch(userValues: number[], preset: number[]): number[] {
    return userValues.map((value, index) => {
        const diff = Math.abs(value - preset[index]);
        return Math.round((1 - diff / 10) * 100);
    });
}

export function calculateOverallMatch(userValues: number[], preset: number[]): number {
    const total = userValues.length;
    const matchSum = userValues.reduce((sum, value, i) => {
        return sum + (1 - Math.abs(value - preset[i]) / 10);
    }, 0);
    return Math.round((matchSum / total) * 100);
}

export function getBestMatchingProfile(userValues: number[], profiles: Profile[]): {
    bestProfile: Profile;
    matchPercentages: number[];
} {
    const matchPercentages = profiles.map(profile =>
        calculateOverallMatch(userValues, profile.values)
    );
    const bestIndex = matchPercentages.indexOf(Math.max(...matchPercentages));
    return {
        bestProfile: profiles[bestIndex],
        matchPercentages,
    };
}
