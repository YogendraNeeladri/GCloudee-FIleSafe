"use server";

import { categorizeFile, type CategorizeFileInput } from "@/ai/flows/categorize-file";

export async function getCategoryForFile(
  input: CategorizeFileInput
): Promise<{ category: string; confidence: number; error?: string }> {
  try {
    const result = await categorizeFile(input);
    return {
      category: result.category,
      confidence: result.confidence,
    };
  } catch (e) {
    console.error(e);
    return {
      category: "Other",
      confidence: 0,
      error: "Failed to categorize file.",
    };
  }
}
