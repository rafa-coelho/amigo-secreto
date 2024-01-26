export class IndexedDBManager {
    private dbName: string = "RcSecretSantaDB";
    private dbVersion: number = 1;
    private db: IDBDatabase | null = null;

    private readonly tableName: string = "secretSantas";

    constructor() {
    }

    public async connect (): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                reject(new Error("Erro ao abrir o banco de dados."));
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.tableName)) {
                    db.createObjectStore(this.tableName, { keyPath: "id" });
                }
            };
        });
    }

    public async addEditItem (item: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connect().then(() => {
                if (!this.db) {
                    reject(new Error("Banco de dados não conectado."));
                    return;
                }

                const transaction = this.db.transaction([this.tableName], "readwrite");
                const objectStore = transaction.objectStore(this.tableName);

                const request = objectStore.put(item);

                request.onsuccess = () => {
                    resolve();
                };

                request.onerror = () => {
                    reject(new Error("Erro ao adicionar/editar item no banco de dados."));
                };
            })
        });
    }

    public async getItems (): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connect().then(() => {
                if (!this.db) {
                    reject(new Error("Banco de dados não conectado."));
                    return;
                }

                const transaction = this.db.transaction([this.tableName], "readonly");
                const objectStore = transaction.objectStore(this.tableName);

                const request = objectStore.getAll();

                request.onsuccess = (event) => {
                    const result = (event.target as IDBRequest).result;
                    resolve(result || []);
                };

                request.onerror = () => {
                    reject(new Error("Erro ao obter itens do banco de dados."));
                };
            });
        });
    }

    public async getItemById (id: string): Promise<any | null> {
        return new Promise((resolve, reject) => {
            this.connect().then(() => {
                if (!this.db) {
                    reject(new Error('Banco de dados não conectado.'));
                    return;
                }

                const transaction = this.db.transaction([this.tableName], 'readonly');
                const objectStore = transaction.objectStore(this.tableName);

                const request = objectStore.get(id);

                request.onsuccess = (event) => {
                    const result = (event.target as IDBRequest).result;
                    resolve(result || null);
                };

                request.onerror = () => {
                    reject(new Error('Erro ao obter item do banco de dados.'));
                };
            });
        });
    }

    public async deleteItem (id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connect().then(() => {
                if (!this.db) {
                    reject(new Error('Banco de dados não conectado.'));
                    return;
                }

                const transaction = this.db.transaction([this.tableName], 'readwrite');
                const objectStore = transaction.objectStore(this.tableName);

                const request = objectStore.delete(id);

                request.onsuccess = () => {
                    resolve();
                };

                request.onerror = () => {
                    reject(new Error('Erro ao excluir item do banco de dados.'));
                };
            });
        });
    }


}
