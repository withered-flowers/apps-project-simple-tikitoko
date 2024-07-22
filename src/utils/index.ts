import { ActivityLevel, type Gender } from "../types";

export const calculateBMI = (weight: number, height: number): number => {
	return weight / (height / 100) ** 2;
};

export const interpretBMI = (BMI: number): string => {
	if (BMI < 16) {
		return "Severely underweight";
	}

	if (BMI < 16.9) {
		return "Underweight";
	}

	if (BMI < 24.9) {
		return "Normal weight";
	}

	if (BMI < 29.9) {
		return "Overweight";
	}

	if (BMI < 34.9) {
		return "Obesity class 1";
	}

	if (BMI < 39.9) {
		return "Obesity class 2";
	}

	return "Obesity class 3";
};

export const calculateMinimumWeight = (height: number): number => {
	return 18.5 * (height / 100) ** 2;
};

export const calculateIdealWeight = (height: number): number => {
	return 22 * (height / 100) ** 2;
};

export const calculateMaximumWeight = (height: number): number => {
	return 24.9 * (height / 100) ** 2;
};

export const calculateWeight = (
	height: number,
): { min: number; max: number; ideal: number } => {
	return {
		min: calculateMinimumWeight(height),
		max: calculateMaximumWeight(height),
		ideal: calculateIdealWeight(height),
	};
};

// Calculate BMR based on Harris-Benedict equation
export const calculateBMR = (
	weight: number,
	height: number,
	age: number,
	gender: Gender,
): number => {
	return gender === "M"
		? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
		: 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
};

// Calculate TDEE based on BMR and activity level
export const calculateTDEE = (
	BMR: number,
	activityLevel: ActivityLevel,
): number => {
	return BMR * activityLevel;
};

export const calculateWaterIntake = (
	weight: number,
	activityLevel: ActivityLevel,
): number => {
	let waterIntakeMultiplier = 0;

	switch (activityLevel) {
		case ActivityLevel.Sedentary:
			waterIntakeMultiplier = 0.03;
			break;
		case ActivityLevel.LightlyActive:
			waterIntakeMultiplier = 0.035;
			break;
		case ActivityLevel.ModeratelyActive:
			waterIntakeMultiplier = 0.04;
			break;
		case ActivityLevel.VeryActive:
			waterIntakeMultiplier = 0.045;
			break;
		case ActivityLevel.ExtremelyActive:
			waterIntakeMultiplier = 0.05;
			break;
	}

	return weight * waterIntakeMultiplier;
};
