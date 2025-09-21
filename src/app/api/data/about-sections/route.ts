/** @format */

import { NextResponse } from "next/server";
import aboutSectionsData from "@/data/about-sections.json";

export async function GET() {
	try {
		return NextResponse.json(aboutSectionsData);
	} catch (error) {
		console.error("Error serving about sections data:", error);
		return NextResponse.json({ error: "Failed to load about sections data" }, { status: 500 });
	}
}
