"use client";

import AcessDeniedUi from '@/components/AcessDeniedUi';
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react';
import React from 'react'

const ProfilePage = () => {

    const { data: session } = useSession()

    return (
        session?.user ? <Profile image={session?.user.image || ""} name={"My"} desc='Welcome to your personalized profile page' /> : <AcessDeniedUi />
    )
}

export default ProfilePage