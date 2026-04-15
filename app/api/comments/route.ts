import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

async function getDB(): Promise<D1Database> {
  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  const ctx = await getCloudflareContext();
  const env = ctx.env as unknown as Record<string, unknown>;
  if (!env.DB) {
    throw new Error("D1 binding 'DB' not found in env. Available keys: " + Object.keys(env).join(", "));
  }
  return env.DB as D1Database;
}

export async function GET(request: NextRequest) {
  const catalogId = request.nextUrl.searchParams.get("catalogId");
  if (!catalogId) {
    return NextResponse.json({ error: "catalogId required" }, { status: 400 });
  }

  try {
    const db = await getDB();
    const { results } = await db
      .prepare("SELECT id, catalog_id, parent_id, nick, body, created_at FROM comments WHERE catalog_id = ? ORDER BY created_at ASC")
      .bind(catalogId)
      .all();
    return NextResponse.json(results ?? []);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
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
    const db = await getDB();
    const id = crypto.randomUUID();
    const now = Date.now();

    await db
      .prepare("INSERT INTO comments (id, catalog_id, parent_id, nick, body, created_at) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(id, catalogId, parentId ?? null, nick.trim(), text.trim(), now)
      .run();

    return NextResponse.json(
      { id, catalog_id: catalogId, parent_id: parentId ?? null, nick: nick.trim(), body: text.trim(), created_at: now },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
