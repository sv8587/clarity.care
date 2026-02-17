export async function translateMedicalText(text: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    simpleExplanation:
      "This is a simplified explanation of the medical condition. It explains the diagnosis in easy language for better understanding.",

    summary:
      "• Condition explained simply\n• No complex medical terms\n• Clear and structured output",

    dosAndDonts:
      "Do: Follow doctor's advice\nDo: Take prescribed medicines\nDon't: Self-medicate\nDon't: Ignore worsening symptoms",

    reassurance:
      "This condition is manageable. With proper care and guidance from a healthcare professional, most patients recover well.",

    questionsToAsk:
      "1. What symptoms should I monitor?\n2. How long will recovery take?\n3. Are there lifestyle changes I should make?"
  };
}
