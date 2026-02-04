"use client";
import { useRef, useEffect, useState } from "react";
import {
  FaBold, FaItalic, FaUnderline,
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaListUl, FaListOl, FaQuoteRight,
  FaUndo, FaRedo, FaLink, FaHighlighter,
  FaImage, FaVideo
} from "react-icons/fa";

export default function RichTextEditor({ value = "", onChange, placeholder = "Write your story..." }) {
  const editorRef = useRef();
  const [linkMode, setLinkMode] = useState(false);
  const [linkURL, setLinkURL] = useState("");
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const exec = (cmd, arg = null) => {
    document.execCommand(cmd, false, arg);
    notifyChange();
    editorRef.current.focus();
  };

  const notifyChange = () => {
    if (!editorRef.current) return;
    onChange && onChange(editorRef.current.innerHTML);
  };

  const handlePastePlain = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text");
    document.execCommand("insertText", false, text);
  };

  const applyLink = () => {
    if (linkURL.trim()) {
      exec("createLink", linkURL.trim());
      setLinkMode(false);
      setLinkURL("");
    }
  };

  // Handle image/video insertion
  const insertMedia = (type, fileOrURL) => {
    if (!editorRef.current) return;
    let html = "";
    if (type === "image") {
      if (typeof fileOrURL === "string") {
        html = `<img src="${fileOrURL}" alt="Image" class="max-w-full rounded-md my-2"/>`;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          html = `<img src="${e.target.result}" alt="Image" class="max-w-full rounded-md my-2"/>`;
          exec("insertHTML", html);
        };
        reader.readAsDataURL(fileOrURL);
        return;
      }
    } else if (type === "video") {
      const url = fileOrURL.trim();
      html = `<iframe src="${url}" class="w-full h-64 my-2 rounded-md" frameborder="0" allowfullscreen></iframe>`;
    }
    exec("insertHTML", html);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith("image/")) insertMedia("image", file);
      });
    }
  };

  const buttonClass = "flex items-center justify-center w-8 h-8 rounded-md hover:bg-green-100 text-green-700 shadow-sm";

  return (
    <div 
      className={`border rounded-xl bg-white shadow-sm dark:bg-[#1E1E1E] ${dragActive ? 'border-dashed border-4 border-green-400' : ''}`}
      onDragOver={e => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
      onDrop={handleDrop}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b bg-green-50 rounded-t-xl sticky top-0 z-10 dark:bg-[#1E1E1E]">
        {/* Text style */}
        <button type="button" onClick={() => exec("bold")} className={buttonClass}><FaBold /></button>
        <button type="button" onClick={() => exec("italic")} className={buttonClass}><FaItalic /></button>
        <button type="button" onClick={() => exec("underline")} className={buttonClass}><FaUnderline /></button>

        {/* Alignment */}
        <button type="button" onClick={() => exec("justifyLeft")} className={buttonClass}><FaAlignLeft /></button>
        <button type="button" onClick={() => exec("justifyCenter")} className={buttonClass}><FaAlignCenter /></button>
        <button type="button" onClick={() => exec("justifyRight")} className={buttonClass}><FaAlignRight /></button>

        {/* Lists & quotes */}
        <button type="button" onClick={() => exec("insertUnorderedList")} className={buttonClass}><FaListUl /></button>
        <button type="button" onClick={() => exec("insertOrderedList")} className={buttonClass}><FaListOl /></button>
        <button type="button" onClick={() => exec("formatBlock", "BLOCKQUOTE")} className={buttonClass}><FaQuoteRight /></button>

        {/* Undo/Redo */}
        <button type="button" onClick={() => exec("undo")} className={buttonClass}><FaUndo /></button>
        <button type="button" onClick={() => exec("redo")} className={buttonClass}><FaRedo /></button>

        {/* Fonts */}
        <select onChange={(e) => exec("fontName", e.target.value)} defaultValue="" className="px-2 py-1 rounded-md text-sm border border-green-200 shadow-sm text-gray-700 hover:border-green-400">
          <option value="" disabled>Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <select onChange={(e) => exec("fontSize", e.target.value)} defaultValue="" className="px-2 py-1 rounded-md text-sm border border-green-200 shadow-sm text-gray-700 hover:border-green-400">
          <option value="" disabled>Size</option>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">XL</option>
        </select>

        {/* Colors */}
        <input type="color" onChange={(e)=>exec("foreColor", e.target.value)} className="w-8 h-8 p-0 border-0 rounded-md cursor-pointer" title="Text Color"/>
        <input type="color" onChange={(e)=>exec("hiliteColor", e.target.value)} className="w-8 h-8 p-0 border-0 rounded-md cursor-pointer" title="Highlight Color"/>

        {/* Links */}
        <button type="button" onClick={() => setLinkMode(!linkMode)} className={buttonClass}><FaLink /></button>
        {linkMode && (
          <div className="flex items-center gap-2 ml-2">
            <input type="text" value={linkURL} onChange={e=>setLinkURL(e.target.value)} placeholder="https://example.com" className="px-2 py-1 border rounded-md text-sm"/>
            <button onClick={applyLink} className="px-2 py-1 bg-green-600 text-white rounded-md text-sm">Apply</button>
          </div>
        )}

        {/* Media */}
        <button type="button" onClick={() => document.getElementById("imageInput").click()} className={buttonClass}><FaImage /></button>
        <input type="file" id="imageInput" className="hidden" accept="image/*" onChange={e => e.target.files[0] && insertMedia("image", e.target.files[0])} />

        <button type="button" onClick={() => {
          const url = prompt("Enter video URL (YouTube/Vimeo):");
          if(url) insertMedia("video", url);
        }} className={buttonClass}><FaVideo /></button>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={notifyChange}
        onPaste={handlePastePlain}
        className="min-h-[220px] p-3 focus:outline-none rounded-b-xl text-sm text-black dark:text-white"
        data-placeholder={placeholder}
        style={{ whiteSpace: "pre-wrap" }}
      />

      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
