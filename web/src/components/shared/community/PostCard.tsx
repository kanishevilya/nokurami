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
  MoreHorizontalIcon,
  Trash2Icon,
  PencilIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getMediaSource } from "@/utils/get-media-source";
import { DropdownMenuItem } from "@/components/ui/shadcn/DropdownMenu";
import { cn } from "@/utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/DropdownMenu";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useUpdatePostMutation,
} from "@/graphql/generated/output";
import { useDeletePostMutation } from "@/graphql/generated/output";
import { toast } from "sonner";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/Dialog";
import { Dialog } from "@/components/ui/shadcn/Dialog";
import { DialogContent } from "@/components/ui/shadcn/Dialog";
import { Textarea } from "@/components/ui/shadcn/Textarea";
import { v4 } from "uuid";
import { useTranslations } from "next-intl";

export interface PostCardProps {
  post: any;
  currentUserId: string;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => Promise<void>;
  isLiking: boolean;
  isCommenting: boolean;
  refetchPosts: () => void;
}

export function PostCard({
  post,
  currentUserId,
  onLike,
  onComment,
  isLiking,
  isCommenting,
  refetchPosts,
}: PostCardProps) {
  const t = useTranslations("community");
  const commonT = useTranslations("common");

  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [postContent, setPostContent] = useState(post.content);

  const [updatePost, { loading: isUpdatingPost }] = useUpdatePostMutation({
    variables: {
      input: {
        id: post.id,
        content: post.content,
      },
    },
    onCompleted: () => {
      toast.success(t("postUpdated"));
    },
    onError: (error) => {
      toast.error(`${t("failedToUpdatePost")}: ${error.message}`);
    },
  });
  const [deletePost, { loading: isDeletingPost }] = useDeletePostMutation({
    variables: {
      id: post.id,
    },
    onCompleted: () => {
      toast.success(t("postDeleted"));
    },
    onError: (error) => {
      toast.error(`${t("failedToDeletePost")}: ${error.message}`);
    },
  });

  const handleUpdatePost = () => {
    if (!postContent.trim()) {
      toast.error(t("postContentEmpty"));
      return;
    }
    updatePost({
      variables: {
        input: { id: post.id, content: postContent },
      },
    });
    setShowEditDialog(false);
  };

  const handleRemoveComment = (commentId: string) => {
    const updatedComments = comments.filter(
      (comment: any) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  const handleOpenEditDialog = () => {
    setShowEditDialog(true);
  };

  const handleLike = () => {
    onLike(post.id);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      onComment(post.id, commentInput).then((comment) => {
        setComments([...comments, comment]);
        setCommentInput("");
      });
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const likes = post.likes || [];
  const isLikedByCurrentUser = likes.some(
    (like: any) => like.userId === currentUserId
  );

  const [comments, setComments] = useState(post.comments || []);
  const commentCount = comments.length;

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
              {post.author?.id === currentUserId && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[230px]">
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => handleOpenEditDialog()}
                      disabled={isUpdatingPost}
                    >
                      <DropdownMenuItem>
                        <PencilIcon className="h-4 w-4" />
                        {t("editPost")}
                      </DropdownMenuItem>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => {
                        deletePost().then(() => {
                          refetchPosts();
                        });
                      }}
                      disabled={isDeletingPost}
                    >
                      <DropdownMenuItem>
                        <Trash2Icon className="h-4 w-4" />
                        {t("deletePost")}
                      </DropdownMenuItem>
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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
                <ThumbsUp
                  className={`h-4 w-4 ${
                    isLikedByCurrentUser ? "fill-current" : ""
                  }`}
                />
              )}
              <span>{likes.length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={toggleComments}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{commentCount}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleCommentInput}>
            {t("addComment")}
          </Button>
        </div>

        {showCommentInput && (
          <form
            onSubmit={handleCommentSubmit}
            className="mt-3 flex items-center gap-2"
          >
            <Input
              placeholder={t("writeComment")}
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
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

        {showComments && comments.length > 0 && (
          <div className="mt-3 space-y-3 border-t pt-3">
            <h4 className="text-sm font-medium">{t("comments")}</h4>
            {comments.map((comment: any, index: number) => (
              <CommentCard
                key={comment.id || index}
                comment={comment}
                currentUserId={currentUserId}
                onRemoveComment={handleRemoveComment}
              />
            ))}
          </div>
        )}
      </CardFooter>
      {showEditDialog && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("editPost")}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="resize-x-none"
              />
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                {commonT("cancel")}
              </Button>
              <Button variant="default" onClick={() => handleUpdatePost()}>
                {commonT("save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

function CommentCard({
  comment,
  currentUserId,
  onRemoveComment,
}: {
  comment: any;
  currentUserId: string;
  onRemoveComment: (commentId: string) => void;
}) {
  const t = useTranslations("community");
  const commonT = useTranslations("common");

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);

  const [deleteComment, { loading: isDeletingComment }] =
    useDeleteCommentMutation({
      variables: {
        id: comment.id,
      },
      onCompleted: () => {
        toast.success(t("commentDeleted"));
      },
      onError: (error) => {
        toast.error(`${t("failedToDeleteComment")}: ${error.message}`);
      },
    });

  const [updateComment, { loading: isUpdatingComment }] =
    useUpdateCommentMutation({
      variables: {
        input: {
          id: comment.id,
          content: comment.content,
        },
      },
      onCompleted: () => {
        toast.success(t("commentUpdated"));
      },
      onError: (error) => {
        toast.error(`${t("failedToUpdateComment")}: ${error.message}`);
      },
    });

  const handleUpdateComment = () => {
    if (!commentContent.trim()) {
      toast.error(t("commentContentEmpty"));
      return;
    }
    updateComment({
      variables: {
        input: { id: comment.id, content: commentContent },
      },
    });
    setShowEditDialog(false);
  };

  return (
    <div key={comment.id} className="flex gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={getMediaSource(comment.author?.avatar)}
          alt={comment.author?.username || "User"}
        />
        <AvatarFallback>
          {(comment.author?.username || "U").substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="w-full flex rounded-lg bg-muted p-2">
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-3/4 items-start justify-between">
            <p className="text-xs font-medium">
              {comment.author?.displayName ||
                comment.author?.username ||
                "User"}
            </p>
            <p className="mt-1 text-sm">{comment.content}</p>
          </div>
          <div className="gap-2 flex flex-col items-end justify-between">
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </p>
            {comment.author?.id === currentUserId && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontalIcon className="h-4 w-4 mt-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[230px]">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowEditDialog(true)}
                    disabled={isUpdatingComment}
                  >
                    <DropdownMenuItem>
                      <PencilIcon className="h-4 w-4" />
                      {t("editComment")}
                    </DropdownMenuItem>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      deleteComment().then(() => {
                        onRemoveComment(comment.id);
                      });
                    }}
                    disabled={isDeletingComment}
                  >
                    <DropdownMenuItem>
                      <Trash2Icon className="h-4 w-4" />
                      {t("deleteComment")}
                    </DropdownMenuItem>
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        {showEditDialog && (
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("editComment")}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <Textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="resize-x-none"
                />
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowEditDialog(false)}
                >
                  {commonT("cancel")}
                </Button>
                <Button variant="default" onClick={() => handleUpdateComment()}>
                  {commonT("save")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
