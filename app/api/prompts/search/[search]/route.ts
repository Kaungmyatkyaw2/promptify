import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { search: string } }
) => {
  try {
    await connectToDB();
    const search = new RegExp(params.search, "i");
    const prompts = await Prompt.find({
      $or: [
        {
          prompt: search,
        },
        {
          tag: search,
        },
      ],
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
