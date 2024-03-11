"use client"

import Profile from '@/components/Profile'
import { UserType } from '@/models/user'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const OtherProfile = () => {

    const { id: userId } = useParams()
    const { data: session } = useSession()

    const [user, setUser] = useState<UserType | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const fetchUserById = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`/api/users/${userId}`)
                const data = await res.json()

                setUser(data)

            } catch (error) {
                console.log(error)
            } finally { setIsLoading(false) }
        }

        if (userId) fetchUserById();

    }, [userId])

    return (
        isLoading && !user ? <h1>Loading..</h1> : <Profile image={user?.image || ""} name={session?.user.id == user?._id ? "My" : user?.username as string} desc='Welcome to your personalized profile page' />

    )
}

export default OtherProfile