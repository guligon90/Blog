import { buildEditorOptions, buildMonacoInstance } from "./builder";
import monaco from "./definitions";
import { defs } from '../globals.json';
import { react } from '../react.json';

const monacoInstance = buildMonacoInstance(monaco)
    .setEagerModelSync()
    .setCompilerOptions()
    .setDiagnosticsOptions()
    .setExtraLibrary({ content: react })
    .setEditorTheme()
    .getInstance();

export function addEditor(ref: HTMLElement, cellName: string) {
    const editorOptions = buildEditorOptions();
    const globalModel = monacoInstance.editor.createModel(defs, 'typescript');
    const defModel = monacoInstance.editor.createModel(``, 'typescript');

    const textModel = monacoInstance.editor.createModel(
        ``,
        'typescript',
        monacoInstance.Uri.parse(`file:///${cellName}.tsx`),
    );

    textModel.updateOptions({ tabSize: 2 });

    const e2 = monacoInstance.editor.create(ref, editorOptions);

    e2.setModel(textModel);

    const tsWorker = monacoInstance.languages.typescript
        .getTypeScriptWorker()
        .then(worker => worker(defModel.uri, textModel.uri, globalModel.uri));

    return { editor: e2, definitionModel: defModel, textModel, tsWorker };
};
