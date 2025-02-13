'use server'

import { cookies } from "next/headers"
import { COOKIE_NAME, defaultLanguage, Language } from "./config"

export async function getCurrentLanguage() {
    const cookiesStore = await cookies()

    const language = cookiesStore.get(COOKIE_NAME)?.value ?? defaultLanguage

    return language
}

export async function setLanguage(language: Language) {
    const cookiesStore = await cookies()

    return cookiesStore.set(COOKIE_NAME, language)
}