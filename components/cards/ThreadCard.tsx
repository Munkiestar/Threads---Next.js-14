import React from "react";
import Link from "next/link";
import Image from "next/image";

interface TProps {
  id: string;
  currentUserId: string | "";
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  comments: {
    author: {
      image: string;
    };
  }[];
  createdAt: string;
  isComment?: boolean;
}
const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  author,
  community,
  comments,
  createdAt,
  content,
  isComment,
}: TProps) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7 text-light-1">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                fill
                alt={"Profile image"}
                className="cursor-pointer rounded-full"
              />
              {author.name}
            </Link>
            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular">{content}</p>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image
                  src={"/assets/heart-gray.svg"}
                  width={24}
                  height={24}
                  alt="heart"
                />{" "}
                <Link href={`/thread/${id}`}>
                  <Image
                    src={"/assets/reply.svg"}
                    width={24}
                    height={24}
                    alt="reply"
                  />{" "}
                </Link>
                <Image
                  src={"/assets/repost.svg"}
                  width={24}
                  height={24}
                  alt="repost"
                />{" "}
                <Image
                  src={"/assets/share.svg"}
                  width={24}
                  height={24}
                  alt="share"
                />
              </div>

              {isComment && comments.length && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {content.length}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
