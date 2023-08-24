import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/get-data"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
