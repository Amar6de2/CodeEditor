
import { Id } from "../../convex/_generated/dataModel";

export interface Theme {
  id: string;
  label: string;
  color: string;
}

export interface Language {
  id: string;
  label: string;
  logoPath: string;
  monacoLanguage: string;
  defaultCode: string;
  pistonRuntime: LanguageRuntime;
}

export interface LanguageRuntime {
  language: string;
  version: string;
}

export interface ExecuteCodeResponse {
  compile?: {
    output: string;
  };
  run?: {
    output: string;
    stderr: string;
  };
}

export interface ExecutionResult {
  code: string;
  output: string;
  error: string | null;
}

// import { editor as monacoEditor } from "monaco-editor";
// export interface CodeEditorState {
//   language: string;
//   output: string;
//   isRunning: boolean;
//   error: string | null;
//   theme: string;
//   fontSize: number;
//   editor: Monaco | null;

//   executionResult: ExecutionResult | null;

//   setEditor: (editor: Monaco) => void;
//   getCode: () => string;
//   setLanguage: (language: string) => void;
//   setTheme: (theme: string) => void;
//   setFontSize: (fontSize: number) => void;
//   runCode: () => Promise<void>;
// }

import type * as monaco from "monaco-editor";

export interface ExecutionResult {
  code: string;
  output: string;
  error: string | null;
}

export interface CodeEditorState {
  language: string;
  output: string;
  isRunning: boolean;
  error: string | null;
  theme: string;
  fontSize: number;
  editor: monaco.editor.IStandaloneCodeEditor | null;

  executionResult: ExecutionResult | null;

  setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  getCode: () => string;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  runCode: () => Promise<void>;
}

export interface Snippet {
  _id: Id<"snippets">;
  _creationTime: number;
  userId: string;
  language: string;
  code: string;
  title: string;
  userName: string;
}

// razorpay-client.d.ts or append to your types/index.ts

interface RazorpayOptions {
  key: string;
  amount?: number;
  currency?: string;
  name?: string;
  description?: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  theme?: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: () => void) => void;
  // add more methods if needed
}

interface RazorpayStatic {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayStatic;
  }
}

