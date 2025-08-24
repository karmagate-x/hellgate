import clientPromise from "./mongodb";

export async function getUserByClerkId(clerkId) {
    const client = await clientPromise;
    const db = client.db();
    return db.collection("users").findOne({ clerkId });
}

export async function createUser(userData) {
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("users").updateOne(
        { clerkId: userData.clerkId },
        { $setOnInsert: userData },
        { upsert: true }
    );

    return await db.collection("users").findOne({ clerkId: userData.clerkId });
}
