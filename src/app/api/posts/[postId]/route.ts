import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/db"; // assuming `prisma` is the instance of your Prisma client
import { getSessionEmailOrThrow } from "@/actions"; // import your auth helper if it exists here

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    // Get the user's email to verify they have permission to delete this post
    const userEmail = await getSessionEmailOrThrow();
    const { postId } = params;

    // Check if the post exists and belongs to the user
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.author !== userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
