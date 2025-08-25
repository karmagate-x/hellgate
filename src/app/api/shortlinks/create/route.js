import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
        const {
            owner,
            firstUrl,
            secondUrl,
            shortlinkKey,
            firstUrlStatus,
            secondUrlStatus,
            allowedDevice,
            allowedCountry,
            botRedirection,
        } = await req.json();

        if (!owner || !shortlinkKey || !firstUrl) {
            return new Response(JSON.stringify({ message: "Missing required fields!" }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();

        const existing = await db.collection("shortlinks").findOne({ shortlinkKey });
        if (existing) {
            return new Response(JSON.stringify({ message: "Shortlink key already exists! Please choose another key." }), { status: 409 });
        }

        const result = await db.collection("shortlinks").insertOne({
            owner,
            firstUrl,
            secondUrl,
            shortlinkKey,
            firstUrlStatus,
            secondUrlStatus,
            allowedDevice,
            allowedCountry,
            botRedirection,
            createdAt: new Date()
        });

        return new Response(JSON.stringify({ message: `Shortlink successfully created!`, id: result.insertedId }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
