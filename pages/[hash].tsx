import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { decodeNamePair } from '@/util/Crypt';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

type Selected = {
    name1: string;
    name2: string;
}

const ViewPair = () => {
    const router = useRouter();
    const [pair, setPair] = useState<Selected>();
    const { t } = useTranslation();

    const title = `${t("viewMyPair.pageTitle")} | ${t("siteName")}`;

    useEffect(() => {
        if (router.isReady) {
            const hash = router.query.hash!.toString();
            const [name1, name2] = decodeNamePair(hash)!;

            setPair({ name1, name2 });
        }

    }, [router.isReady, router.query]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="w-[90vw] md:w-auto dark:bg-gray-800 min-h-screen flex justify-center items-center">
                <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        {t("viewMyPair.title")}
                    </h2>
                    {
                        pair ? (
                            <div className="p-4 mt-4 bg-blue-500 rounded-lg shadow-lg">
                                <p className="text-white text-lg">
                                    {t("viewMyPair.youDrawed", { name: pair.name1 })}
                                </p>
                                <p className="text-white text-2xl font-bold">{pair.name2}</p>
                            </div>
                        ) : (
                            <p className="text-white text-lg">{t("loading")}</p>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ViewPair;


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
