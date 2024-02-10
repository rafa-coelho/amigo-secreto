import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'prism-themes/themes/prism-dracula.css'
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from "@/data/gtag";


function App ({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <div className="dark:bg-gray-800 min-h-screen flex justify-center items-center pt-10">
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App);
