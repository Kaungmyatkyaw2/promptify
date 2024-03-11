import { PromptType } from "@/models/prompt"
import PromptCard from "./PromptCard"


type handleTagClickType = (tag: string) => any
type handleActionClickType = (post: PromptType) => any

interface PropsForPromptCardList {
    data: PromptType[],
    handleTagClick: handleTagClickType,
    handleDelete?: handleActionClickType
    handleEdit?: handleActionClickType
}

const PromptCardList = ({ data, handleTagClick, handleDelete, handleEdit }: PropsForPromptCardList) => {



    return <div className="mt-10 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {data.map(post => <PromptCard
            key={post._id}
            post={post}
            handleTagClick={
                () => handleTagClick && handleTagClick(post.tag)
            }
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
        />)}
    </div>

}

export default PromptCardList