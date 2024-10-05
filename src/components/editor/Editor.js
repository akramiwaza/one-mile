import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import "./quill-custom.css"; // Add this line
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";

const EditorComponent = ({ data, title, onChange, disabled = false, key }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content, delta, source, editor) => {
    onChange(content);
  };

  const modules = {
    toolbar: [
      [{ size: [] }],
      [
        { header: "1" },
        { header: "2" },
        { header: [3, 4, 5, 6] },
        { color: [] },
        { background: [] },
      ],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"], // remove formatting button
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "color",
    "background",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "script",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
  ];

  return (
    <div key={key}>
      <div style={{ marginBottom: "20px" }} />
      <CustomFormLabel>{title}</CustomFormLabel>
      <ReactQuill
        ref={editorRef}
        value={data}
        onChange={handleEditorChange}
        readOnly={disabled}
        modules={modules}
        formats={formats}
        style={{ height: "400px", margin: 0, padding: 0 }}
      />
      <div style={{ marginBottom: "20px" }} />
    </div>
  );
};

export default EditorComponent;

// import { Editor } from "@tinymce/tinymce-react";
// import { useRef } from "react";
// import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";

// const EditorComponent = ({ data, title, onChange, disabled = false, key }) => {
//   const editorRef = useRef(null);

//   const handleEditorChange = (content, editor) => {
//     onChange(content);
//   };

//   return (
//     <div key={key}>
//       <CustomFormLabel>{title}</CustomFormLabel>
//       <Editor
//         disabled={disabled}
//         apiKey="08eajfykxby5l5dtgyuy3yj69rz59w4h8v8p64u852znm5ed" // current user senaryo
//         // apiKey="eb10w9lvckv1vyot8vekjm6m76x8gsouqsgj56fsbopgi9ca"
//         onInit={(evt, editor) => (editorRef.current = editor)}
//         init={{
//           toolbar:
//             "undo redo | formatselect | " +
//             "bold italic underline strikethrough | " +
//             "alignleft aligncenter alignright alignjustify | " +
//             "bullist numlist outdent indent | " +
//             "link image media table mergetags | " +
//             "fontsize |" +
//             "lineheight | tinycomments | " +
//             "checklist | " +
//             "emoticons charmap | removeformat | forecolor",
//           tinycomments_mode: "embedded",
//           plugins: "table",
//           toolbar_drawer: "sliding",
//           content_style: "body { font-family: 'Poppins', sans-serif; }",
//         }}
//         value={data}
//         onEditorChange={handleEditorChange}
//       />
//     </div>
//   );
// };

// export default EditorComponent;
