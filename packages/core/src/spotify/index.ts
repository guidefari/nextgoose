import { Resource } from "sst";
import { SpotifyApi as SpotifyApiClient } from "@spotify/web-api-ts-sdk";
import { SpotifyProxyTypes } from "./spotify.types";

export { SpotifyProxyTypes };
export namespace SpotifyHttp {
	const client = SpotifyApiClient.withClientCredentials(
		Resource.SpotifyClientId.value,
		Resource.SpotifyClientSecret.value,
	);

	export const getTrack = async (
		id: string,
	): Promise<SpotifyProxyTypes.Track> => {
		const data = await client.tracks.get(id);

		const sanitizedData: SpotifyProxyTypes.Track = {
			albumType: data.album?.album_type,
			albumImageUrl: data.album?.images[0]?.url,
			title: data.name,
			artists: data.artists.map((artist) => artist.name).join(", "),
			trackUrl: data.external_urls.spotify,
			previewUrl: data.preview_url ?? undefined,
		};
		return SpotifyProxyTypes.TrackSchema.parse(sanitizedData);
	};

	export const getAlbum = async (
		id: string,
	): Promise<SpotifyProxyTypes.Album> => {
		const data = await client.albums.get(id);

		const sanitizedData: SpotifyProxyTypes.Album = {
			albumType: data.album_type,
			albumImageUrl: data.images[0]?.url,
			title: data.name,
			artists: data.artists.map((artist) => artist.name).join(", "),
			tracks: data.tracks.items.map((track) => ({
				title: track.name,
				artists: track.artists.map((artist) => artist.name).join(", "),
				previewUrl: track.preview_url ?? undefined,
				trackUrl: track.external_urls.spotify,
			})),
			albumUrl: data.external_urls.spotify,
		};

		return SpotifyProxyTypes.AlbumSchema.parse(sanitizedData);
	};

	export const getPlaylist = async (
		id: string,
	): Promise<SpotifyProxyTypes.Playlist> => {
		const data = await client.playlists.getPlaylist(id);

		const sanitizedData: SpotifyProxyTypes.Playlist = {
			coverImageUrl: data.images[0]?.url,
			title: data.name,
			description: data.description,
			tracks: data.tracks.items.map(({ track }) => ({
				title: track.name,
				artists: track.artists.map((artist) => artist.name).join(", "),
				previewUrl: track.preview_url ?? undefined,
				trackUrl: track.external_urls.spotify,
			})),
			ownerName: data.owner.display_name,
			playlistUrl: data.external_urls.spotify,
		};

		return SpotifyProxyTypes.PlaylistSchema.parse(sanitizedData);
	};
}
