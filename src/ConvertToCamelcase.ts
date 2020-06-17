import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
var _ = require('lodash');


export function ConvertToCamelcase(code: string): string {
	const ast = parse(code, {      
        plugins: [
          "typescript"
		]});
		
	traverse(ast, {
		FunctionDeclaration(path) {
          path.node.id.name =  _.camelCase(path.node.id.name);            
      }
	});
	return generate(ast).code;
}

 