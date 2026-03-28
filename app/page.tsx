"use client";
import { useState } from "react";

export default function Upload() {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = (file: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];

      const res = await fetch("/api/github-uplode", {
        method: "POST",
        body: JSON.stringify({
          fileName: `${Date.now()}`,
          base64,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert("Error: " + data.error);
      } else {
        setImageUrl(data.url);
      }
    };
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            handleUpload(e.target.files[0]);
          }
        }}
      />

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl + "?t=" + Date.now()} width={300} />
          <p>{imageUrl}</p>
        </div>
      )}
    </div>
  );
}
