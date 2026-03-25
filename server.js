import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/chat", (req, res) => {
  res.send("chat endpoint is working");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a casual Roblox player." },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error("ERROR:", err); // shows in Render logs
    res.json({ reply: err.message || "error" }); // sends real error to curl
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("running"));
