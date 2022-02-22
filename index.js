import { getFile } from './getFile.js';
import { getColors } from './colors.js'
import { getHeadings } from './headings.js';

const run = async () => {
  const projectUrl = 'https://www.figma.com/file/QuvDORrQmKWi0z6VsFjLQ4/Figma-API-Playground';

  const data = await getFile(projectUrl);
  getColors(data);
  getHeadings(data);
}

run();
