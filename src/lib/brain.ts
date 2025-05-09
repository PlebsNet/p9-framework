import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function callClaude(prompt: string): Promise<string> {
  const system = "You are an introspective assistant helping users explore their values and personality. Be thoughtful and emotionally aware.";

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    system,
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  console.log('Claude raw response:', response);

  // Safely extract all text blocks and join them
  let result = '';
  if (Array.isArray(response.content)) {
    result = response.content
      .filter((block: any) => block.type === 'text' && typeof block.text === 'string')
      .map((block: any) => block.text)
      .join('\n');
  } else if (typeof response.content === 'string') {
    result = response.content;
  }

  if (!result) {
    console.warn('Claude response had no text block:', response.content);
    return 'No response from Claude.';
  }
  return result;
}
