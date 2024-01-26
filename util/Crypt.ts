export const encryptNamePair = (n1: string, n2: string) => {
    const namesJoint = `${n1.replace(/ /g, '+').trim()}-${n2.replace(/ /g, '+').trim()}`;
    return btoa(unescape(encodeURIComponent(namesJoint)));
};

export const decryptNamePair = (encodedStr: string) => {
    const decodedString = decodeURIComponent(escape(atob(encodedStr)));

    if (!/(.*)-(.*)/.test(decodedString)) {
        return null;
    }

    return decodedString.replace(/\+/g, " ").split("-");
};
