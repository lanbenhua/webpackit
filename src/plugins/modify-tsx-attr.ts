import {
  Node,
  TransformerFactory,
  TransformationContext,
  Visitor,
  isJsxAttribute,
  visitEachChild,
  visitNode,
} from 'typescript';

const convertStr2Stringify = (str: string): string => {
  try {
    const regStr = str
      .match(/\{\{.*\}\}/g)?.[0]
      ?.slice(2, -2)
      ?.split(',')
      .map((el) =>
        el
          .split(':')
          .map((keyVal) => `"${keyVal.trim().replace(/'/g, '')}"`)
          .join(':')
      )
      .join();

    if (!regStr) return;

    const jsonStr = `{${regStr}}`;
    console.log('[debug] transform success:', JSON.parse(jsonStr));

    return jsonStr;
  } catch {
    console.error('[ts transform]:', str);
    return;
  }
};

export const modifyJsxAttributesTransformer = <T extends Node>(
  attributes: string[]
): TransformerFactory<T> => {
  return (context: TransformationContext): ((node: T) => T) => {
    const visitor: Visitor = (node: Node): Node | undefined => {
      if (isJsxAttribute(node) && attributes.includes(node.name.getText())) {
        const text = convertStr2Stringify(node.getText());

        if (!text) return node;

        return context.factory.updateJsxAttribute(
          node,
          node.name,
          context.factory.createStringLiteral(text, true)
        );
      }

      return visitEachChild(node, visitor, context);
    };

    return (node: T): T => visitNode(node, visitor);
  };
};
