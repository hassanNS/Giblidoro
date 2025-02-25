import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const backgroundsDir = path.join(process.cwd(), 'public/backgrounds');
    const files = fs.readdirSync(backgroundsDir);
    
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    ).map(file => `/backgrounds/${file}`);

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error reading backgrounds directory:', error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}