import { useEffect } from 'react'

import {
	useClearSessionMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'

import { useAuth } from './useAuth'
import { toast } from 'sonner'

export function useCurrent() {
	const { isAuthenticated, unauthenticate } = useAuth()

	const { data, loading, refetch, error } = useFindProfileQuery({
		skip: !isAuthenticated
	})
	const [clear] = useClearSessionMutation()

	useEffect(() => {
		if (error) {
			toast.error("Произошла ошибка при загрузке профиля " + error.message)
			if (isAuthenticated) {
				clear()
			}
			unauthenticate()
		}
	}, [isAuthenticated, unauthenticate, clear])

	return {
		user: data?.getProfile,
		isLoadingProfile: loading,
		refetch
	}
}
