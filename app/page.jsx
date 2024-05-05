import Feed from "@components/Feed"
const Home = () => {
  return (
     <section className="w-full flex-center flex-col">
       <h1 className="head_text text-center"> Ignite Your Imagination with
       {/* Hide break on large devices */}
       <br className="max-md:hidden"></br> 
       <span className="orange_gradient text-center"> Coolest AI Writing Prompts!</span>
       </h1>
       <p className="desc text-center">
        Explore the depths of your creativity with our AI-powered writing prompts. From sci-fi adventures to heartfelt narratives, find the inspiration you need to create captivating stories that leave a lasting impact. Join Promptan today and unlock a world of endless possibilities for your writing journey.
       </p>

       <Feed />

     </section>
  )
}

export default Home
