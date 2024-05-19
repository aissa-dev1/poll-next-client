export function useTitle(title: string): string {
  document.title = title;
  return title;
}
