import { auth } from "@/auth";
import { fetchProfiles } from "@/lib/sas";

// GET /api/me
export async function GET(request: Request) {
  const session = await auth();
  return Response.json({
    user: session?.user
  }, {
    status: 200,
  });
}
