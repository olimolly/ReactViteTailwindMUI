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

export function getBestMatchingProfile(
    userValues: number[],
    profiles: Profile[]
): {
    bestProfile: Profile;
    bestIndex: number;
    matchPercentages: number[];
} {
    if (profiles.length === 0) {
        throw new Error('No profiles provided');
    }

    const matchPercentages = profiles.map(profile =>
        calculateOverallMatch(userValues, profile.values)
    );

    const bestIndex = matchPercentages.indexOf(Math.max(...matchPercentages));

    if (bestIndex === -1) {
        throw new Error('Unable to determine best matching profile');
    }

    return {
        bestProfile: profiles[bestIndex],
        bestIndex,
        matchPercentages,
    };
}

export function getSortedMatches(
    userValues: number[],
    profiles: Profile[]
): { profile: Profile; index: number; match: number }[] {
    return profiles
        .map((profile, index) => ({
            profile,
            index,
            match: calculateOverallMatch(userValues, profile.values),
        }))
        .sort((a, b) => b.match - a.match);
}
