import clientPromise from "@/lib/mongodb";

export async function PUT(req) {
    try {
        const {
            shortlinkKey,
            owner,
            firstUrl,
            secondUrl,
            firstUrlStatus,
            secondUrlStatus,
            allowedDevice,
            allowedCountry,
            botRedirection,
            originalShortlinkKey,
        } = await req.json();

        const lookupKey = originalShortlinkKey || shortlinkKey;

        if (!shortlinkKey || !owner) {
            return new Response(JSON.stringify({ message: "Missing required fields!" }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();

        const updateFields = {};
        if (firstUrl !== undefined) updateFields.firstUrl = firstUrl;
        if (secondUrl !== undefined) updateFields.secondUrl = secondUrl;
        if (shortlinkKey !== undefined) updateFields.shortlinkKey = shortlinkKey;
        if (firstUrlStatus !== undefined) updateFields.firstUrlStatus = firstUrlStatus;
        if (secondUrlStatus !== undefined) updateFields.secondUrlStatus = secondUrlStatus;
        if (allowedDevice !== undefined) updateFields.allowedDevice = allowedDevice;
        if (allowedCountry !== undefined) updateFields.allowedCountry = allowedCountry;
        if (botRedirection !== undefined) updateFields.botRedirection = botRedirection;
        updateFields.updatedAt = new Date();

        const result = await db.collection("shortlinks").updateOne(
            { shortlinkKey: lookupKey, owner },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ message: "Shortlink not found or not owned by user." }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Shortlink updated successfully." }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
