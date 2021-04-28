export interface File {
  name: string;
  content: string;
  path: string;
}

export interface Folder {
  name: string;
  path: string;
  childrens: (Folder | File)[];
}

export interface DirectoryItem {
  type: 'file' | 'folder';
  name: string;
  path: string;
  childrens?: DirectoryItem[];
  content?: string;
}

export type ItemType = 'file' | 'folder';
