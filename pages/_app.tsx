import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';


function MyApp({ Component, pageProps }: AppProps, {stars}:any) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps =async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default MyApp
