import prisma from "@/DB/prisma";
import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const repoName = searchParams.get("repoName");
    const owner = searchParams.get("owner");

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      return NextResponse.json({ error: "Access token required" }, { status: 401 });
    }

    const response = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/branches`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      params: {
        per_page: 100,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching branches:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch branches" },
      { status: 500 }
    );
  }
}
