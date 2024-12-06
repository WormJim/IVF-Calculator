"use server";

import Papa from "papaparse";
import fs from "fs";

import { FormulaRecord, Pregnancies, UserParams } from "../types";
import { redirect } from "next/navigation";

export default async function calculateUserInputs(formData: FormData) {
  const inputs = Object.fromEntries(formData); // TODO: Define

  const formula = chooseFormula({
    ownEggs: inputs.user_eggSource === "Own",
    known: !inputs.user_donotknow, // If value, user doesn't know, otherwise assume they know
    attempted: Boolean(Number(inputs.user_ivfUsed)),
  });

  if (!formula) {
    return; // TODO: Something went wrong
  }

  const score = calculateScore(formula, inputs);

  const successRate = calculateSuccessRate(score);

  redirect(`/success?rate=${successRate}`);
}

const chooseFormula = (param: UserParams): FormulaRecord | undefined => {
  const { data: formulas, errors } = getIVFFormulas();

  if (errors.length) {
    return; // TODO: Handle file fetched error
  }

  return formulas.find(
    (r) =>
      r.param_using_own_eggs === (param.ownEggs ? "TRUE" : "FALSE") &&
      (r.param_attempted_ivf_previously === "N/A" ||
        r.param_attempted_ivf_previously ===
          (param.attempted ? "TRUE" : "FALSE")) &&
      r.param_is_reason_for_infertility_known ===
        (param.known ? "TRUE" : "FALSE")
  );

  function getIVFFormulas() {
    const fileContent = fs.readFileSync(
      "src/data/ivf_success_formulas.csv",
      "utf8"
    );

    return Papa.parse<FormulaRecord>(fileContent, {
      delimiter: ",",
      header: true,
    });
  }
};

const calculateScore = (
  formula: FormulaRecord,
  inputs: Record<string, unknown> // TODO: Define
): number => {
  const {
    user_weight: weight,
    user_feet: feet,
    user_inches: inches,
    user_age: age,
    user_tubal: tubal,
    user_male_factor: male,
    user_endometriosis: endometriosis,
    user_pco: ovulatoryDisorder,
    user_diminished_ovarian_reserve: ovarianReserve,
    user_uterine: uterine,
    user_other: other,
    user_unexplained: infertility,
    user_gravida: gravida,
    user_live_births: liveBirth,
  } = inputs;

  const bmi = calcBMI(
    Number(weight),
    totalInches(Number(feet), Number(inches))
  );

  const factors = [
    { condition: true, value: formula.formula_intercept },
    { condition: true, value: calcAgeFactor(Number(age), formula) },
    { condition: true, value: calcBMIFactor(bmi, formula) },
    { condition: tubal, value: formula.formula_tubal_factor_true_value },
    { condition: !tubal, value: formula.formula_tubal_factor_false_value },
    {
      condition: male,
      value: formula.formula_male_factor_infertility_true_value,
    },
    {
      condition: !male,
      value: formula.formula_male_factor_infertility_false_value,
    },
    {
      condition: endometriosis,
      value: formula.formula_endometriosis_true_value,
    },
    {
      condition: !endometriosis,
      value: formula.formula_endometriosis_false_value,
    },
    {
      condition: ovulatoryDisorder,
      value: formula.formula_ovulatory_disorder_true_value,
    },
    {
      condition: !ovulatoryDisorder,
      value: formula.formula_ovulatory_disorder_false_value,
    },
    {
      condition: ovarianReserve,
      value: formula.formula_diminished_ovarian_reserve_true_value,
    },
    {
      condition: !ovarianReserve,
      value: formula.formula_diminished_ovarian_reserve_false_value,
    },
    { condition: uterine, value: formula.formula_uterine_factor_true_value },
    {
      condition: !uterine,
      value: formula.formula_uterine_factor_false_value,
    },
    { condition: other, value: formula.formula_other_reason_true_value },
    { condition: !other, value: formula.formula_other_reason_false_value },
    {
      condition: infertility,
      value: formula.formula_unexplained_infertility_true_value,
    },
    {
      condition: !infertility,
      value: formula.formula_unexplained_infertility_false_value,
    },
    {
      condition: true,
      value: getGravidaFactor(formula, gravida as Pregnancies),
    },
    {
      condition: liveBirth,
      value: getBirthFactor(formula, liveBirth as Pregnancies),
    },
  ];

  const score = factors
    .filter((factor) => factor.condition)
    .reduce((sum, factor) => sum + Number(factor.value), 0);

  return score;

  /**   Utility Functions  */

  function totalInches(feet: number, inches: number): number {
    return feet * 12 + inches;
  }

  function calcBMI(weight: number, height: number): number {
    return (weight / Math.pow(height, 2)) * 703; // BMI is calculated in lbs/in² * 703.
  }

  function calcAgeFactor(age: number, formula: FormulaRecord): number {
    return (
      Number(formula.formula_age_linear_coefficient) * age +
      Number(formula.formula_age_power_coefficient) *
        Math.pow(age, Number(formula.formula_age_power_factor))
    );
  }

  function calcBMIFactor(bmi: number, formula: FormulaRecord): number {
    return (
      Number(formula.formula_bmi_linear_coefficient) * bmi +
      Number(formula.formula_bmi_power_coefficient) *
        Math.pow(bmi, Number(formula.formula_bmi_power_factor))
    );
  }

  function getGravidaFactor(
    formula: FormulaRecord,
    userGravida: Pregnancies
  ): number {
    const keyMap: Record<Pregnancies, keyof FormulaRecord> = {
      "0": "formula_prior_pregnancies_0_value",
      "1": "formula_prior_pregnancies_1_value",
      "2+": "formula_prior_pregnancies_2+_value",
    };
    return Number(formula[keyMap[userGravida]]);
  }

  function getBirthFactor(
    formula: FormulaRecord,
    liveBirths: Pregnancies
  ): number {
    const keyMap: Record<Pregnancies, keyof FormulaRecord> = {
      "0": "formula_prior_live_births_0_value",
      "1": "formula_prior_live_births_1_value",
      "2+": "formula_prior_live_births_2+_value",
    };
    return Number(formula[keyMap[liveBirths]]);
  }
};

const calculateSuccessRate = (score: number): string => {
  const eulerConstant = 2.71828;
  const exponent = Math.pow(eulerConstant, score);
  const rate = exponent / (1 + exponent);
  return (rate * 100).toFixed(2) + "%";
};
