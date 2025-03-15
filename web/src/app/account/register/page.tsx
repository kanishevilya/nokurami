import { Metadata } from "next"
import { CreateAccountForm } from "@/components/shared/auth/forms/CreateAccountForm"
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
    title: 'Create Account',
    description: 'Create a new account',
}










export default function CreateAccountPage() {
    return <CreateAccountForm />
}

