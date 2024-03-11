import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id);

    if (!user) {
      return new Response("User Not Found!", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch a user", { status: 500 });
  }
};
