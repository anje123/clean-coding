import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';


export function addBracesToIfStatement(code: string) :string{
    const ast = parse(code, {      
        plugins: [
          "typescript"
		]});
		
	traverse(ast, {
        IfStatement(path){
            path.node.consequent = statementWithBraces(path.node.consequent);
             
          if (path.node.alternate) {
            path.node.alternate = statementWithBraces(path.node.alternate);
          }
            path.stop();        
        }
	});
	return generate(ast).code;

}

function statementWithBraces(node: t.Statement): t.Statement {
    return t.isBlockStatement(node) ? node : t.blockStatement([node]);
  }