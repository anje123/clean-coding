import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
var _ = require('lodash');


export function ConvertToCamelcase(code: string): string {
	const ast = parse(code);
	traverse(ast, {
		Identifier(path) {
            path.node.name =  _.camelCase(path.node.name);            
          }
	});
	return generate(ast).code;
}

 