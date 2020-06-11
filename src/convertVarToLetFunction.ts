import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

export function convertVarToLetFunction(code: string): string {
    const ast = parse(code, {      
        plugins: [
          "typescript"
		]});
	traverse(ast, {
        VariableDeclaration(path) {
            if(path.node.kind === "var"){
                path.node.kind = "let"; 
            }
       }
	});
	return generate(ast).code;
}
