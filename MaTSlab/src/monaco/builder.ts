import {
    IExtraLibrary,
    IStandaloneEditorConstructionOptions,
    IThemeData,
    ITSCompilerOptions,
    ITSDiagnosticsOptions,
    TMonacoInstance
} from "./definitions";

export function buildEditorOptions(overridingOpts?: IStandaloneEditorConstructionOptions): IStandaloneEditorConstructionOptions {
    const defaultOptions: IStandaloneEditorConstructionOptions = {
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        model: null,
        language: 'typescript',
        theme: 'my-theme',
        scrollbar: {
            alwaysConsumeMouseWheel: false,
        },
    };

    return {
        ...defaultOptions,
        ...(overridingOpts !== undefined && { ...overridingOpts }),
    };
}

export function buildMonacoInstance(monacoInstance: TMonacoInstance) {
    function setEagerModelSync(value: boolean = false) {
        monacoInstance.languages.typescript.typescriptDefaults.setEagerModelSync(value);

        return api;
    }

    function setCompilerOptions(options?: ITSCompilerOptions) {
        const defaultOptions: ITSCompilerOptions = {
            target: monacoInstance.languages.typescript.ScriptTarget.Latest,
            allowNonTsExtensions: true,
            moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
            esModuleInterop: true,
            jsx: monacoInstance.languages.typescript.JsxEmit.React,
            reactNamespace: 'React',
            allowJs: true,
            typeRoots: ['node_modules/@types'],
            noImplicitAny: true,
            isolatedModules: true
        }


        monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
            ...defaultOptions,
            ...(options !== undefined && { ...options }),
        });

        return api;
    }

    function setDiagnosticsOptions(options?: ITSDiagnosticsOptions) {
        const defaultOptions: ITSDiagnosticsOptions = {
            noSemanticValidation: false,
            noSyntaxValidation: false,
        };

        monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            ...defaultOptions,
            ...(options !== undefined && { ...options }),
        });

        return api;
    }

    function setExtraLibrary(params: IExtraLibrary) {
        const defaultLibFilePath = `file:///react/index.d.ts`;

        monacoInstance.languages.typescript.typescriptDefaults.addExtraLib(
            params.content,
            params.filepath || defaultLibFilePath
        );

        return api;
    }

    function setEditorTheme(overridingThemeData?: IThemeData) {
        const defaultThemeData: IThemeData = {
            name: "my-theme",
            data: {
                base: 'vs',
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': '#00000000',
                },
            }
        };

        const theme =  {
            ...defaultThemeData,
            ...(overridingThemeData && { ...overridingThemeData }),
        };

        monacoInstance.editor.defineTheme(theme.name, theme.data);

        return api;
    }

    function getInstance(): TMonacoInstance {
        return monacoInstance;
    }

    const api =  {
        getInstance,
        setCompilerOptions,
        setEagerModelSync,
        setDiagnosticsOptions,
        setExtraLibrary,
        setEditorTheme,
    };

    return api;
}
