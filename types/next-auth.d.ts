import { DefaultSession } from "next-auth";
import { LearningPath } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      learningPath: LearningPath;
    } & DefaultSession["user"];
  }

  interface User {
    learningPath: LearningPath;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    learningPath: LearningPath;
  }
}
