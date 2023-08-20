// Extract classes/interfaces with the @Mockable decorator
import {getMockableDeclarations, hasMockableDecorator} from "../index";
import * as fs from "fs";
import * as ts from "typescript";
import {isClassDeclaration} from "typescript";
const filePath = './input/data.ts';
const sourceCode = fs.readFileSync(filePath, 'utf-8');

const sourceFile = ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.Latest,
    true
);
const mockableDeclarations = getMockableDeclarations(sourceFile);
mockableDeclarations.forEach((declaration) => {
    console.log(isClassDeclaration(declaration));
});
