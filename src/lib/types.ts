export type UserParams = {
  attempted: boolean;
  known: boolean;
  ownEggs: boolean;
};

export type Pregnancies = "0" | "1" | "2+";

type BoolChoice = "TRUE" | "FALSE";

export type FormulaRecord = {
  /** Defined User Params */
  param_using_own_eggs: BoolChoice;
  param_attempted_ivf_previously: BoolChoice | "N/A";
  param_is_reason_for_infertility_known: BoolChoice;

  /** Formula Definition */
  cdc_formula: "1-3" | "4-6" | "7-8" | "9-10" | "11-13" | "14-16";

  /** Formula Calculations */
  formula_intercept: string;
  formula_age_linear_coefficient: string;
  formula_age_power_coefficient: string;
  formula_age_power_factor: string;
  formula_bmi_linear_coefficient: string;
  formula_bmi_power_coefficient: string;
  formula_bmi_power_factor: string;
  formula_tubal_factor_true_value: string;
  formula_tubal_factor_false_value: string;
  formula_male_factor_infertility_true_value: string;
  formula_male_factor_infertility_false_value: string;
  formula_endometriosis_true_value: string;
  formula_endometriosis_false_value: string;
  formula_ovulatory_disorder_true_value: string;
  formula_ovulatory_disorder_false_value: string;
  formula_diminished_ovarian_reserve_true_value: string;
  formula_diminished_ovarian_reserve_false_value: string;
  formula_uterine_factor_true_value: string;
  formula_uterine_factor_false_value: string;
  formula_other_reason_true_value: string;
  formula_other_reason_false_value: string;
  formula_unexplained_infertility_true_value: string;
  formula_unexplained_infertility_false_value: string;
  formula_prior_pregnancies_0_value: string;
  formula_prior_pregnancies_1_value: string;
  "formula_prior_pregnancies_2+_value": string;
  formula_prior_live_births_0_value: string;
  formula_prior_live_births_1_value: string;
  "formula_prior_live_births_2+_value": string;
};
