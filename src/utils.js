import { adjectives, nouns } from "./words";

export const generateSecret = () => {
    const adjIndex = Math.floor(adjectives.length * Math.random());
    const nounIndex = Math.floor(nouns.length * Math.random());
    return `${adjectives[adjIndex]} ${nouns[nounIndex]}`
};
