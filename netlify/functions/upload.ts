export const handler = async (event: any) => {
    try {
      const { fileName, base64 } = JSON.parse(event.body);
  
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
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: data.message,
          }),
        };
      }
  
      // ✅ RAW URL (important)
      const url = `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/main/uploads/${fileName}`;
  
      return {
        statusCode: 200,
        body: JSON.stringify({ url }),
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      };
    }
  };
  