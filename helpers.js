export const getFileId = (url) => {
  const stripped = url.replace('https://www.figma.com/file/', '');
  return stripped.substring(0, stripped.indexOf('/'));
}