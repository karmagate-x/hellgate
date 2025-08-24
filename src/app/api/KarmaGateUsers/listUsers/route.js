import { verifyToken, createClerkClient } from "@clerk/backend";
import { getUserByClerkId } from "@/lib/karmaUsers";

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

export async function GET(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    try {
        const payload = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });

        const userId = payload.sub;

        const existingUser = await getUserByClerkId(userId);

        if (!existingUser) {
            return new Response(
                JSON.stringify({ error: "User not found in MongoDB" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(existingUser), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch {
        return new Response("Unauthorized", { status: 401 });
    }
}
