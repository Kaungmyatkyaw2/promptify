import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Every next js route is serverless

const handler = NextAuth({
  callbacks: {
    async signIn({ profile, user }) {
      try {
        await connectToDB();

        const userExsits = await User.findOne({ email: profile?.email });
        if (!userExsits) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error : ", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user?.email });
        if (session.user) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.log("Error : ", error);
        return session;
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      checks: ["none"],
    }),
  ],
});

export { handler as GET, handler as POST };
