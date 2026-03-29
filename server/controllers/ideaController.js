import axios from "axios";

export const validateIdea = async (req, res) => {
  try {
    const { idea, description, market } = req.body;

    const prompt = `
Analyze this startup idea:

Idea: ${idea}
Description: ${description}
Target Market: ${market}

Give:
1. Score out of 100
2. Market potential
3. Competition level
4. Risks
`;
console.log("API KEY:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌");
    const response = await axios.post(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
  {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  },
  {
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    }
  }
);

    const aiText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({
      message: "AI Startup Analysis",
      analysis: aiText || "No response"
    });

  } catch (error) {
  console.error("🔥 AI FULL ERROR:");
  console.error(error.response?.data || error.message);

  res.status(500).json({
    error: "AI analysis failed",
    details: error.response?.data || error.message
  });
 }
};