import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const catalogId = request.nextUrl.searchParams.get("catalogId");
  if (!catalogId) {
    return new Response(JSON.stringify({ error: "catalogId required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext();
    const db = (ctx.env as unknown as { DB: D1Database }).DB;

    if (!db) {
      const keys = Object.keys(ctx.env as object);
      return new Response(
        JSON.stringify({ error: "DB binding missing", availableBindings: keys }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { results } = await db
      .prepare(
        "SELECT id, catalog_id, parent_id, nick, body, created_at FROM comments WHERE catalog_id = ? ORDER BY created_at ASC"
      )
      .bind(catalogId)
      .all();

    return new Response(JSON.stringify(results ?? []), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err), stack: (err as Error).stack }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { catalogId, parentId, nick, text } = payload as {
      catalogId?: string;
      parentId?: string | null;
      nick?: string;
      text?: string;
    };

    if (!catalogId || !nick?.trim() || !text?.trim()) {
      return new Response(
        JSON.stringify({ error: "catalogId, nick, and text are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext();
    const db = (ctx.env as unknown as { DB: D1Database }).DB;

    if (!db) {
      const keys = Object.keys(ctx.env as object);
      return new Response(
        JSON.stringify({ error: "DB binding missing", availableBindings: keys }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const id = crypto.randomUUID();
    const now = Date.now();

    await db
      .prepare(
        "INSERT INTO comments (id, catalog_id, parent_id, nick, body, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .bind(id, catalogId, parentId ?? null, nick.trim(), text.trim(), now)
      .run();

    return new Response(
      JSON.stringify({
        id,
        catalog_id: catalogId,
        parent_id: parentId ?? null,
        nick: nick.trim(),
        body: text.trim(),
        created_at: now,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err), stack: (err as Error).stack }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
