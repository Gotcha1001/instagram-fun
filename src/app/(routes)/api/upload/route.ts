import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/config";

// No need for 'export const config' anymore

export async function POST(request: NextRequest) {
  try {
    // Use request.formData() to handle the file upload manually
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    // Assuming `pinata.upload.file` is correct for file uploading logic
    const uploadData = await pinata.upload.file(file, {
      groupId: "0192dd25-bb80-7cf9-835e-6317f08471d2",
    });

    // Create the URL for the uploaded file
    const fileUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;

    // Return success response with the file URL
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    // Return error response if something goes wrong
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
