export const COOKIE_NAME = 'language'
export const languages = ['ru', 'en'] as const
export const defaultLanguage: Language = 'ru'

export type Language = (typeof languages)[number]