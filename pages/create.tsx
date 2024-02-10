import BackIcon from '@/components/icons/BackIcon';
import { Pair } from '@/data/DataTypes';
import { IndexedDBManager } from '@/util/IndexedDB';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { encryptNamePair } from '@/util/Crypt';
import Toast, { NotificationType, ToastProps } from '@/components/Toast';
import { useRouter } from 'next/router';
import Head from 'next/head';
import * as gtag from "@/data/gtag";

interface NameInputData {
    id: number;
    value: string;
}

const CreatePage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [title, setTitle] = useState<string>('');
    const [names, setNames] = useState<NameInputData[]>([{ id: 0, value: '' }]);
    const [nextId, setNextId] = useState<number>(1);

    //#region Notification
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState<{ msg: string, type: NotificationType }>();
    //#endregion

    const addNewNameInput = () => {
        const novoCampo: NameInputData
            = { id: nextId, value: '' };
        setNames([...names, novoCampo]);
        setNextId(nextId + 1);
    };

    const removeNameInput = (id: number) => {
        setNames(names.filter(nome => nome.id !== id));
    };

    const updateNameInput = (id: number, value: string) => {
        setNames(names.map(name => name.id === id ? { ...name, value } : name));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (names.length <= 2) {
            return notify(t("create.minimumOfThree"), "danger");
        }

        save(title, sortPairs(names.map(x => x.value)));
    };

    const sortPairs = (names: string[]): Pair[] => {
        const _pairs: Pair[] = [];
        const _names = [...names];

        _names.sort(() => Math.random() - 0.5);

        for (let i = 0; i < _names.length; i++) {
            const name = _names[i].trim();
            const pair = _names[(i != _names.length - 1) ? i + 1 : 0].trim();
            const hash = encryptNamePair(name, pair);

            _pairs.push({
                name,
                hash
            });
        }

        return _pairs;
    };

    const save = async (title: string, pairs: Pair[] = []) => {
        const dbManager = new IndexedDBManager();
        await dbManager.addEditItem({ id: uuidv4(), title, pairs });
        notify(t("create.submitSuccess"), "success", () => {
            router.push("/");
        });
    };

    const notify = (msg: string, type: NotificationType = "success", callback?: () => void) => {
        setNotificationMessage({ msg, type });
        setShowNotification(true);
        
        gtag.event({
            action: gtag.GAEvents.CreateSecretSanta,
            category: '',
            label: 'Secret Santa Created',
            value: ''
        });

        setTimeout(() => {
            setShowNotification(false);

            if (callback)
                callback();

        }, 3000);
    }

    const pageTitle = `${t("create.pageTitle")} | ${t("siteName")}`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <div className="w-[90vw] md:w-full dark:bg-gray-800 min-h-screen flex justify-center items-center">
                <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
                    <div className="w-full flex items-center gap-4 mb-4">
                        <Link className="inline-block  text-white rounded hover:bg-blue-600" href="/">
                            <BackIcon />
                        </Link>
                        <h2 className="text-xl font-semibold text-white">
                            {t("create.title")}
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-400">
                                {t("create.titleLabel")}
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                                placeholder={t("create.titlePlaceholder")}
                            />
                        </div>
                        <div className="h-48 overflow-y-auto p-2">
                            {names.map((input, index) => (
                                <div key={input.id} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        value={input.value}
                                        onChange={(e) => updateNameInput(input.id, e.target.value)}
                                        className="mt-1 flex-grow px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder={`${t('nameLabel')} ${index + 1}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNameInput(input.id)}
                                        className={`px-2 py-1 rounded text-white ${names.length > 1 ? 'bg-red-500 hover:bg-red-600' : 'bg-red-400 cursor-not-allowed'}`}
                                        disabled={names.length <= 1}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addNewNameInput}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            {t("create.addMore")}
                        </button>
                        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                            {t("create.submitButton")}
                        </button>
                    </form>
                </div>
            </div>
            {showNotification && (
                <Toast
                    message={notificationMessage!.msg}
                    type={notificationMessage!.type}
                />
            )}
        </>
    );
};

export default CreatePage;


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
