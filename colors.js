import { Color } from './helpers/Color.js';
import { writeToStylesheet } from './helpers/funcs.js';
import fs from 'fs';

const targetNodeName = 'Colors';

const findColorsNode = node => {
  if (node.name === targetNodeName) {
    return node;
  } else if (node.children && node.children.length) {
    for (const childNode of node.children) {
      const result = findColorsNode(childNode);
      if (result != null && result.name === targetNodeName) {
        return result;
      }
    }
  }
  return null;
}

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
  writeToStylesheet(colorVarDeclarations);
  console.log(colorVarDeclarations);
}