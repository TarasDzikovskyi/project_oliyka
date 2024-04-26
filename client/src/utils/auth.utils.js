
export function getTokenFromLocalStorage() {
    const data = localStorage.getItem('access_token');
    return data ? JSON.parse(data) : ''
}

export function setTokenToLocalStorage(key, token) {
    localStorage.setItem(key, JSON.stringify(token))
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key)
}

