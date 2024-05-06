import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"

export const GET = async (req, {params}) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt){
            return new Response("Prompt doesn't exist", {status: 404})
        }

        return new Response(JSON.stringify(prompt), {status: 200})

        
    } catch (error) {
        return new Response("Failed to fetch prompts", {status: 500})
        
    }
}


export const PATCH = async( req, {params}) => {
    try {
        await connectToDB();

        const prompt = await req.json();

        const existingprompt = await Prompt.findById(params.id).populate('creator');

        if (!existingprompt){
            return new Response("Prompt doesn't exist", {status: 404})
        }

        existingprompt.prompt = prompt.prompt;
        existingprompt.tag = prompt.tag;

        await existingprompt.save();



        return new Response(JSON.stringify(existingprompt), {status: 200})

        
    } catch (error) {
        return new Response("Failed to update prompts", {status: 500})
        
    }
}

export const DELETE = async( req, {params}) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id)


        return new Response("Prompt deleted", {status: 200})

        
    } catch (error) {
        return new Response("Failed to delete prompts", {status: 500})
        
    }
}