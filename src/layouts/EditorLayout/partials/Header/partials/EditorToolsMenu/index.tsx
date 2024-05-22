import { useRef } from 'react';
import { useEditor } from '@common/providers/EditorProvider';
import { EditorActions } from '@common/utils/canvas/types';

import {
  ImageSquare,
  Atom,
  Cursor,
  Chat,
  Ruler,
  ThumbsUp,
} from '@phosphor-icons/react';

export const EditorToolsMenu = () => {
  const { setBackground, action, setAction, addShape } = useEditor();
  const inputImageRef = useRef<HTMLInputElement>(null);

  const uploadImg = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => setBackground(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleInputImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target?.files?.[0];
    if (file) {
      uploadImg(file);
    }
  };

  return (
    <>
      <div className="flex space-x-4 items-center justify-center">
        <input
          ref={inputImageRef}
          className="hidden"
          type="file"
          onChange={(event) => handleInputImageChange(event)}
        />
        <button
          className={`hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5 
            ${
              action === EditorActions.UPLOAD_IMAGE &&
              'bg-primary-500 text-white'
            }`}
          onClick={() => inputImageRef.current?.click()}>
          <ImageSquare size={20} />
        </button>
        <button
          className={`hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5 
            ${
              action === EditorActions.CREATE_IA_IMAGE &&
              'bg-primary-500 text-white'
            }`}
          onClick={() => setAction(EditorActions.CREATE_IA_IMAGE)}>
          <Atom size={20} />
        </button>
        <button
          className={`hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5 
            ${
              action === EditorActions.CURSOR_TOOL &&
              'bg-primary-500 text-white'
            }`}
          onClick={() => setAction(EditorActions.CURSOR_TOOL)}>
          <Cursor size={20} />
        </button>
        <button
          className={`hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5 
            ${
              action === EditorActions.CREATE_COMMENT &&
              'bg-primary-500 text-white'
            }`}
          onClick={() => setAction(EditorActions.CREATE_COMMENT)}>
          <Chat size={20} />
        </button>
        <button
          className={`hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5 
            ${
              action === EditorActions.RULER_TOOL && 'bg-primary-500 text-white'
            }`}
          onClick={() => addShape()}>
          <Ruler size={20} />
        </button>
        <button
          className={`hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md p-0.5 
            ${
              action === EditorActions.ADD_REVIEWER &&
              'bg-primary-500 text-white'
            }`}
          onClick={() => setAction(EditorActions.ADD_REVIEWER)}>
          <ThumbsUp size={20} />
        </button>
      </div>
    </>
  );
};
