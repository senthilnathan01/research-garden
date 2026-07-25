export function sourceUrlForPage(filePath?: string) {
  if (!filePath) return "https://github.com/senthilnathan01/research-garden"
  const normalizedPath = filePath.replaceAll("\\", "/").replace(/^.*?content\//, "content/")
  return `https://github.com/senthilnathan01/research-garden/blob/main/${normalizedPath}`
}
