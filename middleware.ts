import { authMiddleware } from "@clerk/nextjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = authMiddleware({
  publicRoutes: ["/api/get-data"],
  ignoredRoutes: ["/((?!api|trpc))(_next|.+\..+)(.*)"],
});

export default handler;
