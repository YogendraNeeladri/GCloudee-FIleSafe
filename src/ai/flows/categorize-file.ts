// categorize-file.ts
'use server';
/**
 * @fileOverview A file categorization AI agent.
 *
 * - categorizeFile - A function that handles the file categorization process.
 * - CategorizeFileInput - The input type for the categorizeFile function.
 * - CategorizeFileOutput - The return type for the categorizeFile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeFileInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "The uploaded file's data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  filename: z.string().describe('The name of the uploaded file.'),
});
export type CategorizeFileInput = z.infer<typeof CategorizeFileInputSchema>;

const CategorizeFileOutputSchema = z.object({
  category: z.string().describe('The predicted category of the file based on its content.'),
  confidence: z.number().describe('The confidence level of the categorization, from 0 to 1.'),
});
export type CategorizeFileOutput = z.infer<typeof CategorizeFileOutputSchema>;

export async function categorizeFile(input: CategorizeFileInput): Promise<CategorizeFileOutput> {
  return categorizeFileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeFilePrompt',
  input: {schema: CategorizeFileInputSchema},
  output: {schema: CategorizeFileOutputSchema},
  prompt: `You are an expert file categorization AI.

You will analyze the content of the uploaded file and determine the most appropriate category for it.

Filename: {{{filename}}}
Content: {{media url=fileDataUri}}

Consider categories such as:
- Documents (e.g., reports, presentations, spreadsheets)
- Images (e.g., photos, graphics)
- Audio (e.g., music, recordings)
- Video (e.g., movies, clips)
- Archives (e.g., ZIP, RAR)
- Code (e.g., source code files)
- Other

Based on the content, provide a category and a confidence level (0 to 1) for your prediction.

Output in JSON format:
{
  "category": "[predicted category]",
  "confidence": [confidence level]
}
`,
});

const categorizeFileFlow = ai.defineFlow(
  {
    name: 'categorizeFileFlow',
    inputSchema: CategorizeFileInputSchema,
    outputSchema: CategorizeFileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
