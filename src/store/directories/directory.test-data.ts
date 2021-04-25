import { DirectoryItem } from '../../models/directories.models';

export const initialStructure: DirectoryItem[] = [
  {
    type: 'folder',
    name: 'src',
    path: '/src',
    childrens: [
      {
        type: 'folder',
        name: 'Components',
        path: '/src/Components',
        childrens: [
          {
            type: 'file',
            name: 'Modal.js',
            path: '/src/Components/Modal.js',
            content: 'example 1',
          },
          {
            type: 'file',
            name: 'Modal.css',
            path: '/src/Components/Modal.css',
            content: 'example 2',
          },
        ],
      },
      { type: 'file', name: 'index.js', path: '/src/index.js', content: 'index here' },
      { type: 'file', name: 'index.css', path: '/src/index.css', content: 'html here' },
    ],
  },
  {
    type: 'folder',
    name: 'public',
    path: '/public',
    childrens: [
      { type: 'file', name: 'index.html', path: '/public/index.html', content: 'index here' },
    ],
  },
  { type: 'file', name: 'package.json', path: '/package.json', content: 'your packages here' },
];
