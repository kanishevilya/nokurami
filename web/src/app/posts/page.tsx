"use client";

import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/shadcn/Tabs";
import { Button } from "@/components/ui/shadcn/Button";
import { Card, CardContent } from "@/components/ui/shadcn/Card";
import { Input } from "@/components/ui/shadcn/Input";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import {
  User,
  MessageSquare,
  Heart,
  Search,
  Filter,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { useCurrent } from "@/hooks/useCurrent";

export default function CommunityPage() {
  const { user, isLoadingProfile } = useCurrent();
  const [activeTab, setActiveTab] = useState("posts");
  const [searchTerm, setSearchTerm] = useState("");

  // Добавим заглушки данных, позже их нужно будет заменить на настоящие данные из GraphQL
  const posts = [
    {
      id: "1",
      content:
        "Just finished a 6-hour stream! Thanks everyone who joined, we had a great time playing Elden Ring!",
      author: {
        id: "1",
        username: "NightStreamer",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
      likeCount: 24,
      commentCount: 5,
      createdAt: new Date("2023-05-10T14:00:00"),
    },
    {
      id: "2",
      content:
        "New streaming setup is ready! Check it out, streaming tonight at 8PM EST!",
      imageUrl:
        "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGdhbWluZyUyMHNldHVwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      author: {
        id: "2",
        username: "TechGuru",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
      },
      likeCount: 56,
      commentCount: 12,
      createdAt: new Date("2023-05-09T09:30:00"),
    },
    {
      id: "3",
      content:
        "What games would you like to see me stream next? Drop your suggestions in the comments!",
      author: {
        id: "3",
        username: "GameMaster",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
      },
      likeCount: 18,
      commentCount: 42,
      createdAt: new Date("2023-05-08T16:45:00"),
    },
  ];

  // Скелеты для загрузки
  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <Card key={i} className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="ml-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex justify-between">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </CardContent>
        </Card>
      ));
  };

  // Рендер поста
  const renderPost = (post: any) => (
    <Card key={post.id} className="mb-4 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden relative">
            <Image
              src={post.author.avatarUrl}
              alt={post.author.username}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="font-semibold text-sm">{post.author.username}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(post.createdAt), "MMM d, yyyy • HH:mm")}
            </p>
          </div>
        </div>
        <p className="mb-3">{post.content}</p>
        {post.imageUrl && (
          <div className="relative w-full h-64 mb-3 rounded-md overflow-hidden">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex justify-between mt-2">
          <Button variant="ghost" size="sm" className="gap-1">
            <Heart className="w-4 h-4" />
            <span>{post.likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{post.commentCount}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container max-w-5xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Nokurami Community</h1>
        <p className="text-muted-foreground">
          Connect with streamers and other viewers
        </p>
      </div>

      <div className="flex mb-4 gap-4">
        <div className="flex-1">
          <Search className="w-4 h-4 mr-2 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="posts" className="gap-1">
            <MessageSquare className="w-4 h-4" /> Posts
          </TabsTrigger>
          <TabsTrigger value="trending" className="gap-1">
            <TrendingUp className="w-4 h-4" /> Trending
          </TabsTrigger>
          <TabsTrigger value="following" className="gap-1">
            <Users className="w-4 h-4" /> Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {user && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="ml-3 flex-1">
                    <Input
                      placeholder="Share your thoughts..."
                      className="border-none shadow-none focus-visible:ring-0 px-0"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button size="sm">Post</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {posts.map(renderPost)}
        </TabsContent>

        <TabsContent value="trending">
          <div className="space-y-4">
            {posts.sort((a, b) => b.likeCount - a.likeCount).map(renderPost)}
          </div>
        </TabsContent>

        <TabsContent value="following">
          {isLoadingProfile ? (
            renderSkeletons()
          ) : user ? (
            <div className="space-y-4">
              {posts.filter((post) => post.id === "2").map(renderPost)}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Sign in to see posts from streamers you follow
                </h3>
                <p className="text-muted-foreground mb-4">
                  Follow your favorite streamers to customize your feed
                </p>
                <Button>Sign In</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
