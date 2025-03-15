"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { toast } from "sonner";

import { FormWrapper } from "@/components/ui/items/FormWrapper";
import {
  useFindSocialLinksQuery,
  useReorderSocialLinksMutation,
} from "@/graphql/generated/output";
import { SocialLinkItem } from "./SocailLinkItem";

export function SocialLinksList() {
  const { data, loading, refetch } = useFindSocialLinksQuery();
  const [links, setLinks] = useState(data?.findSocialLinks || []);

  const [reorderSocialLinks, { loading: isReordering }] =
    useReorderSocialLinksMutation({
      onError(error) {
        toast.error(`Error reordering links: ${error.message}`);
      },
    });

  const sensors = useSensors(useSensor(PointerSensor));

  
  useEffect(() => {
    if (data?.findSocialLinks) {
      setLinks(data.findSocialLinks);
    }
  }, [data]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLinks((prevLinks) => {
        const oldIndex = prevLinks.findIndex((link) => link.id === active.id);
        const newIndex = prevLinks.findIndex((link) => link.id === over.id);
        const newLinks = arrayMove(prevLinks, oldIndex, newIndex);

        
        reorderSocialLinks({
          variables: {
            input: newLinks.map((link, index) => ({
              id: link.id,
              position: index,
            })),
          },
        });

        return newLinks;
      });
    }
  };

  return loading ? (
    <div className="pace-y-4">
      <div className="h-10 w-full bg-gray-300 rounded" />
      <div className="h-10 w-full bg-gray-300 rounded" />
    </div>
  ) : links.length === 0 ? (
    <p className="text-muted-foreground">No social links added yet.</p>
  ) : (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={links.map((link) => link.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {links.map((link) => (
            <SocialLinkItem key={link.id} link={link} refetch={refetch} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
