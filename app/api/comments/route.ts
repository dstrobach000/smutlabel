import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const catalogId = request.nextUrl.searchParams.get("catalogId");
  if (!catalogId) {
    return NextResponse.json({ error: "catalogId required" }, { status: 400 });
  }

  try {
    const { env } = await getCloudflareContext<{ DB: D1Database }>();

    const { results } = await env.DB.prepare(
      "SELECT id, catalog_id, parent_id, nick, body, created_at FROM comments WHERE catalog_id = ? ORDER BY created_at ASC"
    )
      .bind(catalogId)
      .all();

    return NextResponse.json(results ?? []);
  } catch (err) {
    return NextResponse.json(
      { error: "DB error", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let payload: { catalogId?: string; parentId?: string | null; nick?: string; text?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { catalogId, parentId, nick, text } = payload;
  if (!catalogId || !nick?.trim() || !text?.trim()) {
    return NextResponse.json({ error: "catalogId, nick, and text are required" }, { status: 400 });
  }

  try {
    const id = crypto.randomUUID();
    const now = Date.now();

    const { env } = await getCloudflareContext<{ DB: D1Database }>();

    await env.DB.prepare(
      "INSERT INTO comments (id, catalog_id, parent_id, nick, body, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(id, catalogId, parentId ?? null, nick.trim(), text.trim(), now)
      .run();

    return NextResponse.json(
      { id, catalog_id: catalogId, parent_id: parentId ?? null, nick: nick.trim(), body: text.trim(), created_at: now },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "DB error", detail: String(err) },
      { status: 500 }
    );
  }
}
