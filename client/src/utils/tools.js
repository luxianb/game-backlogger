export function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  return `rgb(${r}, ${g}, ${b})`;
}

export function checkUrl(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  if (request.status === 200) {
    return true;
  }
  return false;
}
