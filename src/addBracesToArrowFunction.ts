import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

export function addBracesToArrowFunction(code: string): string {
    const ast = parse(code, {      
        plugins: [
          "typescript"
		]});
		
	traverse(ast, {
        ArrowFunctionExpression(path){
            if (t.isBlockStatement(path.node.body)) return;
            const blockStatement = t.blockStatement([
             t.returnStatement(path.node.body)
           ]);
            path.node.body = blockStatement;
            path.stop();
     
    }
	});
	return generate(ast).code;

}
