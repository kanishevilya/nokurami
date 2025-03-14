import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/Card";
import { Button } from "@/components/ui/shadcn/Button";
import { Input } from "@/components/ui/shadcn/Input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import {
  ThumbsUp,
  MessageSquare,
  MoreHorizontal,
  Send,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getMediaSource } from "@/utils/get-media-source";
import { cn } from "@/utils/cn";

export interface PostCardProps {
  post: any;
  currentUserId: string;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  isLiking: boolean;
  isCommenting: boolean;
}

export function PostCard({
  post,
  currentUserId,
  onLike,
  onComment,
  isLiking,
  isCommenting,
}: PostCardProps) {
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      onComment(post.id, commentInput);
      setCommentInput("");
      // Keep the comment input open after submitting
    }
  };

  console.log(post);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const isLikedByCurrentUser = post.likes?.some(
    (like: any) => like.userId === currentUserId
  );

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={getMediaSource(post.author?.avatar)}
              alt={post.author?.username || "User"}
            />
            <AvatarFallback>
              {(post.author?.username || "U").substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {post.author?.displayName || post.author?.username || "User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2">
              <p className="whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch border-t px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center gap-1",
                isLikedByCurrentUser && "text-primary"
              )}
              onClick={handleLike}
              disabled={isLiking}
            >
              {isLiking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ThumbsUp className="h-4 w-4" />
              )}
              <span>{post.likes?.length || 0}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={toggleComments}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments?.length || 0}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleCommentInput}>
            Add comment
          </Button>
        </div>

        {/* Comment input */}
        {showCommentInput && (
          <form
            onSubmit={handleCommentSubmit}
            className="mt-3 flex items-center gap-2"
          >
            <Input
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!commentInput.trim() || isCommenting}
            >
              {isCommenting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        )}

        {/* Comments section */}
        {showComments && post.comments && post.comments.length > 0 && (
          <div className="mt-3 space-y-3 border-t pt-3">
            <h4 className="text-sm font-medium">Comments</h4>
            {post.comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={getMediaSource(comment.author?.avatar)}
                    alt={comment.author?.username || "User"}
                  />
                  <AvatarFallback>
                    {(comment.author?.username || "U")
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 rounded-lg bg-muted p-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">
                      {comment.author?.displayName ||
                        comment.author?.username ||
                        "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <p className="mt-1 text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
