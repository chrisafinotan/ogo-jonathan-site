export async function POST(request) {
    try {
        return Response.json({});
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
