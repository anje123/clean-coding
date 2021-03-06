import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';



export function transform(code: string): string {
	const ast = parse(code, {      
        plugins: [
          "typescript"
		]});

			traverse(ast, {
		FunctionDeclaration(path){
			path.replaceWith(toArrowFunction(path.node));
		}
	});
	return generate(ast).code;
}

 function toArrowFunction(node: t.FunctionDeclaration): t.VariableDeclaration {
	 const name = node.id ? node.id.name : "converted";
	 const identifier = t.identifier(name);
     const arrowFunction = t.arrowFunctionExpression(
         node.params,
         node.body,
         node.async
     );
 
     const declarator = t.variableDeclarator(identifier, arrowFunction);
     return t.variableDeclaration("const",[declarator]);
 }