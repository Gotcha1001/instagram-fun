import { Profile } from "@prisma/client/index-browser";
import Avatar from "./Avatar";
import { format } from "date-fns";

export default function Comment({
  text,
  authorProfile,
  createdAt,
}: {
  text: string;
  authorProfile?: Profile;
  createdAt: Date;
}) {
  return (
    <div className="flex gap-3">
      <div>
        <Avatar src={authorProfile?.avatar || ""} />
      </div>
      <div className="w-full">
        <div className="flex justify-between gap-2">
          <div>
            <h3 className="flex gap-3 dark:text-gray-200">{authorProfile?.name}</h3>
            <h4 className="text-gray-600 dark:text-gray-500 text-sm -mt-1">
              @{authorProfile?.username}
            </h4>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 border dark:bg-gray-700 dark:text-gray-400 dark:border-0 border-gray-300 rounded-md p-4 mt-2">
            <p>{text}</p>
          </div>
          <time className="block text-xs text-gray-400 text-right">
            {format(createdAt, "yyyy-MM-dd HH:mm:ss")}
          </time>
        </div>
      </div>
    </div>
  );
}
