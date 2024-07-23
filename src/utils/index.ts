import { ActivityLevel, type Gender } from "../types";

export const calculateBMI = (weight: number, height: number): number => {
	return weight / (height / 100) ** 2;
};

export const interpretBMI = (BMI: number): string => {
	if (BMI < 16) {
		return "Bobot Terlalu Rendah";
	}

	if (BMI < 16.9) {
		return "Sangat Kurang Bobot";
	}

	if (BMI < 18.4) {
		return "Kurang Bobot";
	}

	if (BMI < 24.9) {
		return "Normal";
	}

	if (BMI < 29.9) {
		return "Kelebihan Bobot";
	}

	if (BMI < 34.9) {
		return "Obesitas Kelas I";
	}

	if (BMI < 39.9) {
		return "Obesitas Kelas 2";
	}

	return "Obesitas Kelas 3";
};

export const calculateMinimumWeight = (height: number): number => {
	// return 18.5 * (height / 100) ** 2;
	return height - 108;
};

export const calculateIdealWeight = (height: number): number => {
	return 22 * (height / 100) ** 2;
};

export const calculateMaximumWeight = (height: number): number => {
	// return 24.9 * (height / 100) ** 2;
	return height - 102;
};

export const calculateWeight = (
	height: number,
): { min: number; max: number; ideal: number } => {
	const min = calculateMinimumWeight(height);
	const max = calculateMaximumWeight(height);
	const ideal = calculateIdealWeight(height);

	return {
		min,
		max,
		ideal,
	};
};

export const calculateDeltaWeightFromIdeal = (
	height: number,
	currentWeight: number,
): number => {
	const ideal = calculateIdealWeight(height);
	return Math.round(currentWeight - ideal);
};

// Calculate BMR based on Harris-Benedict equation
export const calculateBMRHarrisBenedict = (
	weight: number,
	height: number,
	age: number,
	gender: Gender,
): number => {
	return gender === "M"
		? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
		: 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
};

// Calculate BMR based on Mifflin-St Jeor equation
export const calculateBMRMifflinStJeor = (
	weight: number,
	height: number,
	age: number,
): number => {
	return 10 * weight + 6.25 * height - 5 * age + 5;
};

// Calculate TDEE based on BMR and activity level
export const calculateTDEE = (
	BMR: number,
	activityLevel: ActivityLevel,
): number => {
	return BMR * activityLevel;
};

export const calculateDietDuration = (deltaWeightInfo: number): number => {
	// Positif = Overweight = 5 kg per 1 bulan
	// Negatif = Underweight = 2 kg per 1 bulan
	const duration = Math.abs(deltaWeightInfo) / (deltaWeightInfo > 0 ? 5 : 2);

	return Math.round(duration);
};

export const calculateWaterIntake = (
	weight: number,
	activityLevel: ActivityLevel,
): number => {
	let waterIntakeMultiplier = 0;

	if (activityLevel === ActivityLevel.Sedentary) {
		waterIntakeMultiplier = 0.03;
	} else if (activityLevel === ActivityLevel.LightlyActive) {
		waterIntakeMultiplier = 0.035;
	} else if (activityLevel === ActivityLevel.ModeratelyActive) {
		waterIntakeMultiplier = 0.04;
	} else if (activityLevel === ActivityLevel.VeryActive) {
		waterIntakeMultiplier = 0.045;
	} else if (activityLevel === ActivityLevel.ExtremelyActive) {
		waterIntakeMultiplier = 0.05;
	}

	return weight * waterIntakeMultiplier;
};
