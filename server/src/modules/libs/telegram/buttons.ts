import { Markup } from 'telegraf'

export const BUTTONS = {
    authSuccess: Markup.inlineKeyboard([
        [
            Markup.button.callback('📜 Мои подписки', 'myFollowings'),
            Markup.button.callback('👤 Просмотреть профиль', 'me')
        ],
        [Markup.button.url('🌐 На сайт', 'https://4f30-37-151-36-118.ngrok-free.app')]
    ]),
    profile: Markup.inlineKeyboard([
        Markup.button.url(
            '⚙️ Настройки аккаунта',
            'https://4f30-37-151-36-118.ngrok-free.app/dashboard/settings'
        )
    ])
}
