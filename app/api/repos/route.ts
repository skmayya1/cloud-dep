import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/DB/prisma";
import axios from "axios";

const GITHUB_REPOS_API = "  https://api.github.com/user/repos";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const Data = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        accounts: {
          select: {
            accessToken: true,
          },
        },
      },
    });

    const ACCESS_TOKEN = Data?.accounts[0].accessToken;
    if (!ACCESS_TOKEN) {
      return NextResponse.json(
        { message: "Access token required" },
        { status: 404 }
      );
    }
    
    const res = await axios.get(GITHUB_REPOS_API, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          Accept: "application/vnd.github+json",
          'X-GitHub-Api-Version': '2022-11-28'
        },
        params: {
          visibility: "all",
          affiliation: "owner,collaborator,organization_member",
          per_page: 100,
          sort: "updated",
          direction: "desc",
        },
      });
    const repos = res.data;

    

    if (!repos || repos.length === 0) {
      return NextResponse.json({ message: "No repos found" }, { status: 404 });
    }

    return NextResponse.json(repos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
