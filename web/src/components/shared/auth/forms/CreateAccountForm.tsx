'use client'

import { AuthWrapper } from "../AuthWrapper";

export function CreateAccountForm() {
    return <AuthWrapper heading="Регистрация в Nokurami" backButtonLabel="Есть учетная запись? Войти" backButtonHref="/account/login">Create Account Form</AuthWrapper>
}

