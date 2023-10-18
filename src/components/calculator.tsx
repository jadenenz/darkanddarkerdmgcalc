import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

export default function Calculator() {
  enum ClassEnum {
    fighter = "fighter",
    cleric = "cleric",
    rogue = "rogue",
    bard = "bard",
    wizard = "wizard",
    warlock = "warlock",
    ranger = "ranger",
    barbarian = "barbarian",
    // druid = "druid"
  }

  // type Inputs = {
  //   strength: number
  //   agility: number
  //   will: number
  //   knowledge: number
  //   weaponDamage: number
  //   additionalDamage: number
  //   trueDamage: number
  //   class: ClassEnum
  // }

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>()
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const [agility, setAgility] = useState("")
  const [strength, setStrength] = useState("")
  const [will, setWill] = useState("")
  const [knowledge, setKnowledge] = useState("")
  const [physicalPowerFromGear, setPhysicalPowerFromGear] = useState("3")
  const [baseDamage, setBaseDamage] = useState("")
  // const [resourcefulness, setResourcefulness] = useState(0)

  //Defines the brackets of phyiscal power bonus by the beginning and end value of the bracket, the
  //minimum and maximum bonus they provide, and how much each point increases the bonus within the bracket.
  const physPowerBonusBrackets = [
    {
      start: 0,
      end: 5,
      min: -80,
      max: -30,
      step: 10,
    },
    {
      start: 5,
      end: 7,
      min: -30,
      max: -20,
      step: 5,
    },
    {
      start: 7,
      end: 11,
      min: -20,
      max: -8,
      step: 3,
    },
    {
      start: 11,
      end: 15,
      min: -8,
      max: 0,
      step: 2,
    },
    {
      start: 15,
      end: 50,
      min: 0,
      max: 35,
      step: 1,
    },
    {
      start: 50,
      end: 100,
      min: 35,
      max: 60,
      step: 0.5,
    },
  ]

  function calculatePowerBonus(): number {
    const powerBonus = parseInt(strength) + parseInt(physicalPowerFromGear)
    //Find which stat bracket the power bonus falls into
    const bracket = physPowerBonusBrackets.find(
      (b) => b.start <= powerBonus && b.end >= powerBonus
    )
    if (typeof bracket !== "undefined") {
      return bracket.max - (bracket.end - powerBonus) * bracket.step
    }
    //default case should not ever be reached -- change to throw error?
    return 0
  }

  // first implementation idea -- it works but its clunky
  // --------------------------------------------------------
  // const calculatePowerBonus = (): number => {
  //   const powerBonus = strength + physicalPowerFromGear
  //   //If powerBonus is between 15 and 50
  //   if (powerBonus >= 15 && powerBonus <= 50){
  //     //subtract the powerBonus from the max in the stat range, then subtract that from the maximum bonus from that range
  //    return 35 - (50 - powerBonus)
  //    //ex: 35 - (50 - 17) = 35 - 33 = 2% power bonus
  //   }

  //   //default if value is 0
  //   return -0.8
  // }

  const calculateDmg = (
    WpnOrMagDmgFromGear: number,
    additionalDmg: number,
    locationBonus: number,
    dmgReduction: number,
    projectileReduction: number,
    trueDmg: number
  ): number => {
    const totalBaseDmg = parseInt(baseDamage) + WpnOrMagDmgFromGear
    const finalPowerBonusMultiplier = calculatePowerBonus() / 100

    return (
      (totalBaseDmg * finalPowerBonusMultiplier +
        totalBaseDmg +
        additionalDmg) *
        locationBonus *
        dmgReduction *
        projectileReduction +
      trueDmg
    )
  }

  function handleChangeStrength(e: React.ChangeEvent<HTMLInputElement>): void {
    //If the string parsed as an integer is a number
    if (!isNaN(parseInt(e.target.value))) {
      setStrength(e.target.value)
    } else if (e.target.value === "") {
      setStrength("")
    }
  }

  function handleChangeState(
    e: React.ChangeEvent<HTMLInputElement>,
    stateSetter: React.Dispatch<React.SetStateAction<string>>
  ) {
    //If the string parsed as an integer is a number
    if (!isNaN(parseInt(e.target.value))) {
      stateSetter(e.target.value)
    } else if (e.target.value === "") {
      stateSetter("")
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <form>
        <label>Strength</label>
        <input
          className="text-black"
          value={strength}
          onChange={(e) => handleChangeState(e, setStrength)}
        />

        <label>Agility</label>
        <input
          className="text-black"
          value={agility}
          onChange={(e) => handleChangeState(e, setAgility)}
        />

        <label>Will</label>
        <input type="number" className="text-black" />

        <label>Knowledge</label>
        <input type="number" className="text-black" />

        <label>Weapon Damage</label>
        <input
          // type="number"
          className="text-black"
          value={baseDamage}
          // onChange={(e) => setBaseDamage(parseInt(e.target.value))}
          // onBlur={handleBlurBaseDamage}
        />

        <label>Additional Damage</label>
        <input type="number" className="text-black" />

        <label>True Damage</label>
        <input type="number" className="text-black" />

        {/* <select ("class")></form>
          <option value="fighter">fighter</option>
          <option value="wizard">wizard</option>
          <option value="rogue">rogue</option>
        </select> */}
      </form>
      <div>Calculated dmg is: {calculateDmg(0, 0, 1, 1, 1, 0)}</div>
      <div>Calculated power bonus is {calculatePowerBonus()}</div>
      <div>
        Strength: {strength} {typeof strength}
      </div>
    </div>
  )
}

//-- FORMULA --//
// (((( Base Damage + Weapon/Magical Damage) * Power Bonus) + Additional Damage) * Location Bonus * Damage Reduction * Projectile Reduction) + True Damage
