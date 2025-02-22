export function getMediaSource(path: string | null | undefined): string | undefined {
  return (process.env.NEXT_PUBLIC_MEDIA_URL as string) + path;
} 