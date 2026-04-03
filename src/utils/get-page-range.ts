export function getPageRange(
  current: number,
  total: number,
  siblings: number
) {
  const range: (number | 'ellipsis')[] = [];

  const leftSibling = Math.max(current - siblings, 2);
  const rightSibling = Math.min(current + siblings, total - 1);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  range.push(1);

  if (showLeftEllipsis) {
    range.push('ellipsis');
  } else {
    for (let i = 2; i < leftSibling; i++) {
      range.push(i);
    }
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    range.push(i);
  }

  if (showRightEllipsis) {
    range.push('ellipsis');
  } else {
    for (let i = rightSibling + 1; i < total; i++) {
      range.push(i);
    }
  }

  if (total > 1) {
    range.push(total);
  }

  return range;
}
