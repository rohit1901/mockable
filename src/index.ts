import {
  isClassDeclaration,
  isInterfaceDeclaration,
  SourceFile,
  Statement,
} from 'typescript';

import { isMockable } from './decorator';

export * from './decorator';
export * from './generator/mockGenerator';

export function hasMockableDecorator(node: Statement): boolean {
  if (isClassDeclaration(node) || isInterfaceDeclaration(node)) {
    return isMockable(node);
  }
  return false;
}

export function getMockableDeclarations(sourceFile: SourceFile): Statement[] {
  return sourceFile.statements.filter(hasMockableDecorator);
}
