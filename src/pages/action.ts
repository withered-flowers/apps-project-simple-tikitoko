import {
	ActivityLevel,
	FormInputSchema,
	type FormResponseType,
} from "../types";
import {
	calculateBMI,
	calculateBMRHarrisBenedict,
	calculateDeltaWeightFromIdeal,
	calculateDietDuration,
	calculateTDEE,
	calculateWaterIntake,
	calculateWeight,
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
		aktivitas: data.get("aktivitas"),
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
	const bmr = Math.round(
		calculateBMRHarrisBenedict(
			result.data.berat,
			result.data.tinggi,
			result.data.usia,
			result.data.jenisKelamin,
		),
	);

	const bmi = calculateBMI(result.data.berat, result.data.tinggi);
	const interpretBMIResult = interpretBMI(bmi);
	const tdee = Math.round(
		calculateTDEE(bmr, ActivityLevel[result.data.aktivitas]),
	);
	const weightInfo = calculateWeight(result.data.tinggi);
	const deltaWeightInfo = calculateDeltaWeightFromIdeal(
		result.data.tinggi,
		result.data.berat,
	);
	const waterIntake = calculateWaterIntake(
		result.data.berat,
		ActivityLevel.VeryActive,
	);

	// Underweight: BMR + 500
	// Overweight: BMR - 300
	const dailyCalorieIntake = deltaWeightInfo < 0 ? bmr + 500 : bmr - 300;

	const dietDuration = calculateDietDuration(deltaWeightInfo);

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
			tdee: tdee.toString(),
			dailyCalorieIntake: dailyCalorieIntake.toString(),
			weightInfo: {
				min: Math.round(weightInfo.min).toString(),
				max: Math.round(weightInfo.max).toString(),
				ideal: Math.round(weightInfo.ideal).toString(),
				deltaFromIdeal: deltaWeightInfo.toString(),
			},
			dietDuration: dietDuration.toString(),
			waterIntake: waterIntake.toFixed(1),
		},
	};
};
