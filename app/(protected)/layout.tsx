"use client"

import AcessDeniedUi from '@/components/AcessDeniedUi'
import { useSession } from 'next-auth/react'
import React from 'react'

const ProtectRouteLayout = ({ children }: { children: React.ReactNode }) => {

    const { data: session } = useSession()

    return (
        session?.user ? children : <AcessDeniedUi />
    )
}

export default ProtectRouteLayout