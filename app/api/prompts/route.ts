import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const newPrompt = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const { userId, tag, prompt } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a prompt", { status: 500 });
  }
};
