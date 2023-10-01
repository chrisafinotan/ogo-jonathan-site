export async function GET(request: Request) {
    const data = { hello: 'world' };

    return Response.json(data);
}
