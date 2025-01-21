import React, { useState, useEffect, useRef } from 'react';
import EmailEditor from 'react-email-editor';
import "./App.css";
import logo from "./logo1.jpg";
const EmailTemplateEditor = () => {
  const [templateJson, setTemplateJson] = useState(null);
  const EmailEdito = useRef(null);

  const emailConfig = {
    imageUrl:{logo},
    title: 'Welcome to Our Service',
    body: 'We are glad to have you on board. Let’s get started!',
  };

  const layout = {
    body: {
      rows: [
        {
          cells: [1],
          columns: [
            {
              contents: [
                {
                  type: 'image',
                  values: {
                    src: emailConfig.imageUrl,
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    altText: 'Circular Image Placeholder',
                    alignment: 'center',
                  },
                },
              ],
            },
          ],
        },
        {
          cells: [1],
          columns: [
            {
              contents: [
                {
                  type: 'text',
                  values: {
                    text: `<h1 style="text-align: center;">${emailConfig.title}</h1>`,
                    color: '#333333',
                    fontSize: '24px',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: '1.5',
                  },
                },
              ],
            },
          ],
        },
        {
          cells: [1],
          columns: [
            {
              contents: [
                {
                  type: 'text',
                  values: {
                    text: `<p style="text-align: center;">${emailConfig.body}</p>`,
                    color: '#666666',
                    fontSize: '16px',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: '1.5',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };

  const Load=()=>{
   
    console.log(layout);
    
      EmailEdito.current.editor.loadDesign(layout);
    
  }; 

  
  const handleSave = () => {
    if (EmailEdito.current && EmailEdito.current.editor) {
      EmailEdito.current.editor.saveDesign((data) => {
        setTemplateJson(data);
      });
    }
  };

  
  const handleDownloadJson = () => {
    if (templateJson) {
      const blob = new Blob([JSON.stringify(templateJson)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'emailTemplate.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  
  const handleDownloadHtml = () => {
    if (EmailEdito.current && EmailEdito.current.editor) {
      EmailEdito.current.editor.exportHtml((data) => {
        const htmlContent = data.html;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'emailTemplate.html'; 
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  };
  const onImageUpload = (file, done) => {
   
    if (file && file instanceof File) {
    
      const imageUrl = URL.createObjectURL(file);
      
     
      done({ url: imageUrl });
    } else {
     alert("Uploaded file is not a valid image. refresh the screen");
      console.error("Uploaded file is not a valid image.");
      done({ url: '' });
    }
  };

  
  const onEditorLoad = () => {
    if (EmailEdito.current && EmailEdito.current.editor) {
     
      EmailEdito.current.editor.registerCallback('image', onImageUpload);
    }
  };

  return (
    <div>
      <h1>Email Template Editor</h1>

      {/* React Email Editor */}
      <EmailEditor ref={EmailEdito} onLoad={Load}  />

      <button className="button" onClick={handleSave}>Save Template</button>
      <button className="button" onClick={handleDownloadJson}>Download as JSON</button>
      <button className="button" onClick={handleDownloadHtml}>Download as HTML</button>

      {templateJson && (
        <div>
          <h2>Template JSON:</h2>
          <pre>{JSON.stringify(templateJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateEditor;