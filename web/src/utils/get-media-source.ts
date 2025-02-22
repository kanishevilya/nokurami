export function getMediaSource(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  return path.startsWith('http') ? path : `/media/${path}`;
} 