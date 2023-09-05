import 'reflect-metadata';

import {
  ClassDeclaration,
  InterfaceDeclaration,
  isCallExpression,
  isDecorator,
} from 'typescript';

// Key to store metadata
const MOCKABLE_KEY = 'MOCKABLE';

/**
 * Decorator to mark a class as mockable
 * @param metadata - Metadata to be stored
 * @constructor - Decorator function
 */
export function Mockable(metadata: any) {
  return function (target: Function) {
    Reflect.defineMetadata('mockableMetadata', MOCKABLE_KEY, target);
  };
}

/**
 * Typeguard to check if a node has the @Mockable decorator
 * @param target - The node to check. Can be a ClassDeclaration or an InterfaceDeclaration.
 */
export const isMockable = (
  target: ClassDeclaration | InterfaceDeclaration,
): boolean => {
  return (
    target.modifiers &&
    target.modifiers.some(modifier => {
      return (
        isDecorator(modifier) &&
        isCallExpression(modifier.expression) &&
        modifier.expression.expression.getText() === 'Mockable'
      );
    })
  );
};
