import { Color } from './helpers/Color.js';
import { findNode, writeToStylesheet } from './helpers/funcs.js';
import { COLOR_STYLESHEET_PATH } from './helpers/constants.js';

const targetNodeName = 'Colors';

const findColorsNode = node => findNode(node, targetNodeName);

const getColorInstances = (node, instances=[]) => {
  if (node.name === 'Color' && node.type === 'INSTANCE') {
    instances.push(node);
  } else {
    node.children.forEach( childNode => getColorInstances(childNode, instances));
  }
  return instances;
}

const getColorVarDeclarations = instances => {
  const colorVarDeclarations = [];
  instances.forEach(instance => {
    // our color instances have two children: a rectangle with the target color as its
    // background color, and a text element with the color's name
    let name;
    let hex;
    instance.children.forEach( child => {
      if (child.type === 'TEXT') {
        name = `$brand-${child.characters.replace(/\s+/g, '-').toLowerCase()}`;
      } else if (child.type === 'RECTANGLE') {
        const color = new Color(child);
        hex = color.hex;
      }
    });

    colorVarDeclarations.push(`${name}: ${hex};`);
  });
  return colorVarDeclarations;
}

export const getColors = data => {
  const colorNode = findColorsNode(data.document);
  const colorInstances = getColorInstances(colorNode);
  const colorVarDeclarations = getColorVarDeclarations(colorInstances);
  writeToStylesheet(COLOR_STYLESHEET_PATH, colorVarDeclarations, 'Color variables');
  console.log(colorVarDeclarations);
}