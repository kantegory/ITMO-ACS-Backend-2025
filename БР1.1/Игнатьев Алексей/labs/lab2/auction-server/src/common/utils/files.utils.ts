export function getImageUrl(
  fileName: string,
  bucket: string,
  endpoint: string,
): string {
  return `${endpoint}/${bucket}/${fileName}`;
}
