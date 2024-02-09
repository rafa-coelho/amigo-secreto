import Link from 'next/link';
import { SecretSanta } from '@/data/DataTypes';
import { useEffect, useState } from 'react';
import { IndexedDBManager } from '@/util/IndexedDB';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function Home () {
  const { t } = useTranslation();
  const [secretSantaList, setSecretSantaList] = useState<SecretSanta[]>([]);

  const getItems = async () => {
    const dbManager = new IndexedDBManager();
    setSecretSantaList((await dbManager.getItems()) as SecretSanta[]);
  };

  const deleteSecretSanta = async (id: string) => {
    if (confirm(t("home.deleteSecretSantaConfirmation"))) {
      const dbManager = new IndexedDBManager();
      await dbManager.deleteItem(id);
      getItems();
    }

  };
  
  const title = `${t("home.pageTitle")} | ${t("siteName")}`;

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="w-[90vw] md:w-full max-w-4xl h-[60vh] md:h-[80vh] bg-gray-900 rounded-lg shadow flex flex-col p-6">
        <div className="flex w-full justify-between items-center mb-4">
          <h1 className="text-white text-3xl font-bold flex-shrink-0">
            {t("home.title")}
          </h1>
          <Link className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" href="/create">
            {t("createButton")}
          </Link>
        </div>

        <div className="flex-grow overflow-y-auto my-4">
          {
            secretSantaList.length === 0 ? (
              <div className="flex justify-center items-center h-full dark:bg-gray-800 rounded">
                <div className="text-center ">
                  <p className="text-white text-xl mb-4">
                    {t("home.emptyList")}
                  </p>
                  <Link className="text-blue-500 hover:text-blue-400 text-lg font-semibold" href="/create">
                    {t("home.createFirst")}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {
                  secretSantaList.map((secretSanta: any) => (
                    <div key={secretSanta.id} className="bg-gray-700 p-4 rounded-lg">

                      <h2 className="text-xl text-white mb-4">
                        {secretSanta.title}
                      </h2>

                      <div className="flex justify-between">
                        <Link
                          className="bg-blue-500 hover:bg-blue-400 py-1 px-2 text-white cursor-pointer rounded"
                          href={`/view/${secretSanta.id}`}
                        >
                          {t("home.viewSecretSanta")}
                        </Link>
                        <Link
                          className="bg-red-500 hover:bg-red-400 py-1 px-2 text-white cursor-pointer rounded"
                          href={`#`}
                          onClick={() => deleteSecretSanta(secretSanta.id)}
                        >
                          {t("home.deleteSecretSanta")}
                        </Link>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const defaultLocale = locale || 'pt-BR';
  const acceptLanguage = req.headers['accept-language'];
  let userLocale = defaultLocale;

  if (acceptLanguage) {
    const requestedLocales = acceptLanguage.split(',').map(lang => lang.split(';')[0]);
    userLocale = requestedLocales[0];
  }

  return {
    props: {
      ...(await serverSideTranslations(userLocale, ['common'])),
    },
  };
};
