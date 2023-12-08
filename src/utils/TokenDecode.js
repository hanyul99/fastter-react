function getDecodedPayload() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid token');
    }

    const payload = parts[1];
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload;
}

export default getDecodedPayload;