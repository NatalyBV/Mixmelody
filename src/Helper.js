const baseUrl = 'https://spotify.com';

const redirect_uri = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/' 
    : 'https://github.io';

function getStoredAccessToken() {
    const accessToken = localStorage.getItem('spotifyAccessToken');
    const expiryTime = localStorage.getItem('spotifyTokenExpiry');
    
    if (Date.now() > expiryTime) {
        return null;
    }
    return accessToken;
}

async function extractAccessTokenFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        const payload = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: '79b07d66bf1244f69a064ba25cb4abbf',
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri
            })
        };

        try {
            const response = await fetch('https://spotify.com', payload);
            if (!response.ok) throw new Error('Failed to fetch token');
            const data = await response.json();
            const expiryTime = Date.now() + data.expires_in * 1000;
            localStorage.setItem('spotifyAccessToken', data.access_token);
            localStorage.setItem('spotifyTokenExpiry', expiryTime);
            window.history.pushState({}, document.title, window.location.pathname);
            return data.access_token;
        } catch (error) {
            console.error('Error exchanging code:', error);
        }
    }
    return getStoredAccessToken();
}

function getAccessToken() {
    const client_id = '79b07d66bf1244f69a064ba25cb4abbf';
    const scope = 'user-read-private playlist-modify-private playlist-modify-public';
    const state = generateRandomString(16);

    localStorage.setItem('state', state);

    let url = 'https://spotify.com';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
}

function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = new Uint8Array(length);
    window.crypto.getRandomValues(values);
    return Array.from(values)
        .map((x) => possible[x % possible.length])
        .join('');
}

async function getUserId(token) {
    try {
        const response = await fetch(`${baseUrl}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            throw new Error('Failed to get data');
        }
        return (await response.json()).id;
    } catch (error) {
        console.error('Error getting data:', error);
    }
}

async function searchForSongs(token, param) {
    const urlToFetch = `https://spotify.com/search?q=${encodeURIComponent(param)}&type=track`;

    try {
        const response = await fetch(urlToFetch, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        const tracks = data.tracks.items;
        const filteredTracks = tracks.filter(track =>
            track.name.toLowerCase().includes(param.toLowerCase())
        );
        return filteredTracks;
    } catch (error) {
        console.error('Error performing search:', error);
        return [];
    }
}

async function createPlaylist(playlistName, token, userId) {
    try {
        const response = await fetch(`${baseUrl}/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "name": playlistName,
                "public": false
            })
        })
        if (!response.ok) {
            throw new Error('Failed to create playlist data');
        }
        return (await response.json()).id
    } catch (error) {
        console.error('Error creating playlist:', error);
    }
}

async function savePlaylist(token, userId, playlistId, uris) {
    try {
        const response = await fetch(`${baseUrl}/users/${userId}/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "uris": uris,
                "position": 0
            })
        })
        if (!response.ok) {
            throw new Error('Failed to submit playlist data');
        }
        return (await response.json()).id
    } catch (error) {
        console.error('Error saving a playlist:', error);
    }
}

export { getAccessToken, searchForSongs, getStoredAccessToken, extractAccessTokenFromUrl, getUserId, savePlaylist, createPlaylist };
