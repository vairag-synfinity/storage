export async function POST(req: Request) {
    try {
      const { fileName, base64 } = await req.json();
  
      const response = await fetch(
        `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/uploads/${fileName}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `upload ${fileName}`,
            content: base64,
          }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        return Response.json(
          { error: data.message || "Upload failed" },
          { status: response.status }
        );
      }
  
      const url = `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/main/uploads/${fileName}`;
  
      return Response.json({ url });
  
    } catch (error: any) {
      return Response.json(
        { error: error.message || "Server error" },
        { status: 500 }
      );
    }
  }
  