"use client";

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id');

    useEffect(()=>{
        const getPost = async () => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json();
            setPost(data);
        }
        if (promptId){
            getPost();
        }
    }, [promptId] )

    const {data: session} = useSession();
    const router = useRouter();
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`/api/prompt/${promptId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })
            if (res.ok){
                router.push('/profile')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }

    }

  return (
    <Form 
    type="Update"
    post={post}
    setPost={setPost}
    submitting={submitting}
    createPrompt={updatePrompt}
    />
  )
}

export default EditPrompt;
