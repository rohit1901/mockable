import {
  ClassDeclaration,
  InterfaceDeclaration,
  isDecorator,
} from "typescript";

// Key to store metadata
const MOCKABLE_KEY = "MOCKABLE";

export function Mockable(constructor: Function) {
  constructor.prototype[MOCKABLE_KEY] = MOCKABLE_KEY;
  console.log(constructor.name, constructor.prototype[MOCKABLE_KEY]);
}

export const isMockable = (
  target: ClassDeclaration | InterfaceDeclaration,
): boolean => {
  return (
    target.modifiers &&
    target.modifiers.some((modifier) => {
      return isDecorator(modifier);
      // && modifier.expression.getText() === 'Mockable';
    })
  );
};
