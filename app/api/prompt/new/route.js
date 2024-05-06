import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const {prompt, userId, tag} = await req.json()
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            prompt,
            creator: userId,
            tag
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status: 201});
        
    } catch (error) {
        console.log(error);
        return new Response("failed to create a prompt",{status: 500});
    }

}