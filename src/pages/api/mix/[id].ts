import { NextApiRequest, NextApiResponse } from 'next'
import { pipeline } from 'stream'
import { promisify } from 'util'

const MP3_CDN_URL = process.env.MP3_CDN_URL
const pipelineAsync = promisify(pipeline)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const url = `${MP3_CDN_URL}/${id}`
  console.log('url:', url)

  try {
    const audioResponse = await fetch(url)
    const length = audioResponse.headers.get('content-length')
    console.log('content length', audioResponse.headers.get('content-length'))

    if (!audioResponse.ok) {
      throw new Error('Failed to fetch audio file')
    }

    // Set the appropriate headers for the response
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Length', length)
    res.setHeader('Accept-Ranges', 'bytes')
    // audioStream.pipe(res)
    await pipelineAsync(audioResponse.body, res)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
