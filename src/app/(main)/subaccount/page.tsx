import Unauthorized from '@/components/unauthorized';
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    searchParams: { state: string; code: string }
}

const SubAccountMainPage = async ({ searchParams }: Props) => {
    const agencyId = await verifyAndAcceptInvitation()

    if (!agencyId) return

    const user = await getAuthUserDetails()
    if (!user) return
    const getFirstSubAccountWithAccess = user.Permissions.find(permission => permission.access === true)

    if (searchParams.state) {
        const statePath = searchParams.state.split('___')[0]
        const stateSubaccountId = searchParams.state.split('___')[1]
        if (!stateSubaccountId) <Unauthorized />
        return redirect(
            `/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`
        )
    }

    if (getFirstSubAccountWithAccess) {
        return redirect(
            `/subaccount/${getFirstSubAccountWithAccess.subAccountId}`
        )
    }


    return <Unauthorized />
}

export default SubAccountMainPage