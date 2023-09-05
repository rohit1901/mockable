import * as fs from "fs";
import * as ts from "typescript";
import {
  ClassDeclaration,
  InterfaceDeclaration,
  isClassDeclaration,
  isInterfaceDeclaration,
  isMethodDeclaration
} from "typescript";

import {getMockableDeclarations} from "../index";
import {
  createPath,
  defaultInputDir,
  defaultOutputDir,
  defaultServiceMocksFilePath, defaultServicesFileName, defaultServicesFilePath,
  deleteFileIfExists,
  generateServicesFile
} from "../utils";

/**
 * Returns the names of the methods of the given class declaration as an array of strings.
 * @param target - The ClassDeclaration to get the methods of.
 */
const getMethods = (target: ClassDeclaration) => {
  return target.members.filter(isMethodDeclaration).map((method) => method.getText());
};
/**
 * Builds the Jest mock for the given class declaration.
 * @param classDeclaration - The ClassDeclaration to build the Jest mock for.
 */
const buildJestServiceWrapper = (classDeclaration: ClassDeclaration) => {
  // Create a Jest mock for the service class
  return `export const ${classDeclaration.name.getText()}Mock = jest.mock('${classDeclaration.name.getText()}', () => {
    return {
      __esModule: true,
      default: jest.fn(() => ({
        ${getMethods(classDeclaration).map((method) => `${method},`).join("\n")}
      })),
    };
  });`;
};

/**
 * Returns the names of the given objects (which can be interfaces, types, or enums) as an array of strings.
 * @example
 * ['User', 'Car', 'UserService']
 * @param interfaceObjects - Array of interfaces of type InterfaceDeclaration
 * @param classObjects - Array of classes of type ClassDeclaration
 */
const getObjectsNames = (
    interfaceObjects: InterfaceDeclaration[],
    classObjects: ClassDeclaration[],
) => {
  const interfaceNames = interfaceObjects.map(object => object.name.getText());
  const classNames = classObjects.map(object => object.name.getText());
  return [...interfaceNames, ...classNames];
}

/**
 * Generates the import statement for the given objects and path.
 * If no path is provided, the default path is used. (defaults to '../input/combinedServices')
 * @example
 * import {User, Car} from '../input/combinedServices'
 * @param objects
 */
const generateImports = (objects: string[]) => {
  return `import {${objects.join(
      ',',
  )}} from '../${defaultInputDir}${defaultServicesFileName}'`;
}

/**
 * Returns the import statement for the given objects and path. If no path is provided, the default path is used.
 * @param objects - Objects to generate the import statement for
 */
const getImports = (objects: string[]) => {
  return objects.length > 0 ? generateImports(objects) : '';
}

export const generateMocks = (inputString?: string) => {
  const filePath = "./input/data.ts";
  const sourceCode = fs.readFileSync(filePath, "utf-8");

  const sourceFile = ts.createSourceFile(
      filePath,
      sourceCode,
      ts.ScriptTarget.Latest,
      true,
  );
  const interfaces: InterfaceDeclaration[] = sourceFile.statements.filter(isInterfaceDeclaration);
  const classes: ClassDeclaration[] = sourceFile.statements.filter(isClassDeclaration);
  createPath(`./${defaultInputDir}`);
  deleteFileIfExists(defaultServicesFilePath,);
  const combinedInputText = sourceFile.statements.filter((statement) => isClassDeclaration(statement) || isInterfaceDeclaration(statement)).map(declaration => declaration.getText()).join("\n");
  generateServicesFile(`${buildImports()}\n${combinedInputText}`, true, 'input');
  const generatedServices: string[] = [];
  const mockableDeclarations = getMockableDeclarations(sourceFile);
  mockableDeclarations.filter(isClassDeclaration).forEach((declaration) => {
    generatedServices.push(buildJestServiceWrapper(declaration))
  });
  const res = generatedServices.join("\n");
  createPath(`./${defaultOutputDir}`);
  deleteFileIfExists(defaultServiceMocksFilePath);
  generateServicesFile(`${getImports(
      getObjectsNames(interfaces, classes),
  )}\n${res}`);
}
/**
 * Builds the import statement for the mockable decorator.
 * @param asDependency - If true, the import statement will be from the mockable package imported using npm otherwise it will be from the local file.
 */
const buildImports = (asDependency: boolean = false) => {
  const path = asDependency ? 'mockable/lib/decorator' : '../lib/decorator'
  return `import {Mockable} from "${path}"`
};