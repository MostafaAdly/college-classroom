import type { AppProps } from 'next/app'
import './Authentication/css/style.css'
import './Authentication/images/classroom.png'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}