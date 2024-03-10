import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const newPrompt = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a prompt", { status: 500 });
  }
};
