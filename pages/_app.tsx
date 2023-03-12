import '@/css/main.css'
import { AudioProvider } from 'contexts/AudioPlayer'

import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="shortcut icon" href="/favicons/goose.png" type="image/x-icon" />
      </Head>
      <AudioProvider>
        <Component {...pageProps} />
      </AudioProvider>
    </>
  )
}
