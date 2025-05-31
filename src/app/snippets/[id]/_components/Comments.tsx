import React, { useState } from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import toast from 'react-hot-toast';
import { MessageSquare } from "lucide-react";
import { SignInButton } from '@clerk/nextjs';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
    const { user } = useUser();
    const [issubmitting, setissubmitting] = useState(false);
    const [deletingcommentid, setdeletingcommentid] = useState<string | null>(null);
    const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });
    const addComent = useMutation(api.snippets.addComment);
    const deletecomment = useMutation(api.snippets.deleteComment);

    const handlesbumitcomment = async (content: string) => {
        setissubmitting(true);
        try {
            await addComent({ snippetId, content });
        }
        catch {
            toast.error("Unable to add the comment ..")
        }
        finally {
            setissubmitting(false);
        }
    }

    const handledelcomment = async (commentId: Id<"snippetComments">) => {
        setdeletingcommentid(commentId);
        try {
            await deletecomment({ commentId });
        }
        catch {
            toast.error("unable to delete the comment..")
        }
        finally {
            setdeletingcommentid(null);
        }
    }

    return (
        <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Discussion ({comments?.length})
                </h2>
            </div>

            <div className="p-6 sm:p-8">
                {user ? (
                    <CommentForm onSubmit={handlesbumitcomment} isSubmitting={issubmitting} />
                ) : (
                    <div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
                        <p className="text-[#808086] mb-4">Sign in to join the discussion</p>
                        <SignInButton mode="modal">
                            <button className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                )}

                <div className="space-y-6">
                    {comments?.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onDelete={handledelcomment}
                            isDeleting={deletingcommentid === comment._id}
                            currentUserId={user?.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Comments;
