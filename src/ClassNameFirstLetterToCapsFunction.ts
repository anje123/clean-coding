import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import {camelCase, startCase} from 'lodash';


export function ClassNameFirstLetterToCapsFunction(code: string): string  {
    const ast = parse(code, {      
        plugins: [
          "typescript"
        ]});
        
    console.log(ast);
    
	traverse(ast, {
        ClassDeclaration(path) {
            const string =  path.node.id.name;
            path.node.id.name  = startCase(camelCase(path.node.id.name)).replace(/ /g, '');
         }
	});
	return generate(ast).code;
}