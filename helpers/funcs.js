import fs from 'fs';
import { COLOR_STYLESHEET_PATH } from './constants.js';

export const getFileId = (url) => {
  const stripped = url.replace('https://www.figma.com/file/', '');
  return stripped.substring(0, stripped.indexOf('/'));
}

export const writeToStylesheet = (lines, commentHeader = '') => {
  if (commentHeader) {
    fs.appendFileSync(STYLESHEET_PATH, `${commentHeader}\n`);
  }

  lines.forEach(line => {
    fs.appendFileSync(COLOR_STYLESHEET_PATH, `${line}\n`);
  });
}