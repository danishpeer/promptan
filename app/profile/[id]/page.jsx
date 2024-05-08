"use client"
import React, {useEffect, useState} from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const OtherProfile = ({params}) => {

    const {data: session} = useSession();

    // /profile/:id/name
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const profileId= params.id;


    const [posts, setPosts] = useState([]);

    const router = useRouter();

    useEffect(()=>{
        const getPosts =  async () => {
         const res = await fetch(`/api/users/${profileId}/posts`);
         const data = await res.json();
         setPosts(data);
        }
        if(profileId) getPosts();
      }, [profileId])

  return (
    <div>
      <Profile name={userName} desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`} data={posts} />
    </div>
  )
}

export default OtherProfile;
