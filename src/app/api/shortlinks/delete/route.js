import clientPromise from "@/lib/mongodb";

export async function DELETE(req) {
    try {
        const { shortlinkKey, owner } = await req.json();
        if (!shortlinkKey || !owner) {
            return new Response(JSON.stringify({ message: "Missing required fields! (shortlinkKey, owner)" }), { status: 400 });
        }
        const client = await clientPromise;
        const db = client.db();
        const result = await db.collection("shortlinks").deleteOne({ shortlinkKey, owner });
        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ message: "Shortlink not found or not owned by user." }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: "Shortlink deleted successfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
