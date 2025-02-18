import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import prisma from "@/DB/prisma";
import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/user/repos?sort=updated&per_page=5";

export async function GET() {
    try {
        //session
         const session = await auth.api.getSession({
         headers: await headers()  
         })
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        //fetching access token
        const Data = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            select: {
                accounts: {
                    select: {
                        accessToken: true
                    }
                }
            }
        })
        const ACCESS_TOKEN = Data?.accounts[0].accessToken || null;
        if (!ACCESS_TOKEN) {
            return NextResponse.json({ message: "Access token required" }, { status: 404 });
        }
        //fetch repos
        const response = await axios.get(GITHUB_API_URL, {
        headers: {
            Authorization: `token ${ACCESS_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
        },
        });        
        const repos = response.data;
        if (!repos) {
            return NextResponse.json({ message: "No repos found" }, { status: 404 });
        }
        return NextResponse.json(repos, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}