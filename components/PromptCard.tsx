import { PromptType } from '@/models/prompt'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Check, Copy } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

type handleTagClickType = () => any


interface Props {
  post: PromptType,
  handleTagClick: handleTagClickType
  handleEdit: handleTagClickType
  handleDelete: handleTagClickType
}

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }: Props) => {

  const [copiedPrompt, setCopiedPrompt] = useState("")

  const { data: session } = useSession()
  const pathname = usePathname()

  const router = useRouter()

  const handleCopyPrompt = () => {
    setCopiedPrompt(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => {
      setCopiedPrompt("")
    }, 3000)
  }

  return (
    <div className='flex-1 break-inside-avoid-column rounded-lg border border-gray-300 glassmorphism p-6 pb-4 md:w-[360px] w-full h-fit'>
      <div className="flex justify-between items-start">
        <div className='flex-1 flex flex-center justify-start gap-3'>
          <Image onClick={() => { session?.user.id == post.creator._id ? router.push(`/profile`) : router.push(`/profile/${post.creator._id}`) }} alt='creator-profile' src={post.creator.image} width={45} height={45} className='rounded-full cursor-pointer' />
          <div className='space-y-[2px]'>
            <h3 className='font-semibold font-satoshi text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-gray-500 text-xs'>{post.creator.email}</p>
          </div>
        </div>
        <Button size={"icon"} variant={"outline"} className='rounded-full w-[35px] h-[35px]' onClick={handleCopyPrompt}>{
          copiedPrompt == post.prompt ?
            <Check size={15} /> :
            <Copy size={15} />
        }</Button>
      </div>
      <p className='my-4 text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={handleTagClick}
      >
        {post.tag}
      </p>
      {
        pathname == "/profile" && session?.user.id == post.creator._id &&
        <div className='mt-3 pt-3 border-t border-gray-200 flex flex-center gap-5'>
          <p onClick={handleEdit} className='blue_gradient text-sm cursor-pointer'>Edit</p>
          <p onClick={handleDelete} className='orange_gradient text-sm cursor-pointer'>Delete</p>
        </div>
      }
    </div>
  )
}

export default PromptCard