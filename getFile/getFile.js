/**
 * Tests getting data from Essilor's figma design
 * Link: https://www.figma.com/file/1cqNDexlt1vyTyqm9MormN/Essilor-of-America-1.0
 */
import { BASE_URL } from '../constants.js';
import { ACCESS_TOKEN } from '../token.js';
import fetch from 'node-fetch';

const run = async () => {
  const fileKey = '1cqNDexlt1vyTyqm9MormN'; // obtained from figma file url
  const requestUrl = `${BASE_URL}/v1/files/${fileKey}`;
  const options = {
    'method': 'GET',
    'headers': {
      'X-Figma-Token': ACCESS_TOKEN
    }
  }

  const response = await fetch(requestUrl, options);
  const json = await response.json();

  console.log(json);
}

run();

