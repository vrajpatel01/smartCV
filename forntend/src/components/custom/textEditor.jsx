"use client";
// import { useState, useEffect, useRef } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import "ckeditor5/ckeditor5.css";

// import "../../app/globals.css";

// import {
//   DecoupledEditor,
//   AccessibilityHelp,
//   Autosave,
//   Bold,
//   Essentials,
//   Italic,
//   Paragraph,
//   SelectAll,
//   Undo,
// } from "ckeditor5";

// export default function TextEditor() {
//   const editorContainerRef = useRef(null);
//   const editorToolbarRef = useRef(null);
//   const editorRef = useRef(null);
//   const [isLayoutReady, setIsLayoutReady] = useState(false);

//   useEffect(() => {
//     setIsLayoutReady(true);

//     return () => setIsLayoutReady(false);
//   }, []);

//   const editorConfig = {
//     toolbar: {
//       items: [
//         "undo",
//         "redo",
//         "|",
//         "selectAll",
//         "|",
//         "bold",
//         "italic",
//         "|",
//         "accessibilityHelp",
//       ],
//       shouldNotGroupWhenFull: false,
//     },
//     plugins: [
//       AccessibilityHelp,
//       Autosave,
//       Bold,
//       Essentials,
//       Italic,
//       Paragraph,
//       SelectAll,
//       Undo,
//     ],
//     initialData: "<h2>Hello</h2>",
//     placeholder: "Type or paste your content here!",
//   };

//   return (
//     <div>
//       <div className="main-container">
//         <div
//           className="editor-container editor-container_document-editor"
//           ref={editorContainerRef}
//         >
//           <div
//             className="editor-container__toolbar"
//             ref={editorToolbarRef}
//           ></div>
//           <div className="editor-container__editor-wrapper">
//             <div className="editor-container__editor">
//               <div ref={editorRef}>
//                 {isLayoutReady && (
//                   <CKEditor
//                     onReady={(editor) => {
//                       editorToolbarRef.current.appendChild(
//                         editor.ui.view.toolbar.element
//                       );
//                     }}
//                     onAfterDestroy={() => {
//                       Array.from(editorToolbarRef.current.children).forEach(
//                         (child) => child.remove()
//                       );
//                     }}
//                     editor={DecoupledEditor}
//                     config={editorConfig}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  BalloonEditor,
  AccessibilityHelp,
  Autosave,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  SelectAll,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import "../../app/globals.css";

export default function TextEditor() {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "selectAll",
        "|",
        "bold",
        "italic",
        "|",
        "accessibilityHelp",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autosave,
      Bold,
      Essentials,
      Italic,
      Paragraph,
      SelectAll,
      Undo,
    ],
    initialData: "",
    placeholder: "Type or paste your content here!",
  };

  return (
    <div>
      <div className="main-container">
        <div
          className="editor-container editor-container_balloon-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor editor={BalloonEditor} config={editorConfig} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
