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
      const { message, code } = await request.json();

      const aiResponse = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
        prompt: `
You are a coding assistant.
The user will provide a request to create or modify code.
You must respond with ONLY the exact code — no explanations, no extra text, no comments, no markdown formatting.
Do not include phrases like "Here is the code" or any descriptive text.
If the user input includes code, modify or generate the required code as instructed.
Always output only valid, runnable code — nothing else.

User message:
${message}

User request:
${code}
`,
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
