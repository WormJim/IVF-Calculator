This is a web form to calculate the Success Rate of an IVF Candidate. It is emulated from the [`CDC's IVF Calculator`](https://www.cdc.gov/art/ivf-success-estimator/index.html)

## Running

First, install dependencies

```bash
npm i
#or
npm install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the form.

## Debugging

This project comes with a debugging launch file for VSCode

You can choose to debug the server only `Next.js: debug server-side` or both server and Client using Edge (`EDGE: debug full stack`) or Chrome (`CHROME: debug full stack`)

Note: there isn't much to debug on the client

## Exampled Inputs

#### Using Own Eggs / Did Not Previously Attempt IVF / Known Infertility Reason

- Age: 32
- Weight: 150 lbs
- Height: 5'8"
- Previously Attempted IVF: FALSE
- Prior Pregnancies: 1
- Prior Live Births: 1
- Male Factor Infertility: FALSE
- Endometriosis: TRUE
- Tubal Factor: FALSE
- Ovulatory Disorder: TRUE
- Diminished Ovarian Reserve: FALSE
- Uterine Factor: FALSE
- Other Infertility Reason: FALSE
- Unexplained Infertility: FALSE
- Reason for Infertility Known: TRUE (Unchecked)
- Using Own Eggs: TRUE

#### Using Own Eggs / Did Not Previously Attempt IVF / Unknown Infertility Reason

- Age: 32
- Weight: 150 lbs
- Height: 5'8"
- Previously Attempted IVF: FALSE
- Prior Pregnancies: 1
- Prior Live Births: 1
- Male Factor Infertility: FALSE
- Endometriosis: FALSE
- Tubal Factor: FALSE
- Ovulatory Disorder: FALSE
- Diminished Ovarian Reserve: FALSE
- Uterine Factor: FALSE
- Other Infertility Reason: FALSE
- Unexplained Infertility: FALSE
- Reason for Infertility Known: FALSE (Checked)
- Using Own Eggs: TRUE

#### Using Own Eggs / Previously Attempted IVF / Known Infertility Reason

- Age: 32
- Weight: 150 lbs
- Height: 5'8"
- Previously Attempted IVF: TRUE
- Prior Pregnancies: 1
- Prior Live Births: 1
- Male Factor Infertility: FALSE
- Endometriosis: FALSE
- Tubal Factor: TRUE
- Ovulatory Disorder: FALSE
- Diminished Ovarian Reserve: TRUE
- Uterine Factor: FALSE
- Other Infertility Reason: FALSE
- Unexplained Infertility: FALSE
- Reason for Infertility Known: TRUE (Unchecked)
- Using Own Eggs: TRUE
