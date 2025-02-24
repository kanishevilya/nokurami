import { useEffect, useState } from 'react'

import {
	useClearSessionMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'

import { useAuth } from './useAuth'

export function useCurrent() {
	const { isAuthenticated, unauthenticate } = useAuth()

	const { data, loading, refetch, error } = useFindProfileQuery({
		skip: !isAuthenticated
	})
	const [clear] = useClearSessionMutation()


	useEffect(() => {
		if (error) {
			console.log(error)
			clear()
			unauthenticate()
		}
	}, [isAuthenticated, unauthenticate, clear])


	return {
		user: data?.getProfile,
		isLoadingProfile: loading,
		refetch
	}
}
