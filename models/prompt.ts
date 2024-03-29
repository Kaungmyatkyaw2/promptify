import { Schema, model, models } from "mongoose";
import { UserType } from "./user";
import { Document } from "mongoose";

export interface PromptType extends Document {
  creator: UserType;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required!"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
