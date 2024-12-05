import calculateUserInputs from "@/lib/actions/calculateUserInputs";

export default function Home() {
  return (
    <div>
      <form action={calculateUserInputs} id="background" name="user_background">
        <br />

        <label htmlFor="age">How old are you?</label>
        <input
          id="age"
          name="user_age"
          type="number"
          min="20"
          max="50"
          placeholder="Enter age between 20 and 50 years"
          className="border-2 w-full"
          required
        />

        <br />
        <br />

        <label htmlFor="weight">How much do you weigh?</label>
        <input
          id="weight"
          name="user_weight"
          type="number"
          min="80"
          max="300"
          placeholder="Enter weight between 80-300 lbs"
          className="border-2 w-full"
          required
        />

        <br />
        <br />

        <label htmlFor="feet">How Tall are you</label>
        <div>
          <input
            id="feet"
            name="user_feet"
            type="number"
            min="4"
            max="6"
            className="border-2 w-full"
            placeholder="feet"
            required
          />
          <input
            id="inches"
            name="user_inches"
            type="number"
            min="0"
            max="11"
            className="border-2 w-full"
            placeholder="inches"
            required
          />
        </div>

        <br />

        <label htmlFor="ivfUsed">
          How many times have you used IVF in the past (include all cycles, even
          those not resulting in pregnancy)?
        </label>
        <select
          id="ivfUsed"
          name="user_ivfUsed"
          className="border-2 w-full"
          required>
          <option value="invalid" disabled>
            -- select an option --
          </option>
          <option value="0">I’ve never used IVF</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3 or more</option>
        </select>

        <br />
        <br />

        <label htmlFor="gravida">
          How many prior pregnancies have you had?
        </label>
        <select
          id="gravida"
          name="user_gravida"
          className="border-2 w-full"
          required>
          <option value="invalid" disabled>
            -- select an option --
          </option>
          <option value="0">None</option>
          <option value="1">1</option>
          <option value="2+">2 or more</option>
        </select>

        <br />
        <br />

        <label htmlFor="live_births">How many prior births have you had?</label>
        <select
          id="live_births"
          name="user_live_births"
          className="border-2 w-full"
          required>
          <option disabled value="invalid">
            -- select an option --
          </option>
          <option value="0">None</option>
          <option value="1">1</option>
          <option value="2+">2 or more</option>
        </select>

        <br />
        <br />

        <fieldset>
          <legend>
            What is the reason you are using IVF? (select all that apply)
            <span id="diagnosisError"></span>
          </legend>
          <div>
            <input
              type="checkbox"
              id="male_factor"
              name="user_male_factor"
              value="male_factor"
            />
            <label htmlFor="male_factor">Male factor infertility</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="endometriosis"
              name="user_endometriosis"
              value="endometriosis"
            />
            <label htmlFor="endometriosis">Endometriosis</label>
          </div>
          <div>
            <input type="checkbox" id="tubal" name="user_tubal" value="tubal" />
            <label htmlFor="tubal">Tubal factor</label>
          </div>
          <div>
            <input type="checkbox" id="pco" name="user_pco" value="pco" />
            <label htmlFor="pco">Ovulatory disorder (including PCOS)</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="diminished_ovarian_reserve"
              name="user_diminished_ovarian_reserve"
              value="diminished_ovarian_reserve"
            />
            <label htmlFor="diminished_ovarian_reserve">
              Diminished ovarian reserve
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="uterine"
              name="user_uterine"
              value="uterine"
            />
            <label htmlFor="uterine">Uterine factor</label>
          </div>
          <div>
            <input type="checkbox" id="other" name="user_other" value="other" />
            <label htmlFor="other">Other reason</label>
          </div>
          <p>(Or)</p>
          <div>
            <input
              type="checkbox"
              id="unexplained"
              name="user_unexplained"
              value="unexplained"
            />
            <label htmlFor="unexplained">
              Unexplained (Idiopathic) infertility
            </label>
          </div>
          <p>(Or)</p>
          <div>
            <input
              type="checkbox"
              id="donotknow"
              name="user_donotknow"
              value="donotknow"
            />
            <label htmlFor="donotknow">I don’t know/no reason</label>
          </div>
        </fieldset>

        <br />

        <label htmlFor="eggSource">
          Do you plan to use your own eggs or donor eggs?
        </label>
        <select
          id="eggSource"
          name="user_eggSource"
          className="border-2 w-full"
          required>
          <option disabled value="invalid">
            -- select an option --
          </option>
          <option value="Own">My own eggs</option>
          <option value="Donor">Donor eggs</option>
        </select>

        <br />
        <br />

        <button type="submit" className="border-2 px-8 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
