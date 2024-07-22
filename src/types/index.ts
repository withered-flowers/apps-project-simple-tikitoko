import { z } from "astro/zod";

export type Gender = "M" | "F";

export enum ActivityLevel {
	Sedentary = 1.2,
	LightlyActive = 1.375,
	ModeratelyActive = 1.55,
	VeryActive = 1.725,
	ExtremelyActive = 1.9,
}

export const FormInputSchema = z.object({
	nama: z.string(),
	usia: z.number(),
	jenisKelamin: z.enum(["M", "F"]),
	tinggi: z.number(),
	berat: z.number(),
});

export type FormInputSchemaType = z.infer<typeof FormInputSchema>;

export type FormResponseBodyType = FormInputSchemaType & {
	bmr: string;
	bmi: string;
	bmiConclusion: string;
	tdee: string;
};

export type FormResponseType = {
	status: number;
	headers: Record<string, string>;
	body: FormResponseBodyType | string;
};
