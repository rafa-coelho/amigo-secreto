import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'prism-themes/themes/prism-dracula.css'
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as gtag from "@/data/gtag";
import Toast, { NotificationType } from '@/components/Toast';

export interface PageProps {
  notify: (msg: string, type?: NotificationType, callback?: () => void) => void;
}

function App ({ Component, pageProps }: AppProps) {

  //#region Notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<{ msg: string, type: NotificationType }>();
  //#endregion

  const notify = (msg: string, type: NotificationType = "success", callback?: () => void) => {
    setNotificationMessage({ msg, type });
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);

      if (callback)
        callback();

    }, 3000);
  };

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
      <Component {...pageProps} notify={notify} />
      {showNotification && (
        <Toast
          message={notificationMessage!.msg}
          type={notificationMessage!.type}
        />
      )}
    </div>
  );
}

export default appWithTranslation(App);
