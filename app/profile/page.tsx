"use client";

import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import React from 'react'

const ProfilePage = () => {

    const { data: session } = useSession()

    return (
        <Profile name={session?.user.name || ""} desc='Welcome to your personalized profile page' />
    )
}

export default ProfilePage