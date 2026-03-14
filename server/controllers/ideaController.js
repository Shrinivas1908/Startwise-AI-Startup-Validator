const axios = require("axios");
const Idea = require("../models/Idea");

exports.validateIdea = async (req, res) => {
  try {

    const { title, description, market } = req.body;

    const prompt = `
    Analyze this startup idea:

    Title: ${title}
    Description: ${description}
    Market: ${market}

    Provide:
    - Startup validation score out of 100
    - Market potential
    - Competition level
    - Risks
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const aiText =
      response.data.candidates[0].content.parts[0].text;

    const idea = new Idea({
      title,
      description,
      market,
      validationScore: Math.floor(Math.random() * 100)
    });

    await idea.save();

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