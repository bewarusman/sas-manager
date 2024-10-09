import { fetchUsers } from "@/lib/sas";

// GET /api/users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const count = searchParams.get('count') || '10';
    const search = searchParams.get('search') || '';

    const data = await fetchUsers(page, count, search);

    // Return the data to the frontend
    return Response.json(data, {
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    // throw error;
    return Response.json({
      message: error?.message,
    }, {
      status: 500,
    });
  }
}
