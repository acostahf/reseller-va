import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
	const res = await request.json();

	const { title, ebayLink } = res;
	const prompt = `Create an engaging eBay title and description for the following item. Keep the description informative and appealing, suitable for an eBay listing.\n\nItem Title: ${title}\nEbay Link: ${ebayLink}\n\nGenerated eBay Title and Description:\n Response should be formatted like "Title: [title here], Description: [description here]"`;

	try {
		const chatCompletion = await openai.chat.completions.create({
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			model: "gpt-4",
		});

		// Extract title and description from the response
		const responseContent = chatCompletion.choices[0].message.content;
		if (responseContent != null) {
			const splitContent = responseContent.split("Description: ");
			const generatedTitle = splitContent[0].replace("Title: ", "").trim();
			const generatedDescription = splitContent[1].trim();

			let data = {
				title: generatedTitle,
				description: generatedDescription,
			};

			return Response.json(data);
		}
	} catch (error) {
		console.log("Openai route error:", error);
		return Response;
	}
}
