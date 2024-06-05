const baseUrl = 'https://api.spotify.com/v1';

function getStoredAccessToken() {
    const accessToken = localStorage.getItem('spotifyAccessToken');
    const expiryTime = localStorage.getItem('spotifyTokenExpiry');
    
    if (Date.now() > expiryTime) {
        return null;
    }
    return accessToken;
}

function extractAccessTokenFromUrl() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (accessToken) {
        const expiryTime = Date.now() + expiresIn * 1000;
        localStorage.setItem('spotifyAccessToken', accessToken);
        localStorage.setItem('spotifyTokenExpiry', expiryTime);
        window.history.pushState({}, document.title, "/");
        return accessToken;
    } else {
        console.error('Access token not found in URL.');
    }
}

function getAccessToken() {
    const client_id = '79b07d66bf1244f69a064ba25cb4abbf';
    const redirect_uri = 'http://localhost:3000/';
    const scope = 'user-read-private playlist-modify-private playlist-modify-public';
    const state = generateRandomString(16);

    localStorage.setItem('state', state);

    let url = 'https://accounts.spotify.com/authorize?response_type=token';
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
    const discoverMusicEndpoint = '/search';
    const requestParams = `?q=${param}&type=track&access_token=${token}`;
    const urlToFetch = baseUrl + discoverMusicEndpoint + requestParams;

    try {
        const response = await fetch(urlToFetch);
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
