/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIRESTORE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
