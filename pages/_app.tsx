import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'prism-themes/themes/prism-dracula.css'
import { appWithTranslation } from 'next-i18next';


function App ({ Component, pageProps }: AppProps) {
  return (
    <div className="dark:bg-gray-800 min-h-screen flex justify-center items-center pt-10">
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App);
