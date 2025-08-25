import { verifyToken, createClerkClient } from "@clerk/backend";
import { createUser } from "@/lib/karmaUsers";
import crypto from "crypto";

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

function generateApiKey() {
    return crypto.randomBytes(32).toString("base64url");
}

export async function POST(req) {
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
        const clerkUser = await clerkClient.users.getUser(userId);

        await createUser({
            clerkId: clerkUser.id,
            fullName: clerkUser.fullName,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            karmaGateUsername: clerkUser.username,
            karmaSubscription: "trial",
            karmaGateApikey: generateApiKey(),
            role: "user",
            createdAt: new Date(),
        });

        return new Response("OK", { status: 200 });
    } catch {
        return new Response("Unauthorized", { status: 401 });
    }
}
