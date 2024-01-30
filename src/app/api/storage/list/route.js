import { NextResponse } from 'next/server';
import { storage } from '@/lib/firebase/firebaseClient';
import { getAllImages } from '@/lib/firebase/storage';

export async function GET() {
    try {
        if (!storage) {
            return NextResponse('Storage not configured', {status: 500})
        }
        const res = await getAllImages();
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
