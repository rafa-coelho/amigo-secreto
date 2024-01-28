import Head from "next/head";
import { TagsInput } from "react-tag-input-component";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { decryptNamePair, encryptNamePair } from "@/util/Crypt";
import { IndexedDBManager } from "@/util/IndexedDB";
import { v4 as uuidv4 } from "uuid";
import ShareButton from "@/components/ShareButton";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"] })

type Pair = {
  name: string;
  hash: string;
}

export type SecretSanta = {
  id: string;
  title: string;
  pairs: Pair[];
}

enum PageContent {
  Home,
  Form,
  View
}

export default function Home () {
  const [title, set_title] = useState("");
  const [names, set_names] = useState<string[]>([]);

  const [secretSantaList, set_secretSantaList] = useState<SecretSanta[]>([]);
  const [selectedSecretSanta, set_selectedSecretSanta] = useState<SecretSanta>();
  const [content, set_content] = useState(PageContent.Home);
  const [hostLisk, setHostLisk] = useState('');

  const pairs = (names: string[]): Pair[] => {
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
  };

  const getItems = async () => {
    const dbManager = new IndexedDBManager();
    set_secretSantaList((await dbManager.getItems()) as SecretSanta[]);
  };

  const deleteSecretSanta = async (id: string) => {
    const dbManager = new IndexedDBManager();
    await dbManager.deleteItem(id);
    getItems();

  };

  const handleSave = (e: any) => {
    e.preventDefault();
    save(title, pairs(names));
    set_content(PageContent.Home);
  };

  useEffect(() => {
    if (content == PageContent.Home) {
      getItems();
      set_title("");
      set_names([]);
    }
  }, [content]);

  useEffect(() => {
    setHostLisk(window.location.href);
  }, []);

  const handlekeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.key === "Escape") {
      if (content == PageContent.Form) {
        set_content(PageContent.Home);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Amigo Secreto</title>
        <meta name="description" content="Amigo Secreto" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

        {
          content == PageContent.Home && (
            <>
              <div className={`${styles.container}`}>

                <div className={styles.title}>
                  <h3>Amigo Secreto</h3>
                  <button
                    className={`${styles.button} ${styles.addButton}`}
                    onClick={() => set_content(PageContent.Form)}
                  >
                    Criar novo
                  </button>
                </div>

                {
                  secretSantaList.length > 0 && (
                    <h4>Seus sorteios</h4>
                  )
                }
                <div className={`${styles.homeContainer} ${secretSantaList.length == 0 ? styles.emptySecretSantaList : styles.secretSantaList}`}>
                  {
                    secretSantaList.length == 0
                      ? "Não há nada aqui"
                      : secretSantaList.map(x => (
                        <div key={x.id} className={styles.secretSantaCard}>
                          {x.title}
                          <br />
                          <div className={styles.cardButtonsContainer}>
                            <button
                              className={styles.cardButton}
                              onClick={() => {
                                set_selectedSecretSanta(x);
                                set_content(PageContent.View);
                              }}
                            >
                              Visualizar
                            </button>
                            |
                            <button
                              className={styles.cardButton}
                              onClick={() => {
                                if (confirm("Deseja mesmo excluir?")) {
                                  deleteSecretSanta(x.id);
                                }
                              }}
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      ))
                  }
                </div>
              </div>
            </>
          )
        }

        {
          content == PageContent.Form && (
            <>
              <form onSubmit={handleSave}>
                <div className={`${styles.container}`} onKeyDown={handlekeyDown}>
                  <div className={styles.title}>
                    <h3>Novo Sorteio</h3>

                    <span className={styles.closeButton} onClick={() => set_content(PageContent.Home)}>
                      &times;
                    </span>
                  </div>

                  <div className={`${styles.input_container}`}>
                    <label htmlFor="secretSantaTitle">Nome do sorteio</label>
                    <input id="secretSantaTitle" type="text" value={title} onChange={e => set_title(e.target.value)} placeholder="Titulo do Sorteio" required />
                  </div>

                  <div className={`${styles.input_container}`}>
                    <label >Nomes</label>
                    <TagsInput
                      value={names}
                      onChange={set_names}
                      placeHolder="Adicione os nomes"
                      separators={["Enter", ","]}
                    />
                    <small>
                      <em>Aperte &quot;enter&quot; ou adicione uma vírgurla para novo nome</em>
                    </small>
                  </div>

                  <div className={`${styles.buttonRow}`}>
                    <button disabled={names.length < 2} className={`${styles.button} ${styles.addButton}`} type="submit">
                      Salvar
                    </button>
                  </div>
                </div>
              </form>
            </>
          )
        }

        {
          (content == PageContent.View && selectedSecretSanta)
          && (
            <>
              <div className={`${styles.container}`}>
                <div className={styles.title}>
                  <h3>{selectedSecretSanta.title}</h3>

                  <span className={styles.closeButton} onClick={() => set_content(PageContent.Home)}>
                    &times;
                  </span>
                </div>
                <ul className={styles.namesList}>
                  {
                    selectedSecretSanta.pairs.map((pair, key) => (
                      <li className={styles.pairNameCard} key={key}>
                        {pair.name}
                        <ShareButton
                          title={"Enviar link"}
                          text={`Você foi adicionado ao Amigo Secreto: "${selectedSecretSanta.title}"!\nE aqui está o seu link:\n${hostLisk}/${pair.hash}`}
                          className={`${styles.button} ${styles.addButton}`}
                        />
                      </li>
                    ))
                  }
                </ul>
              </div>
            </>
          )
        }
      </main >
    </>
  )
}
