"use client";

import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import { Button } from "@/components/ui/shadcn/Button";
import { Heading } from "@/components/ui/items/Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/Card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { Input } from "@/components/ui/shadcn/Input";
import { Textarea } from "@/components/ui/shadcn/Textarea";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  Filter,
  TrendingUp,
  Clock,
  Users,
  Image as ImageIcon,
  X,
  Loader,
} from "lucide-react";
import { toast } from "sonner";
import { useCurrent } from "@/hooks/useCurrent";
import { useAuth } from "@/hooks/useAuth";
import { getMediaSource } from "@/utils/get-media-source";
import { format } from "date-fns";
import {
  useCreatePostMutation,
  useFindPostsQuery,
  useToggleLikeMutation,
  useCreateCommentMutation,
  usePostCreatedSubscription,
  PostModel,
  PostFiltersInput,
  PostSortInput,
  CommentModel,
} from "@/graphql/generated/output";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/DropdownMenu";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/shadcn/Dialog";
import { Label } from "@/components/ui/shadcn/Label";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { PostCard } from "./PostCard";

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const { isAuthenticated } = useAuth();
  const { user } = useCurrent();
  const [postContent, setPostContent] = useState("");
  const [showCommentInput, setShowCommentInput] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<PostFiltersInput>({});
  const [sort, setSort] = useState<PostSortInput>({ latestFirst: true });
  const [isLiking, setIsLiking] = useState<string | null>(null);
  const [isCommenting, setIsCommenting] = useState<string | null>(null);

  // Запрос на получение постов
  const {
    data: postsData,
    loading: loadingPosts,
    error: postsError,
    refetch: refetchPosts,
  } = useFindPostsQuery({
    variables: {
      filters,
      sort,
      skip: 0,
      take: 20,
    },
    fetchPolicy: "network-only",
  });

  // Мутация для создания поста
  const [createPost, { loading: isCreatingPost }] = useCreatePostMutation({
    onCompleted: () => {
      setPostContent("");
      toast.success("Post created successfully!");
      refetchPosts();
    },
    onError: (error) => {
      toast.error(`Failed to create post: ${error.message}`);
    },
  });

  // Мутация для лайка/дизлайка
  const [toggleLike] = useToggleLikeMutation({
    onError: (error) => {
      toast.error(`Failed to toggle like: ${error.message}`);
    },
  });

  // Мутация для создания комментария
  const [createComment, { loading: isCreatingComment }] =
    useCreateCommentMutation({
      onCompleted: () => {
        setCommentContent("");
        setShowCommentInput(null);
        toast.success("Comment added successfully!");
        refetchPosts();
      },
      onError: (error) => {
        toast.error(`Failed to add comment: ${error.message}`);
      },
    });

  // Подписка на новые посты
  const { data: newPostData } = usePostCreatedSubscription();

  useEffect(() => {
    if (newPostData?.postCreated) {
      // Обновляем данные после получения нового поста через подписку
      refetchPosts();
    }
  }, [newPostData, refetchPosts]);

  // Обработчик для создания поста
  const handleCreatePost = async () => {
    if (!postContent.trim()) return;

    try {
      await createPost({
        variables: {
          input: {
            content: postContent,
            isPublic: true,
          },
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Обработчик для лайка/дизлайка
  const handleToggleLike = async (postId: string) => {
    setIsLiking(postId);
    try {
      await toggleLike({
        variables: {
          input: {
            postId,
          },
        },
      });
      refetchPosts();
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLiking(null);
    }
  };

  // Обработчик для создания комментария
  const handleCreateComment = async (
    postId: string,
    content: string
  ): Promise<any> => {
    setIsCommenting(postId);
    try {
      const comment = await createComment({
        variables: {
          input: {
            postId,
            content,
          },
        },
      });
      refetchPosts();
      return comment.data?.createComment;
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsCommenting(null);
    }
  };

  // Обработчик для смены фильтров
  const handleFilterChange = (newFilters: PostFiltersInput) => {
    setFilters(newFilters);
    setIsFilterDialogOpen(false);
  };

  // Обработчик для смены сортировки
  const handleSortChange = (newSort: PostSortInput) => {
    setSort(newSort);
  };

  // Отфильтрованные посты в зависимости от активной вкладки
  const getFilteredPosts = () => {
    const posts = postsData?.findPosts || [];

    if (activeTab === "trending") {
      // Для "trending" используем сортировку по лайкам
      return [...posts].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
    }

    if (activeTab === "following" && user) {
      // Для "following" отфильтровываем посты от подписок
      // Здесь должна быть логика фильтрации по подпискам
      return posts.filter((post) => post.author.id !== user.id); // Временная логика
    }

    return posts;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 flex items-center justify-between">
        <Heading
          title="Nokurami Community"
          description="Connect with streamers and other viewers"
          size="lg"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <Tabs
            defaultValue="posts"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="mb-6 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterDialogOpen(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleSortChange({ latestFirst: true })}
                    >
                      Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSortChange({ latestFirst: false })}
                    >
                      Oldest First
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="posts" className="space-y-6">
              {/* Create Post Card */}
              {isAuthenticated && (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={getMediaSource(user?.avatar)} />
                        <AvatarFallback>
                          {user?.displayName?.[0] || user?.username?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="What's on your mind?"
                          className="min-h-[100px] resize-none"
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={handleCreatePost}
                      disabled={isCreatingPost || !postContent.trim()}
                    >
                      {isCreatingPost ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        "Post"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Posts List */}
              {loadingPosts ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-20 w-full mb-4" />
                        <Skeleton className="h-40 w-full" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-8 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : postsError ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-red-500">
                      <p>Error loading posts: {postsError.message}</p>
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => refetchPosts()}
                      >
                        Retry
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : getFilteredPosts().length === 0 ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                      <p>No posts found. Be the first to create a post!</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                getFilteredPosts().map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={user?.id || ""}
                    onLike={handleToggleLike}
                    onComment={handleCreateComment}
                    isLiking={isLiking === post.id}
                    isCommenting={isCommenting === post.id}
                    refetchPosts={() => refetchPosts()}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              {loadingPosts ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-20 w-full mb-4" />
                        <Skeleton className="h-40 w-full" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-8 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : getFilteredPosts().length === 0 ? (
                <div className="flex items-center justify-center p-12 text-muted-foreground">
                  <p>No trending posts found</p>
                </div>
              ) : (
                getFilteredPosts().map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={user?.id || ""}
                    onLike={handleToggleLike}
                    onComment={handleCreateComment}
                    isLiking={isLiking === post.id}
                    isCommenting={isCommenting === post.id}
                    refetchPosts={() => refetchPosts()}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="following" className="space-y-6">
              {!isAuthenticated ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="mb-4 text-muted-foreground">
                        Sign in to see posts from streamers you follow
                      </p>
                      <Button asChild>
                        <Link href="/account/login">Sign In</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : loadingPosts ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-20 w-full mb-4" />
                        <Skeleton className="h-40 w-full" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-8 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : getFilteredPosts().length === 0 ? (
                <div className="flex items-center justify-center p-12 text-muted-foreground">
                  <p>
                    You don't follow any streamers or they haven't posted yet
                  </p>
                </div>
              ) : (
                getFilteredPosts().map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={user?.id || ""}
                    onLike={handleToggleLike}
                    onComment={handleCreateComment}
                    isLiking={isLiking === post.id}
                    isCommenting={isCommenting === post.id}
                    refetchPosts={() => refetchPosts()}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Posts</DialogTitle>
            <DialogDescription>
              Customize what posts you want to see
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="searchTerm">Search in posts</Label>
              <Input
                id="searchTerm"
                placeholder="Search by content"
                value={filters.searchTerm || ""}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
              />
            </div>

            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="followingOnly"
                  checked={filters.followingOnly || false}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      followingOnly: e.target.checked,
                      userId: user?.id,
                    })
                  }
                  className="rounded border-gray-300"
                />
                <Label htmlFor="followingOnly">
                  Show only posts from users I follow
                </Label>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setFilters({})}>
              Reset Filters
            </Button>
            <Button onClick={() => handleFilterChange(filters)}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
