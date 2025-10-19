interface Ai {
  run: (
    model: string,
    opts: { prompt: string }
  ) => Promise<{ response: string }>;
}

interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    try {
      // const { prompt } = await request.json();

      const aiResponse = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
        prompt: `Write only the JavaScript code to add two numbers. No explanation, no comments, no text — just the code.`,
      });

      const responseContent = {
        response: aiResponse.response,
      };

      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };

      return new Response(JSON.stringify(responseContent), { headers });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to process request" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
};
