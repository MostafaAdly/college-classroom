// ================================================================= [ Libraries ]
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Suspense } from 'react'

// ================================================================= [ Assets ]
import './Authentication/css/styles.css'
import './HomePage/css/style.css'
import './HomePage/css/classes.css'
import './HomePage/css/header.css'
import './HomePage/css/loader.css'
import './HomePage/css/sidebar.css'


// ================================================================= [ Main Application ]
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Classroom</title>
      </Head>
      <Suspense fallback={<p>Loading....</p>}>

        <Component {...pageProps} />
      </Suspense>
    </div>
  );
}