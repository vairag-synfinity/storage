import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { base64 } = await req.json();

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64}`,
      {
        folder: "uploads",
      }
    );

    return Response.json({
      url: result.secure_url,
    });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
