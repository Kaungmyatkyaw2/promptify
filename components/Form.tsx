import React, { FormEventHandler } from 'react'
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';


interface Prompt {
  prompt: string;
  tag: string;
}

interface Props {

  type: string;
  post: Prompt,
  setPost: React.Dispatch<React.SetStateAction<Prompt>>
  submitting: boolean
  handleSubmit: FormEventHandler<HTMLFormElement>

}

const Form = ({ type, post, setPost, submitting, handleSubmit }: Props) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className=' head_text text-left '><span className='blue_gradient'>{type} Post</span></h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>

        <div className="grid w-full gap-2">
          <Label htmlFor="prompt" className='text-[16px] font-satoshi font-semibold'>Your prompt</Label>
          <Textarea
            value={post.prompt}
            onChange={e => setPost(prev => ({ ...prev, prompt: e.target.value }))}
            className='outline-none h-[200px] font-satoshi' id="prompt" placeholder="Write your prompt here...." />
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="prompt" className='text-[16px] font-satoshi font-semibold'>Tag <span className='text-sm text-gray-500 font-normal'>(#dev, #idea, #news)</span></Label>
          <Input
            value={post.tag}
            onChange={e => setPost(prev => ({ ...prev, tag: e.target.value }))}
            className='outline-none font-satoshi p-4' id="prompt" placeholder="#tag" />
        </div>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Button asChild variant={"link"} disabled={submitting}>
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button type='submit' disabled={submitting} className='px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600' >
            {submitting ? `${type}ing..` : type}
          </Button>
        </div>

      </form>

    </section >
  )
}

export default Form