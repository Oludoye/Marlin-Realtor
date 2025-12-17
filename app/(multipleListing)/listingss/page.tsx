async function handleMultipleUpload(files: FileList | null) {
  if (!files) return;

  for (const file of Array.from(files)) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    // ✅ SAFELY READ RESPONSE FIRST
    const text = await res.text();
    console.log("RAW SERVER RESPONSE:", text);

    // ✅ IF EMPTY RESPONSE → STOP IMMEDIATELY
    if (!text) {
      throw new Error("Server returned empty response. Upload API is broken.");
    }

    // ✅ SAFE JSON PARSE
    const data = JSON.parse(text);

    setImages(prev => [...prev, data.url]);
  }
}
