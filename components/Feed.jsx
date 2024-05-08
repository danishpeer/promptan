"use client";
import React, { useEffect ,useState} from 'react'

import PromptCard from './PromptCard';


const PromptCardList = ({data, handleTagClick}) => {
  return (
  <div className="prompt_layout">      
    {data.map((prompt) => (
        <PromptCard key={prompt._id} post={prompt} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([])

  useEffect(()=>{
    const getPosts =  async () => {
     const res = await fetch("/api/prompt");
     const data = await res.json();
     setPosts(data);
    }
    getPosts();
  }, [])
   
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    setSearchedResults(filterPrompts(e.target.value));


  }
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>

        <input type='text' className='search_input peer' placeholder='Search for a user or tag' value={searchText} onChange={handleSearchChange} />

      </form>
      
        {searchText ? (
            <PromptCardList data={searchedResults} handleTagClick={() => {}} />
            ) :( 
            <PromptCardList data={posts} handleTagClick={() => {}} />
        )};
      
    </section>
  )
}

export default Feed
