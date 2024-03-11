"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { PromptType } from "@/models/prompt";
import PromptCardList from "./PromptCardList";


const Feed = () => {

  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState<PromptType[]>([])


  const fetchPrompts = async () => {
    try {
      const res = await fetch("/api/prompts")
      const data = await res.json()

      setPosts(data)

    } catch (error) {
      console.log(error)
    }
  }

  const searchPrompts = async () => {
    try {
      if (searchText) {
        const res = await fetch(`/api/prompts/search/${searchText.replace("#", "")}`)
        const data = await res.json()

        setPosts(data)
      }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchPrompts()
  }, [])


  useEffect(() => {

    let interval = setTimeout(() => {
      searchText ? searchPrompts() : fetchPrompts()
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [searchText])



  const handleTagSearch = (tag: string) => {
    setSearchText(tag)
  }


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.trim())
  }

  return <section className="mt-16 w-full max-w-xl flex justify-center items-center flex-col gap-2">
    <form className="relative w-full flex-center">
      <Input onChange={handleSearch} value={searchText} required type="text" placeholder="Search for prompts..." className="peer w-full shadow" />
    </form>
    <PromptCardList data={posts} handleTagClick={handleTagSearch} />
  </section>;
};

export default Feed;
