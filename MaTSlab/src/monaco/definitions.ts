import * as monaco from 'monaco-editor';

export default monaco;

export type TMonacoInstance = typeof monaco;
export type TMonacoEditorInstance = typeof monaco.editor;

export interface IStandaloneEditorConstructionOptions extends monaco.editor.IStandaloneEditorConstructionOptions {};
export interface IStandaloneThemeData extends monaco.editor.IStandaloneThemeData {};
export interface ITSCompilerOptions extends monaco.languages.typescript.CompilerOptions {};
export interface ITSDiagnosticsOptions extends monaco.languages.typescript.DiagnosticsOptions {};

export interface IThemeData {
    name: string;
    data: IStandaloneThemeData;
}

export interface IExtraLibrary {
    content: string;
    filepath?: string | undefined;
}
