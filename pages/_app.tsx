// ================================================================= [ Libraries ]
import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Suspense } from 'react'

// ================================================================= [ Assets ]
import '../pages_assets/Authentication/css/styles.css'
import '../pages_assets/HomePage/css/style.css'
import '../pages_assets/HomePage/css/classes.css'
import '../pages_assets/HomePage/css/header.css'
import '../pages_assets/HomePage/css/loader.css'
import '../pages_assets/HomePage/css/sidebar.css'


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