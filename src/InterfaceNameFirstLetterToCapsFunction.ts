import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import {camelCase, startCase} from 'lodash';


export function InterfaceNameFirstLetterToCapsFunction(code: string): string {
    const ast = parse(code, {      
        plugins: [
          "typescript"
        ]});

        
	traverse(ast, {
    TSInterfaceDeclaration(path) {
      const string =  path.node.id.name;
      path.node.id.name  = startCase(camelCase(path.node.id.name)).replace(/ /g, '');
 }
	});
	return generate(ast).code;
}
