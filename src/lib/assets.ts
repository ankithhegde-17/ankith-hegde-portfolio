/** Display optimized derivatives; original assets stay available at their URLs. */
export function optimizedImage(source: string): string {
  if (!source.startsWith("/assets/") || source.includes("/optimized/"))
    return source;
  return source
    .replace("/assets/", "/assets/optimized/")
    .replace(/\.(png|jpe?g)$/i, ".webp");
}
