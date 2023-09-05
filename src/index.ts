import {
  isClassDeclaration,
  isInterfaceDeclaration,
  SourceFile,
  Statement,
} from 'typescript';

import { isMockable } from './decorator';

// Helper function to check if a node has the @Mockable decorator
export function hasMockableDecorator(node: Statement): boolean {
  if (isClassDeclaration(node) || isInterfaceDeclaration(node)) {
    return isMockable(node);
  }
  return false;
}
export function getMockableDeclarations(sourceFile: SourceFile): Statement[] {
  return sourceFile.statements.filter(hasMockableDecorator);
}
