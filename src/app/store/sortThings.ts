export function sortThings(cur, next) {
  if (cur.rating === next.rating) {
    if (cur.name > next.name) { return 1; }

    if (cur.name < next.name) { return -1; }

    return 0;
  }

  if (cur.rating > next.rating) { return -1; }

  return 1;
}
