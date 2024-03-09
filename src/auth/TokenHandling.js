import toast from "svelte-french-toast";

export const saveToken = (accessToken) => {
    const tokenData = {
        token: accessToken,
        timestamp: Date.now(),
    };

    // Save the token data to localStorage or another preferred storage method
    localStorage.setItem('accessToken', JSON.stringify(tokenData));
    console.log('Token saved:', accessToken);
};

export const getToken = ()  => {
    const tokenDataString = localStorage.getItem('accessToken');
    if (!tokenDataString) {
        return null;
    }

    const tokenData = JSON.parse(tokenDataString);

    // Check if the token is older than 5 minutes (300,000 milliseconds)
    const isTokenExpired = Date.now() - tokenData.timestamp > 900000;

    if (isTokenExpired) {
        deleteToken();
        return null;
    }

    return tokenData.token;
};

export const deleteToken = () => {
    localStorage.removeItem('accessToken');
    console.log('Token deleted');
    toast("Your session has expired")
    window.location.href = '/login';
};

// Automatically delete token after 5 minutes on token update
export const saveTokenWithAutoDelete = (accessToken) => {
    saveToken(accessToken);

    // Schedule the token deletion after 15 minutes
    setTimeout(deleteToken, 900000);
};