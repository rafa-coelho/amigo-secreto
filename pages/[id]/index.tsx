import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { decryptNamePair } from "@/util/Crypt";
import { useRouter } from "next/router";

type Selected = {
    name1: string;
    name2: string;
}

const inter = Inter({ subsets: ["latin"] });

const View = () => {


    const [secretSanta, set_secretSanta] = useState<Selected>();

    const getSecretSanta = () => {
        console.log(router.query)
        const hash = router.query.id!.toString();
        const [name1, name2] = decryptNamePair(hash)!;

        set_secretSanta({ name1, name2 });
    };
    const router = useRouter();

    useEffect(() => {
        if (router.isReady)
            getSecretSanta();
    }, [router.isReady]);

    if (!secretSanta)
        return "Loading..."

    return (
        <>
            <Head>
                <title>Amigo Secreto</title>
                <meta name="description" content="Amigo Secreto" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <div className={`${styles.container}`}>
                    <h3 style={{ textAlign: "center" }}>{secretSanta.name1}, você tiroooooou:</h3>
                    <div className={`${styles.homeContainer} ${styles.emptySecretSantaList}`}>
                        <h2>
                            <b>{secretSanta.name2}</b>
                        </h2>
                    </div>
                </div>
            </main >
        </>
    );
};

export default View;
