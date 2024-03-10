"use client";

import Form from '@/components/Form'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdatePrompt = () => {
    const { id: postId } = useParams()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })
    const router = useRouter()

    useEffect(() => {

        const fetchPostById = async () => {
            try {
                const res = await fetch(`/api/prompts/${postId}`)
                const data = await res.json()

                setPost({ tag: data.tag, prompt: data.prompt })

            } catch (error) {
                console.log(error)
            }
        }

        if (postId) fetchPostById();

    }, [postId])

    const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true)

        try {

            const res = await fetch(`/api/prompts/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({ ...post })
            })

            if (res.ok) {
                router.push("/")
            }

        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
    )
}

export default UpdatePrompt