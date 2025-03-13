"use client";

import { useState } from "react";
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
} from "lucide-react";

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 flex items-center justify-between">
        <Heading
          title="Nokurami Community"
          description="Connect with streamers and other viewers"
          size="lg"
        />
        <Button>Create Post</Button>
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
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </div>
            </div>

            <TabsContent value="posts" className="space-y-6">
              {/* Create Post Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="What's on your mind?"
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Add Image
                    </Button>
                    <Button variant="outline" size="sm">
                      Tag Streamer
                    </Button>
                  </div>
                  <Button>Post</Button>
                </CardFooter>
              </Card>

              {/* Sample Posts */}
              {Array.from({ length: 3 }).map((_, i) => (
                <PostCard key={i} />
              ))}
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                <p>Trending posts will appear here in Stage 2</p>
              </div>
            </TabsContent>

            <TabsContent value="following" className="space-y-6">
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                <p>Posts from followed streamers will appear here in Stage 2</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-1 space-y-6 lg:col-span-4">
          {/* Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Streamers</CardTitle>
              <CardDescription>Connect with top streamers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/placeholder-user-${i + 1}.jpg`} />
                    <AvatarFallback>S{i + 1}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Streamer {i + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      10K followers
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Don't miss these streams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Tomorrow, 8:00 PM</p>
                  </div>
                  <p className="text-sm">
                    Special Stream with Streamer {i + 1}
                  </p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      1.2K interested
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PostCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">Username</CardTitle>
            <CardDescription>Posted 2 hours ago</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Just finished an amazing stream! Thanks to everyone who joined. What
          games would you like to see next time?
        </p>
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Stream Highlight Image
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span>124</span>
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="mr-1 h-4 w-4" />
              <span>23</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-1 h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
