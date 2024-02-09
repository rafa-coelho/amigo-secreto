import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BackIcon from '@/components/icons/BackIcon';
import { IndexedDBManager } from '@/util/IndexedDB';
import { SecretSanta } from '@/data/DataTypes';
import ShareButton from '@/components/ShareButton';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const ViewSecretSantaPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { id } = router.query;

    const [data, setData] = useState<SecretSanta>();
    const [hostLisk, setHostLisk] = useState('');

    const getItem = async () => {
        if (id == null || id == undefined)
            return;

        const dbManager = new IndexedDBManager();
        var data = (await dbManager.getItemById<SecretSanta>(id as string));
        if (data == null) {
            return;
        }

        setData(data);
    };

    useEffect(() => {
        setHostLisk(window.location.origin);
        getItem();
        // eslint-disable-next-line
    }, [id]);

    const title = `${t("view.pageTitle", { title: data?.title })} | ${t("siteName")}`;

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="w-[90vw] md:w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-md">
                <div className="w-full flex items-center gap-4 mb-4">
                    <Link className="inline-block  text-white rounded hover:bg-blue-600" href="/">
                        <BackIcon />
                    </Link>
                    <h2 className="text-xl font-semibold text-white">{t('view.title')}</h2>
                </div>
                <p className="text-white mb-4">
                    <small>
                        {t('view.instruction')}
                    </small>
                </p>
                <div className="space-y-4">
                    {
                        data
                            ? (
                                data.pairs.map((pair) => (
                                    <div key={pair.hash} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                                        <span className="text-white">{pair.name}</span>
                                        <ShareButton
                                            title={t('view.sendLink')}
                                            text={t('view.youWereAdded', { title: data.title, hostLink: hostLisk!, hash: pair.hash })}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        />
                                    </div>
                                ))
                            )
                            : t("loading")
                    }
                </div>
            </div>
        </>
    );
};

export default ViewSecretSantaPage;

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
