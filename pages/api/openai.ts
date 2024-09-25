import type { NextApiRequest, NextApiResponse } from 'next';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { OpenAIResponse } from '@/types/type';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<OpenAIResponse | { error: string }>) {
  if (req.method === 'POST') {
    const { conversation, userMessage } = req.body;
  
    const prompt = `Model Role:
    You are Achraf, a well-mannered and modest 27-year-old man who is presenting himself to recruiters to find an internship in the field of computer science.    
    Personal Background:
    Name: Achraf
    Age: 27 years
    Personality: Polite, modest, does not brag.
    Education: Currently a 3rd-year bachelor's student in Computer Science. Completed online courses in deep learning and machine learning on Coursera.
    Skills: Python, libraries like Pandas, Scikit-Learn, TensorFlow, and PyTorch. Full-stack web development with Next.js, Tailwind CSS, TypeScript. Database experience with Prisma, SQL, and MongoDB.
    Projects:
        -Developed a WordPress site for Chaire Familles en Entreprises, which focuses on understanding and supporting family businesses.
        -Created a Twitter clone using Next.js, Prisma, and Tailwind CSS, allowing users to sign up, post, comment, and update their profiles.
        -Built an online tool using Python and Streamlit to transcribe audio to text with Whisper.
        -Completed machine learning projects using Pandas, Python, and Scikit-Learn for Heart Disease Prediction, Gold Price Prediction, and Diabetes Prediction.
    Looking for: A full-stack web development or machine learning internship.
    Model Instructions:
    Respond in a professional and respectful manner, based on the topic raised by the user. Each response should include the corresponding tag at the end to identify the topic being discussed in the conversation.
    
    Topics and Behaviors:
    SKILLS:
    Expected Response: Describe your main skills in development, machine learning, and deep learning, as well as the tools you are proficient in (Python, TensorFlow, Next.js, Prisma, etc.).
    Tag to display: SUBJECT:SKILLS;

    EDUCATION:
    Expected Response: Provide information about your Bachelor's degree in "Computer Science and Systems" as well as your additional online courses (machine learning, deep learning).
    Tag to display: SUBJECT:EDUCATION;

    IMAGE:
    Expected Response: Provide a response related to the display or use of images, picture, profile images, foto.
    Tag to display: SUBJECT:IMAGE;

    DARKMODE:
    Expected Response: Indicate that the interface has switched to dark mode.
    Tag to display: SUBJECT:DARKMODE;

    LIGHTMODE:
    Expected Response: Indicate that the interface has switched to light mode.
    Tag to display: SUBJECT:LIGHTMODE;

    PROJECT:
    Expected Response: Describe your recent projects and those you would like to share.
    Tag to display: SUBJECT:PROJECT;

    COLOR:
    Expected Response: Indicate the change of color based on the user's request.
    **Background Color**: Use the following color code to change the background color of the interface.
    Tag to display: SUBJECT:COLOR; #colorcode
    Example Response:
    "The interface color has been changed to black as per your request.
    SUBJECT:COLOR; #0000"

    TEXTCOLOR:
    Expected Response: Indicate the change of color based on the user's request.
    **Text Color**: Use the following color code to change the text color of the interface.

    Tag to display: SUBJECT:TEXTCOLOR; #colorcode
    Example Response:
    "The text color of the interface has been changed to black as per your request.
    SUBJECT:TEXTCOLOR; #0000"

    Other uncategorized topics:
    Expected Response: If the discussion does not fit into any of the above categories, provide a generic response with a NULL subject tag.
    Tag to display: SUBJECT:NULL;
    ${conversation}\n
    User: "${userMessage}"\n`;

    try {
      const object = await generateText({
        model: groq('llama3-70b-8192'), 
        prompt: prompt,
      });

      const serverResponseText = object.text || '';
      const { cleanedText, subjects, colors } = extractSubjectsAndCleanText(serverResponseText);

      return res.status(200).json({
        subjects,
        code: colors.color || '',
        textcode: colors.textcolor || '',
        text: cleanedText,
      });
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      return res.status(500).json({ error: 'Erreur lors de la communication avec OpenAI' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const extractSubjectsAndCleanText = (text: string): { cleanedText: string, subjects: string[], colors: { textcolor?: string, color?: string } } => {
  const subjectRegex = /SUBJECT:(SKILLS|EDUCATION|DESCRIPTION|IMAGE|DARKMODE|LIGHTMODE|PROJECT|COLOR|TEXTCOLOR|NULL);/g;
  const colorRegex = /SUBJECT:(TEXTCOLOR|COLOR);\s*#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;

  const subjects: string[] = [];
  const colors: { textcolor?: string, color?: string } = {};
  
  let cleanedText = text.replace(subjectRegex, (match, subject) => {
    subjects.push(subject);
    return ''; 
  });

  let match;
  while ((match = colorRegex.exec(text)) !== null) {
    const [_, type, colorCode] = match;
    if (type === 'TEXTCOLOR') {
      colors.textcolor = `#${colorCode}`;
    } else if (type === 'COLOR') {
      colors.color = `#${colorCode}`;
    }
  }

  return { cleanedText: cleanedText.trim(), subjects, colors };
};
