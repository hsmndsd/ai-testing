console.log("API KEY EXISTS:", !!process.env.OPENAI_API_KEY);
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    console.log("Incoming request:", req.body);

    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a casual Roblox player. Keep responses short."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = completion.choices[0].message.content;

    console.log("AI reply:", reply);

    res.json({ reply });

  } catch (err) {
    console.error("ERROR:", err);
    res.json({ reply: "error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
