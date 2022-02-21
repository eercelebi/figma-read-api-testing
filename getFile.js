/**
 * Tests getting data from Figma Starter File
 * Link: https://www.figma.com/file/q4YoY6r8pGRTuDu9GL4A02/Starter-1.0?node-id=1097%3A20128
 */
import { BASE_URL } from './helpers/constants.js';
import { ACCESS_TOKEN } from './token.js';
import fetch from 'node-fetch';
import { getFileId } from './helpers/funcs.js';

export const getFile = async projectUrl => {
  const fileKey = getFileId(projectUrl);
  const requestUrl = `${BASE_URL}/v1/files/${fileKey}`;
  const options = {
    'method': 'GET',
    'headers': {
      'X-Figma-Token': ACCESS_TOKEN
    }
  }

  const response = await fetch(requestUrl, options);
  const data = await response.json();

  return data;
}
