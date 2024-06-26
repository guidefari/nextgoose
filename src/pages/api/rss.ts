import siteMetadata from '@/src/siteMetadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { allMixes } from '@/contentlayer/generated'
import fetch from 'node-fetch';
import { DEFAULT_IMAGE_URL } from '@/src/constants';
import * as Sentry from '@sentry/nextjs'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const mixesRSSified = await Promise.all(allMixes.map(async (mix) => {
      const url = `https://${req.headers.host}${mix.url}`;
      const { headers } = await fetch(mix.mp3Url)
      const contentLength = headers.get('content-length')

      return `<item>
          <title>${mix.title}</title>
          <link>${url}</link>
          <guid>${mix.mp3Url}</guid>
          <enclosure url="${mix.mp3Url}" type="audio/mpeg" length="${contentLength}"/>
          <pubDate>${new Date(mix.date).toUTCString()}</pubDate>
          ${mix.description ?
          `<description>${encodeXML(mix.description)}. Get the tracklist and more a immersive experience over at ${url}</description>` : ''
        }
          <itunes:image href="${mix.thumbnailUrl ?? DEFAULT_IMAGE_URL}"/>
          <itunes:subtitle>${mix.title}</itunes:subtitle>
          <itunes:summary>${encodeXML(mix.description)}</itunes:summary>
          ${mix.genres ? `<itunes:keywords>${mix.genres.join(', ')}</itunes:keywords>` : ''}
          <itunes:author>Guide Fari</itunes:author>
          <dc:creator>Guide Fari</dc:creator>
          <itunes:explicit>no</itunes:explicit>
          </item>`
    }))
      ;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
        <channel>
        <title>${siteMetadata.title}</title>
        <description>${siteMetadata.description}</description>
        <link>${siteMetadata.siteUrl}</link>
        <lastBuildDate>${new Date(allMixes[0].date).toUTCString()}</lastBuildDate>
        <image>
        <url>${DEFAULT_IMAGE_URL}</url>
        <title>goosebumps.fm</title>
        <link>${DEFAULT_IMAGE_URL}</link>
        <width>400</width>
        <height>400</height>
        </image>
      <itunes:image href="${DEFAULT_IMAGE_URL}"/>
      <itunes:category text="Music"/>
      <language>en-gb</language>
      <itunes:explicit>false</itunes:explicit>
        ${mixesRSSified.join('')}
      </channel>
      </rss>`;

    // set response content header to xml
    res.setHeader('Content-Type', 'text/xml');

    return res.status(200).send(sitemap);
  } catch (e: unknown) {
    Sentry.captureException(e)
    if (!(e instanceof Error)) {
      throw e;
    }

    return res.status(500).json({ error: e.message || '' });
  }
};

const encodeXML = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')