import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { PromptType } from "@/models/prompt"
import { useState } from "react"

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    onCancel: () => any
    onDeleteSuccess: (post: PromptType) => any
    post: PromptType | null
}

const PromptDeleteModal = ({ open, setOpen, post, onDeleteSuccess, onCancel }: Props) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleDeletePrompt = async () => {
        setIsLoading(true)
        try {
            await fetch(`/api/prompts/${post?._id}`, {
                method: "DELETE"
            })
            await onDeleteSuccess(post || {} as PromptType)
            setOpen(false)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <AlertDialog open={open} onOpenChange={isLoading ? () => { } : setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure to delete this prompt?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button
                        className="sm:mt-0 mt-2"
                        disabled={isLoading}
                        onClick={() => {
                            onCancel()
                            setOpen(false)
                        }}>Cancel</Button>
                    <Button disabled={isLoading} className="bg-red-500 hover:bg-red-600" onClick={handleDeletePrompt}>Delete</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PromptDeleteModal