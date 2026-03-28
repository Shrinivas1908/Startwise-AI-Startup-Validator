const axios = require("axios");

exports.validateIdea = async (req, res) => {
  try {
    const { idea } = req.body;

    const prompt = `
Analyze this startup idea:

"${idea}"

Give:
1. Validation score (out of 100)
2. Market potential
3. Competition level
4. Possible risks
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    // ✅ SAFE RESPONSE HANDLING
    const aiText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No AI response";

    res.json({
      message: "AI Startup Analysis",
      analysis: aiText
    });

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: "AI analysis failed"
    });
  }
};