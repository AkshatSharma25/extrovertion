// components/ImageUpload.js
"use client"
import { useState } from 'react';

const ImageUpload = () => {
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = event.target.fileInput.files[0];
    
    if (!fileInput) {
      setMessage('Please select a file');
      return;
    }

    formData.set('file', fileInput);

    setUploading(true);
    setMessage('');

    try {
        // console.log(fileInput);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      setMessage(`File uploaded successfully: ${result.path}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="fileInput"
          name="image"
          accept="image/*"
          required
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <div id="message">{message}</div>
    </div>
  );
};

export default ImageUpload;
