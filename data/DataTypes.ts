export type SecretSanta = {
    id: string;
    title: string;
    pairs: Pair[];
}

export type Pair = {
    name: string;
    hash: string;
}
