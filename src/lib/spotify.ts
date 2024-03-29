import querystring from 'querystring'
import { AccessTokenResponse, PlaylistInput } from '../types'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const ALBUM_DETAILS_ENDPOINT = `https://api.spotify.com/v1/albums`
const TRACK_DETAILS_ENDPOINT = `https://api.spotify.com/v1/tracks`
const PLAYLIST_DETAILS_ENDPOINT = `https://api.spotify.com/v1/playlists`
const USER_DETAILS_ENDPOINT = `	https://api.spotify.com/v1/users/`

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getAlbumDetails = async (id) => {
  const { access_token } = await getAccessToken()

  const response = await fetch(`${ALBUM_DETAILS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export const getTrackDetails = async (id) => {
  const { access_token } = await getAccessToken()

  const response = await fetch(`${TRACK_DETAILS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export const getPlaylistDetails = async (id) => {
  const { access_token } = await getAccessToken()

  const response = await fetch(`${PLAYLIST_DETAILS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export const getUserDetails = async (id) => {
  const { access_token } = await getAccessToken()

  const response = await fetch(`${USER_DETAILS_ENDPOINT}/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export const getUsersPlaylists = async ({
  refresh_token,
  user_id,
  offset = 0,
  next_url,
}: PlaylistInput) => {
  const { access_token } = await getClientSideAcessToken(refresh_token)
  const url =
    next_url ?? `https://api.spotify.com/v1/users/${user_id}/playlists?limit=50&offset=${offset}`

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

const getClientSideAcessToken = async (refresh_token: string): Promise<AccessTokenResponse> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}
