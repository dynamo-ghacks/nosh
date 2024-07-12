export function filterTags(userTags: string[], destTags: string[]) {
  const tags: { tag: string; highlight: boolean }[] = [];

  (destTags ?? []).forEach((tag) => {
    tags.push({
      tag,
      highlight: (userTags ?? []).includes(tag),
    });
  });

  return tags.sort((a, b) => {
    if (a.highlight && b.highlight) return 0;
    if (a.highlight) return -1;
    return 1;
  });
}
