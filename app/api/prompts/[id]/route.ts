import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt Not Found!", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch a prompt", { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();

  try {
    await connectToDB();
    let existingPrompt = await Prompt.findById(params.id).populate("creator");

    if (!existingPrompt) {
      return new Response("Prompt Not Found!", { status: 404 });
    }

    existingPrompt.prompt = body.prompt;
    existingPrompt.tag = body.tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update a prompt", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Successfully deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete a prompt", { status: 500 });
  }
};
