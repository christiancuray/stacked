import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostProps {
  userName: string;
  title: string;
  body: string;
  createdAt: string;
}

export function Post({ userName, title, body, createdAt }: PostProps) {
  // Format the timestamp for display
  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  return (
    <Card className="w-full max-w-md shadow-md hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {userName}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {formatTimeAgo(createdAt)}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{body}</p>
      </CardContent>

      <CardFooter className="pt-0 flex gap-4 w-full">
        <CardAction className="flex-1 text-center py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-150">
          Like
        </CardAction>
        <CardAction className="flex-1 text-center py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-150">
          Comment
        </CardAction>
        <CardAction className="flex-1 text-center py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-150">
          Share
        </CardAction>
      </CardFooter>
    </Card>
  );
}
