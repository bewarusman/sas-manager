import { fetchProfiles } from "@/lib/sas";

// GET /api/profiles
export async function GET(request: Request) {
  try {
    const data = await fetchProfiles();

    // Return the data to the frontend
    return Response.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    // throw error;
    return Response.json({
      message: error?.message,
    }, {
      status: 500,
    });
  }
}
