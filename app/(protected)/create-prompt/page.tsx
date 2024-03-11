"use client";

import Form from '@/components/Form'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  })
  const { data: session } = useSession()
  const router = useRouter()

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true)

    try {

      const res = await fetch("/api/prompts", {
        method: "POST",
        body: JSON.stringify({ ...post, userId: session?.user.id })
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
    <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />
  )
}

export default CreatePrompt