export const encodeNamePair = (n1: string, n2: string) => {
    const namesJoint = `${n1.replace(/ /g, '+').trim()}-${n2.replace(/ /g, '+').trim()}`;
    return btoa(namesJoint);
};

export const decodeNamePair = (encodedStr: string) => {
    const decodedString = atob(encodedStr);

    if (!/(.*)-(.*)/.test(decodedString)) {
        return null;
    }

    return decodedString.replace(/\+/g, " ").split("-");
};
