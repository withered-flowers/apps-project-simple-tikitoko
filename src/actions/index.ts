import { defineAction, z } from "astro:actions";

export const server = {
	calculate: defineAction({
		accept: "form",
		input: z.object({
			nama: z.string(),
			usia: z.number(),
			jenisKelamin: z.string(),
			tinggi: z.number(),
			berat: z.number(),
		}),
		handler: async (data) => {
			console.log(data);
		},
	}),
};
