import { PromptType } from '@/models/prompt';
import React, { useEffect, useState } from 'react'
import PromptCardList from './PromptCardList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PromptDeleteModal from './PromptDeleteModal';
import Image from 'next/image';


interface Props {
  name: string;
  desc: string
  image: string;
}

const Profile = ({ name, desc, image }: Props) => {

  const [posts, setPosts] = useState<PromptType[]>([])
  const [postToDel, setPostToDel] = useState<PromptType | null>(null)
  const [openDelModal, setOpenDelModal] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()



  const fetchPrompts = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user?.id}/prompts`)
      const data = await res.json()

      setPosts(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (session?.user) {
      fetchPrompts()
    }
  }, [session])


  const handleEdit = (post: PromptType) => {
    router.push(`/update-prompt/${post._id}`)
  }

  const handleDelete = (post: PromptType) => {
    setPostToDel(post)
    setOpenDelModal(true)
  }

  const onDeleteSuccess = (post: PromptType) => {
    setPosts(prev => prev.filter(el => el._id !== post._id))
  }

  const onCancel = () => {
    setPostToDel(null)
  }

  return (
    <div className='w-full'>
      <PromptDeleteModal onCancel={onCancel} onDeleteSuccess={onDeleteSuccess} post={postToDel} open={openDelModal} setOpen={setOpenDelModal} />
      <div className='flex md:flex-row flex-col md:gap-10'> <Image alt='user-profile' src={image} width={150} height={150} className='rounded-full cursor-pointer' />
        <div>
          <h1 className='head_text'><span className=' blue_gradient'>
            {name} Profile</span></h1>
          <p className='desc'>{desc}</p>
        </div></div>

      <PromptCardList data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleTagClick={() => { }} />

    </div>
  )
}

export default Profile