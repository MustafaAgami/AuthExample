import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import connect from "../../../../lib/dbConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../../lib/db";
import User from "../../../../models/UserModel";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        try {
          console.log("Crednetials method called", credentials);
          const users = await User.findOne({ username: credentials.username });
          console.log("Crednetials method called", users);
          if (!users) {
            throw new Error("User not found");
          }
          if (!users.isVerfied) {
            throw new Error("User is not already verified");
          }
          const isPasswordCorrect = true;
          if (isPasswordCorrect) {
            return users;
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (e) {
          throw new Error(err);
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // pages: {
  //   signIn: "/login",
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id.toString();
        token.isVerified = user.isVerfied;
        token.username = user.username;
      }
      console.log("JWT method called", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
      }
      console.log("Session method called", session);
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log("Base url :::", baseUrl);
    //   return baseUrl + "/dashboard";
    // },
  },
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
