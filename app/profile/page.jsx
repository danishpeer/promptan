"use client"
import React, {useEffect, useState} from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

const MyProfile = () => {

    const {data: session} = useSession();


    const [posts, setPosts] = useState([]);

    const router = useRouter();

    useEffect(()=>{
        const getPosts =  async () => {
         const res = await fetch(`/api/users/${session?.user.id}/posts`);
         const data = await res.json();
         setPosts(data);
        }
        if(session?.user.id) getPosts();
      }, [session?.user.id])


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async (post) => {

        const hasConfirmed = confirm('Are you sure you want to delete this post?');

        if(hasConfirmed){
        
            const res = await fetch(`/api/prompt/${post._id}`, {
                method: 'DELETE'
            })
            if (res.ok){
                setPosts(posts.filter((p) => p._id!== post._id))
            }
            const updatedPosts = posts.filter((p) => p._id!== post._id);
            setPosts(updatedPosts);
        }
        
    }
  return (
    <div>
      <Profile name="My" desc="Welcome to your personalized profile page" data={posts} handleEdit = {handleEdit} handleDelete={handleDelete} />
    </div>
  )
}

export default MyProfile
