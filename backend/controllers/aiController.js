const OpenAI = require('openai');

const chatbotInteract = async (req, res) => {
    try {
        const { message } = req.body;

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
            return res.json({ reply: "I'm currently in demo mode. (OpenAI API key missing). How can I help you today?" });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an Intelligent Sales Assistant. Your goal is to qualify leads and answer basic business questions. If the user expresses interest, ask for their name and email."
                },
                { role: "user", content: message }
            ],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { chatbotInteract };
