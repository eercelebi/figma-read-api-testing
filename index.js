import { getFile } from './getFile.js';
import { getColors } from './colors.js'

const run = async () => {
  const projectUrl = 'https://www.figma.com/file/q4YoY6r8pGRTuDu9GL4A02/Starter-1.0?node-id=1097%3A20128';

  const data = await getFile(projectUrl);
  getColors(data);
}

run();
