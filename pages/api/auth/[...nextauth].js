import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import path from "path";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

// const transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "a34374320c213c",
//     pass: "90f396c764fc9d",
//   },
// });

// const emailsDir = path.resolve(process.cwd(), "emails");

// const sendVerificationRequest = ({ identifier, url }) => {
//   const emailFile = readFileSync(path.join(emailsDir, "confirm-email.html"), {
//     encoding: "utf8",
//   });
//   const emailTemplate = Handlebars.compile(emailFile);
//   transporter.sendMail({
//     from: `"✨ SupaVacation" ${process.env.EMAIL_FROM}`,
//     to: identifier,
//     subject: "Your sign-in link for SupaVacation",
//     html: emailTemplate({
//       base_url: process.env.NEXTAUTH_URL,
//       signin_url: url,
//       email: identifier,
//     }),
//   });
// };

export default NextAuth({
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    //   maxAge: 10 * 60,
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
});
