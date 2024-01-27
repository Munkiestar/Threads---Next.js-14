"use server";

import { connectToDB } from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: Params) => {
  try {
    await connectToDB();

    const createThread = await Thread.create({ text, author, community: null });

    // update User model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Failed to create thread: ${err.message}`);
  }
};

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
  try {
    await connectToDB();

    // Calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch posts that have no parents (top-level threads)
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({
        createdAt: "desc",
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNextPage = totalPostsCount > skipAmount + posts.length;

    return { posts, isNextPage };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Re-throw the error to propagate it up the call stack
  }
};
