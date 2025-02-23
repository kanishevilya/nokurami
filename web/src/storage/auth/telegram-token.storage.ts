import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import CryptoJS from "crypto-js";

interface TelegramTokenState {
    telegramToken: string | null;
    setTelegramToken: (token: string | null) => void;
    clearTelegramToken: () => void;
}

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export const useTelegramTokenStore = create(
    persist<TelegramTokenState>(
        (set) => ({
            telegramToken: null,
            setTelegramToken: (token) => {
                if (token) {
                    if (SECRET_KEY === undefined) {
                        console.error("SECRET_KEY is not defined");
                        return;
                    }
                    const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
                    set({ telegramToken: encryptedToken });
                } else {
                    set({ telegramToken: null });
                }
            },
            clearTelegramToken: () => set({ telegramToken: null }),
        }),
        {
            name: "telegram-token",
            storage: createJSONStorage(() => localStorage),
        }
    )
);


export const getDecryptedToken = (encryptedToken: string | null): string | null => {
    if (!encryptedToken) return null;
    try {
        if (SECRET_KEY === undefined) {
            console.error("SECRET_KEY is not defined");
            return null;
        }
        const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Error decrypting token:", error);
        return null;
    }
};