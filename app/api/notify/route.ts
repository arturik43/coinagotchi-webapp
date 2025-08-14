import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function POST(req: NextRequest){
  try {
    const body = await req.json();
    const webhook = String(body?.webhook || "").trim();
    if (!webhook) return NextResponse.json({ ok:false, error:"missing webhook" }, { status: 400 });
    const p = path.join(process.cwd(), "webhook_url.txt");
    fs.writeFileSync(p, webhook, "utf8");
    return NextResponse.json({ ok:true });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message || "error" }, { status: 500 });
  }
}
