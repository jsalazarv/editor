// Layouts
import { EditorLayout } from '@layouts/EditorLayout';


// Editor Modules
import { DrawingBoard } from '@modules/Portal/Editor';


export default [
  {
    path: '/',
    Component: EditorLayout,
    children: [
      { index: true, path: '/', Component: DrawingBoard },
    ],
  },
];
