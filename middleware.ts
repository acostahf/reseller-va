export { default } from "next-auth/middleware";

//add more routes here for auth
export const config = { matcher: ["/dashboard"] };
