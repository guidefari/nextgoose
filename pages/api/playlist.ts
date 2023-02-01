import { GenericAndMaybeLegacyError, PlaylistApiResponse, TrackAPIResponse } from '@/lib/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { getPlaylistDetails } from '../../lib/spotify'
const { parse } = require('spotify-uri')

// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  req: NextApiRequest,
  res: NextApiResponse<PlaylistApiResponse | GenericAndMaybeLegacyError>
) => {
  const { query } = req
  let id

  try {
    const isLink = !!new URL(query?.id as string)
    const item = parse(query?.id)
    id = item.id
  } catch (error) {
    id = query?.id
  }

  const response = await getPlaylistDetails(id)
  if (response.status > 400) {
    return res.status(200).json({ error: 'Playlist Not Found' })
  }

  const playlistUrl = response.external_urls.spotify
  const coverImageUrl = response.images[0].url
  const title = response.name
  const description = response.description
  const ownerName = response.owner.display_name
  const tracks: TrackAPIResponse[] = response.tracks.items.map(
    (item): TrackAPIResponse => ({
      albumType: item.track.album.album_type,
      albumImageUrl: item.track.album.images[0].url,
      artists: item.track.artists.map((_artist) => _artist.name).join(', '),
      previewUrl: item.track.preview_url,
      title: item.track.name,
      trackUrl: item.track.external_urls.spotify,
    })
  )

  return res.status(200).json({ playlistUrl, coverImageUrl, title, description, ownerName, tracks })
}

function randomNumberWithinRange(myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin + 1) + myMin)
}
