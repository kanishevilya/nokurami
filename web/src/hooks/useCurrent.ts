import { useEffect, useState } from 'react'

import {
	useClearSessionMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'

import { useAuth } from './useAuth'
import { redirect } from 'next/navigation'

export function useCurrent() {
	const { isAuthenticated, unauthenticate } = useAuth()

	const { data, loading, refetch, error } = useFindProfileQuery({
		skip: !isAuthenticated
	})
	const [clear] = useClearSessionMutation()

	const [user, setUser] = useState(
		data?.getProfile
	);

	useEffect(() => {
		if (data?.getProfile) {
			setUser(data.getProfile);
		} else if (!loading && !data && isAuthenticated) {
			setUser(undefined);
		}
	}, [data, loading, isAuthenticated]);

	useEffect(() => {
		if (error) {
			console.log(error)
			clear()
			unauthenticate()
			return redirect("/account/login");
		}
	}, [isAuthenticated, unauthenticate, clear])



	const updateUserAvatar = (newAvatar: string | null) => {
		setUser((prev) => (prev ? { ...prev, avatar: newAvatar } : prev));
	};

	return {
		user: user,
		isLoadingProfile: loading,
		refetch,
		updateUserAvatar
	}
}
