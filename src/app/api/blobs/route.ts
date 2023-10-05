import { ListBlobResult, list } from '@vercel/blob';

export async function GET(request: Request) {
    const { blobs }: ListBlobResult = await list();
    return Response.json(blobs);
}
