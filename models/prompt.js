import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
    prompt: {
        type: String,
        required: [true, "prompt is required"]
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tag: {
        type: String,
        required: [true, "tag is required"]
    }
});

const Prompt = models.Prompt || model('Prompt', promptSchema)

export default Prompt;

