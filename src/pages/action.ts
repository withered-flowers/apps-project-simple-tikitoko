import {
	ActivityLevel,
	FormInputSchema,
	type FormResponseType,
} from "../types";
import {
	calculateBMI,
	calculateBMR,
	calculateTDEE,
	interpretBMI,
} from "../utils";

export const processResponse = async (
	request: Request,
): Promise<FormResponseType> => {
	const data = await request.formData();

	const objResponse = {
		nama: data.get("nama"),
		usia: Number(data.get("usia")),
		jenisKelamin: data.get("jenisKelamin"),
		tinggi: Number(data.get("tinggi")),
		berat: Number(data.get("berat")),
	};

	// Validasi Input
	const result = FormInputSchema.safeParse(objResponse);

	if (result.success === false) {
		return {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(result.error),
		};
	}

	// Hitung BMR dan BMI
	const bmr = Math.ceil(
		calculateBMR(
			result.data.berat,
			result.data.tinggi,
			result.data.usia,
			result.data.jenisKelamin,
		),
	);
	const bmi = calculateBMI(result.data.berat, result.data.tinggi);
	const interpretBMIResult = interpretBMI(bmi);
	const tdde = Math.ceil(calculateTDEE(bmr, ActivityLevel.Sedentary));

	return {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
		body: {
			...result.data,
			bmr: bmr.toString(),
			bmi: bmi.toFixed(2),
			bmiConclusion: interpretBMIResult,
			tdee: tdde.toString(),
		},
	};
};
