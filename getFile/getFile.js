/**
 * Tests getting data from Figma Starter File
 * Link: https://www.figma.com/file/q4YoY6r8pGRTuDu9GL4A02/Starter-1.0?node-id=1097%3A20128
 */
import { BASE_URL } from '../constants.js';
import { ACCESS_TOKEN } from '../token.js';
import fetch from 'node-fetch';
import { getFileId } from '../helpers.js';
import fs from 'fs';

const run = async () => {
  const projectUrl = 'https://www.figma.com/file/q4YoY6r8pGRTuDu9GL4A02/Starter-1.0?node-id=1097%3A20128';
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

  fs.writeFileSync('./getFile/sample_data.json', JSON.stringify(data, null, 2));
  return data;
}

export default run;

run();

