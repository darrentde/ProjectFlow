import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
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
  // pages: {
  //   signIn: "/",
  //   signOut: "/",
  //   error: "/",
  //   verifyRequest: "/",
  // },
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
    // Need to purchase a webserver to send emails?

    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Credentials",
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "jsmith@test.com",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // Add logic here to look up the user from the credentials supplied
    //     const user = { id: 1, email: "hello@test.com", password: "12345" };
    //     // database lookiup
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     }
    //     // If you return null then an error will be displayed advising the user to check their details.
    //     return null;

    //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //   },
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
});
