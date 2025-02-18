import { betterAuth, BetterAuthPlugin } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
 
export const auth = betterAuth({
    plugins: [
        myPlugin()
    ]
});


const myPlugin = ()=>{
    return {
        id: "my-plugin",
        middleware: [
            {
                path: "/my-plugin/hello-world",
                middleware: createAuthMiddleware(async(ctx)=>{
                    //do something
                })
            }
        ]
    } satisfies BetterAuthPlugin
}