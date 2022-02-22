import { findNode, writeToStylesheet } from './helpers/funcs.js';
import fs from 'fs';
import { HEADING_STYLESHEET_PATH } from './helpers/constants.js';

const targetNodeName = '#Heading';

// used for converting style attributes as they come from Figma to CSS attributes
// only contains styles we are interested in extracting from Figma node object
// (e.g. excludes unnecessary position attributes like 'top', 'left', etc)
const attributeAdapter = {
  'fontFamily': 'font-family',
  'fontWeight': 'font-weight',
  'fontSize': 'font-size',
  'letterSpacing': 'letter-spacing',
  'lineHeightPx': 'line-height',
}

// Style attributes that should have 'px' appended
const pxAttributes = [
  'fontSize',
  'letterSpacing',
  'lineHeightPx'
]

const findHeadingsNode = node => findNode(node, targetNodeName);

/**
 * each of the Headings Node's children is a 'Row' with two children
 * 1. A text component with desktop styles
 * 2. A text component with mobile styles
 * The name of these text components is in the format "Lead/D" or "Head/P"
 * where the 'D' and 'P' will be used to determine if this is mobile or desktop styles
 * @param  {Object} node
 * @returns {Object} heading styles organized by modifier & version (desktop/mobile)
 */
const buildHeadingStyles = (node) => {
  const headingStyles = {};
  for (const row of node.children) {
    if (!row.children || row.children.length != 2) {
      continue;
    }

    for (const child of row.children) {
      const { name, style } = child;
      const parts = name.split('/');
      const modifier = parts[0].toLowerCase();
      const version = parts[1] === 'D' ? 'desktop' : 'mobile';

      if (!headingStyles[modifier]) {
        headingStyles[modifier] = {};
      }
      const versionStyles = {};
      for (const attribute in style) {
        if (attributeAdapter[attribute]) {
          let value;
          if (typeof(style[attribute]) == 'number') {
            if (pxAttributes.includes(attribute)) {
              value = `${style[attribute]}px`;
            } else {
              value = `${style[attribute]}`;
            }
          } else { // string type
            value = `'${style[attribute]}'`;
          }
          versionStyles[attributeAdapter[attribute]] = value;
        }
      }
      headingStyles[modifier][version] = versionStyles;
    }
  }
  return headingStyles;
}

const buildHeadingCssLines = headingStyles => {
  const lines = [];
  for (const modifier in headingStyles) {
    lines.push(`.Heading--${modifier}`);
    lines.push('{');

    // handle mobile styles at top level of selector
    for (const attribute in headingStyles[modifier]['mobile']) {
      lines.push(`\t${attribute}: ${headingStyles[modifier]['mobile'][attribute]};`);
    }

    // handle desktop selectors in bpgte() (or some other media query we want)
    lines.push('\n\t@include bpgte($desktop-bp-min)');
    lines.push('\t{');
    for (const attribute in headingStyles[modifier]['desktop']) {
      lines.push(`\t\t${attribute}: ${headingStyles[modifier]['desktop'][attribute]};`);
    }
    lines.push('\t}');
    lines.push('}\n');
  }
  return lines;
}

export const getHeadings = data => {
  const headingsNode = findHeadingsNode(data.document);
  if (!headingsNode) {
    return;
  }

  const headingStyles = buildHeadingStyles(headingsNode);
  const lines = buildHeadingCssLines(headingStyles);
  writeToStylesheet(HEADING_STYLESHEET_PATH, lines, 'Heading classes');
}