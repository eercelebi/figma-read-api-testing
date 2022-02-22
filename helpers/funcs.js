import fs from 'fs';

export const getFileId = (url) => {
  const stripped = url.replace('https://www.figma.com/file/', '');
  return stripped.substring(0, stripped.indexOf('/'));
}

export const writeToStylesheet = async (filePath, lines, commentHeader = '') => {

  fs.writeFileSync(filePath, '');

  if (commentHeader) {
    fs.appendFileSync(filePath, `// ${commentHeader}\n`);
  }

  lines.forEach(line => {
    fs.appendFileSync(filePath, `${line}\n`);
  });
}

/**
 * Finds node with target name via DFS through Figma JSON
 * @param  {Object} node
 * @param  {String} targetNodeName
 * @returns {Object} node with target name attribute, null otherwise 
 */
export const findNode = (node, targetNodeName) => {
  if (node.name === targetNodeName) {
    return node;
  } else if (node.children && node.children.length) {
    for (const childNode of node.children) {
      const result = findNode(childNode, targetNodeName);
      if (result != null && result.name === targetNodeName) {
        return result;
      }
    }
  }
  return null;
}