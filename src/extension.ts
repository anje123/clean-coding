import * as vscode from 'vscode';
import { transform } from './transform';
import { ConvertToCamelcase } from './ConvertToCamelcase';
import { convertVarToLetFunction } from './convertVarToLetFunction';
import { ClassNameFirstLetterToCapsFunction } from './ClassNameFirstLetterToCapsFunction';
import { InterfaceNameFirstLetterToCapsFunction } from './InterfaceNameFirstLetterToCapsFunction';
import { addBracesToArrowFunction } from './addBracesToArrowFunction';
import { addBracesToIfStatement } from "./addBracesToIfStatement";


export function activate(context: vscode.ExtensionContext) {

	
	const fixer = vscode.languages.registerCodeActionsProvider("typescript", fixProvider, {
        providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
      });
    context.subscriptions.push(fixer);


	console.log('Congratulations, your extension "type-plugin" is now active!');
	let disposable = vscode.commands.registerCommand('type-plugin.convertToArrowFunction', () => {

		try {
			// vscode.window.showInformationMessage('Hello World from type-plugin!');
		const code = readCode();
		const transformCode = transform(code);
		write(transformCode);
		} catch (error) {
			console.log(error);
			
		}
	});

	let addBracesToArrow = vscode.commands.registerCommand('type-plugin.addBracesToArrow', () => {
		try {
			const code = readCode();
			const transformCode = addBracesToArrowFunction(code);
			write(transformCode);
			} catch (error) {
				console.log(error);	
			}
	});

	let addBracesToIf = vscode.commands.registerCommand('type-plugin.addBracesToIfStatement', () => {
		try {
			const code = readCode();
			const transformCode = addBracesToIfStatement(code);
			write(transformCode);
			} catch (error) {
				console.log(error);	
			}
	});


	let disposable1 = vscode.commands.registerCommand('type-plugin.camel-case', () => {

		// vscode.window.showInformationMessage('Hello World from type-plugin!');
		const code = readCode();
		const transformCode = ConvertToCamelcase(code);
		write(transformCode);
	});

	let convertVarToLet = vscode.commands.registerCommand('type-plugin.convertVarToLet', () => {

		const code = readCode();
		const transformCode = convertVarToLetFunction(code);
		write(transformCode);
	});

	let convertClassNameFirstLetterToCaps = vscode.commands.registerCommand('type-plugin.convertClassNameFirstLetterToCaps', () => {

		const code = readCode();
		const transformCode = ClassNameFirstLetterToCapsFunction(code);
		write(transformCode);
	});
	
	let convertInterfaceNameFirstLetterToCaps = vscode.commands.registerCommand('type-plugin.convertInterfaceNameFirstLetterToCaps', () => {

		try {
			const code = readCode();
		const transformCode = InterfaceNameFirstLetterToCapsFunction(code);
		write(transformCode);
		} catch (error) {
			console.log(error);
			
		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);
	context.subscriptions.push(convertVarToLet);
	context.subscriptions.push(convertClassNameFirstLetterToCaps);
	context.subscriptions.push(convertInterfaceNameFirstLetterToCaps);
	context.subscriptions.push(addBracesToIf);
}

function readCode():string {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		throw new Error("No Active Editor");
	}
	return editor.document.getText();
}


function write(code:string) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		throw new Error("No Active Editor");
	}
	const edit = new vscode.WorkspaceEdit();
	const wholeDocument = new vscode.Range(
		new vscode.Position(0, 0),
		new vscode.Position(editor.document.lineCount, 0));
	const updateCode = new vscode.TextEdit(wholeDocument, code);
	edit.set(editor.document.uri,[updateCode]);
	vscode.workspace.applyEdit(edit);
}


const fixProvider = {
    provideCodeActions: function(document: vscode.TextDocument, range: vscode.Range, context: vscode.CodeActionContext, token: vscode.CancellationToken) {
		return [{ title: "Convert To Variable Declaration", command: "type-plugin.convertToArrowFunction"},
			   { title: "Add Braces To If Statement", command: "type-plugin.addBracesToIfStatement"},
			   { title: "Add Braces To Arrow Function", command: "type-plugin.addBracesToArrow"},
			   {title: "Convert To Function Name To CamelCase", command: "type-plugin.camel-case"}];
    }
};


export function deactivate() {}
