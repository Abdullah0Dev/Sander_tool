const axios = require('axios');

class InstagramAPI {
    constructor(params) {
        this._appId = process.env.INSTAGRAM_APP_ID;
        this._appSecret = process.env.INSTAGRAM_APP_SECRET;
        this._redirectUrl = process.env.INSTAGRAM_APP_REDIRECT_URI;
        this._getCode = params.getCode;
        this._accessToken = params.accessToken || '';
        this._userId = params.userId || '';
        this._apiBaseUrl = 'https://api.instagram.com/';
        this._graphBaseUrl = 'https://graph.instagram.com/';
        this.hasUserAccessToken = !!this._accessToken;

        if (this._getCode && !this._accessToken) {
            this._setUserAccessToken();
        }
    }

    // Get the authorization URL
    getAuthorizationUrl() {
        const params = new URLSearchParams({
            client_id: this._appId,
            redirect_uri: this._redirectUrl,
            scope: 'user_profile,user_media',
            response_type: 'code'
        });
        return `${this._apiBaseUrl}oauth/authorize?${params.toString()}`;
    }

    // Set user access token from authorization code
    async _setUserAccessToken() {
        const params = {
            client_id: this._appId,
            client_secret: this._appSecret,
            grant_type: 'authorization_code',
            redirect_uri: this._redirectUrl,
            code: this._getCode
        };
        const response = await axios.post(`${this._apiBaseUrl}oauth/access_token`, params);
        this._accessToken = response.data.access_token;
        this.hasUserAccessToken = true;
    }

    // Get the user info
    async getUser() {
        const params = {
            fields: 'id,username,media_count,account_type',
            access_token: this._accessToken
        };
        const response = await axios.get(`${this._graphBaseUrl}me`, { params });
        return response.data;
    }

    // Get media details
    async getMedia(mediaId) {
        const params = {
            access_token: this._accessToken,
            fields: 'id,caption,media_type,media_url,permalink,username,timestamp'
        };
        const response = await axios.get(`${this._graphBaseUrl}${mediaId}`, { params });
        return response.data;
    }

    // Get children of a media item
    async getMediaChildren(mediaId) {
        const params = {
            access_token: this._accessToken,
            fields: 'id,media_type,media_url'
        };
        const response = await axios.get(`${this._graphBaseUrl}${mediaId}/children`, { params });
        return response.data;
    }
}

module.exports = InstagramAPI;
