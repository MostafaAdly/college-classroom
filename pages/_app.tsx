// ================================================================= [ Libraries ]
import type { AppProps } from 'next/app'
import Head from 'next/head'

// ================================================================= [ Assets ]
import './Authentication/css/styles.css'
import './HomePage/css/styles.css'
// import './Authentication/images/classroom.png'


// ================================================================= [ Main Application ]
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Classroom</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}