// Profile Image Storage Service using IndexedDB
const DB_NAME = 'PortfolioImage';
const STORE_NAME = 'profileImage';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
    });
};

export const imageService = {
    uploadImage: async (file: File): Promise<void> => {
        const db = await openDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.put({
                file,
                uploadDate: new Date().toISOString(),
                fileName: file.name,
                fileSize: file.size
            }, 'current');

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    getImage: async (): Promise<{ file: File; uploadDate: string; fileName: string } | null> => {
        const db = await openDB();
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.get('current');

            request.onsuccess = () => {
                const result = request.result;
                resolve(result || null);
            };
            request.onerror = () => reject(request.error);
        });
    },

    deleteImage: async (): Promise<void> => {
        const db = await openDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.delete('current');
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    hasImage: async (): Promise<boolean> => {
        const image = await imageService.getImage();
        return image !== null;
    }
};
