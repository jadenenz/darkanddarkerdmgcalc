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

  type CalculationResult = {
    head: number
    body: number
    limb: number
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

  const [agility, setAgility] = useState("15")
  const [strength, setStrength] = useState("15")
  const [will, setWill] = useState("15")
  const [knowledge, setKnowledge] = useState("15")
  const [baseDamage, setBaseDamage] = useState("24")
  const [additionalDamage, setAdditionalDamage] = useState("0")
  const [trueDamage, setTrueDamage] = useState("0")
  const [weaponOrMagicDamage, setWeaponOrMagicDamage] = useState("0")
  const [physicalPower, setPhysicalPower] = useState("0")
  const [magicalPower, setMagicalPower] = useState("0")
  const [targetArmorRating, setTargetArmorRating] = useState("0")
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

  const armorRatingBrackets = [
    {
      start: -300,
      end: -3,
      min: -619,
      max: -25,
      step: 2,
    },
    {
      start: -3,
      end: 22,
      min: -25,
      max: 0,
      step: 1,
    },
    {
      start: 22,
      end: 31,
      min: 0,
      max: 4.5,
      step: 0.5,
    },
    {
      start: 31,
      end: 42,
      min: 4.5,
      max: 8.9,
      step: 0.4,
    },
    {
      start: 42,
      end: 52,
      min: 8.9,
      max: 11.9,
      step: 0.3,
    },
    {
      start: 52,
      end: 62,
      min: 11.9,
      max: 13.9,
      step: 0.2,
    },
    {
      start: 62,
      end: 112,
      min: 13.9,
      max: 18.9,
      step: 0.1,
    },
    {
      start: 112,
      end: 175,
      min: 18.9,
      max: 31.5,
      step: 0.2,
    },
    {
      start: 175,
      end: 262,
      min: 31.5,
      max: 57.6,
      step: 0.3,
    },
    {
      start: 262,
      end: 317,
      min: 57.6,
      max: 68.6,
      step: 0.2,
    },
    {
      start: 317,
      end: 400,
      min: 68.6,
      max: 76.9,
      step: 0.1,
    },
    {
      start: 400,
      end: 424,
      min: 76.9,
      max: 78.1,
      step: 0.05,
    },
    {
      start: 424,
      end: 450,
      min: 78.1,
      max: 78.75,
      step: 0.025,
    },
    {
      start: 450,
      end: 500,
      min: 78.75,
      max: 79.75,
      step: 0.02,
    },
  ]

  function calculatePowerBonus(): number {
    const powerBonus = parseInt(strength) + parseInt(physicalPower)
    //Find which stat bracket the power bonus falls into
    const bracket = physPowerBonusBrackets.find(
      (b) => b.start <= powerBonus && b.end >= powerBonus
    )
    if (typeof bracket !== "undefined") {
      return bracket.max - (bracket.end - powerBonus) * bracket.step
    }
    if (powerBonus >= 100) {
      return 60
    }
    //default case should not ever be reached -- change to throw error?
    return 0
  }

  function calculatePhysicalDamageReduction(): number {
    const armorRating = parseInt(targetArmorRating)
    const bracket = armorRatingBrackets.find(
      (b) => b.start <= armorRating && b.end >= armorRating
    )
    if (typeof bracket !== "undefined") {
      return bracket.max - (bracket.end - armorRating) * bracket.step
    }
    if (armorRating >= 500) {
      return 80
    }
    //default case should not ever be reached
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

  const calculateDmg = (projectileReduction: number): CalculationResult => {
    const totalBaseDmg = parseInt(baseDamage) + parseInt(weaponOrMagicDamage)
    const finalPowerBonusMultiplier = calculatePowerBonus() / 100
    const additionalDmg = parseInt(additionalDamage)
    const trueDmg = parseInt(trueDamage)
    const headshotMultiplier = 1.5
    const bodyshotMultiplier = 1
    const limbshotMultiplier = 0.5
    const dmgReduction = calculatePhysicalDamageReduction() / 100

    const result = {
      head: Math.round(
        (totalBaseDmg * finalPowerBonusMultiplier +
          totalBaseDmg +
          additionalDmg) *
          headshotMultiplier *
          (1 - dmgReduction) *
          projectileReduction +
          trueDmg
      ),
      body: Math.round(
        (totalBaseDmg * finalPowerBonusMultiplier +
          totalBaseDmg +
          additionalDmg) *
          bodyshotMultiplier *
          (1 - dmgReduction) *
          projectileReduction +
          trueDmg
      ),
      limb: Math.round(
        (totalBaseDmg * finalPowerBonusMultiplier +
          totalBaseDmg +
          additionalDmg) *
          limbshotMultiplier *
          (1 - dmgReduction) *
          projectileReduction +
          trueDmg
      ),
    }

    return result
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
      <form className="flex gap-4 flex-col">
        <label className="text-white">Strength</label>
        <input
          className="text-black"
          value={strength}
          onChange={(e) => handleChangeState(e, setStrength)}
        />

        <label className="text-white">Agility</label>
        <input
          className="text-black"
          value={agility}
          onChange={(e) => handleChangeState(e, setAgility)}
        />

        <label className="text-white">Will</label>
        <input
          className="text-black"
          value={will}
          onChange={(e) => handleChangeState(e, setWill)}
        />

        <label className="text-white">Knowledge</label>
        <input
          className="text-black"
          value={knowledge}
          onChange={(e) => handleChangeState(e, setKnowledge)}
        />

        <label className="text-white">Base Weapon Damage</label>
        <input
          className="text-black"
          value={baseDamage}
          onChange={(e) => handleChangeState(e, setBaseDamage)}
        />

        <label className="text-white">Additional Weapon Damage</label>
        <input
          className="text-black"
          value={weaponOrMagicDamage}
          onChange={(e) => handleChangeState(e, setWeaponOrMagicDamage)}
        />

        <label className="text-white">Additional Damage</label>
        <input
          className="text-black"
          value={additionalDamage}
          onChange={(e) => handleChangeState(e, setAdditionalDamage)}
        />

        <label className="text-white">True Damage</label>
        <input
          className="text-black"
          value={trueDamage}
          onChange={(e) => handleChangeState(e, setTrueDamage)}
        />

        <label className="text-white">Physical Power</label>
        <input
          className="text-black"
          value={physicalPower}
          onChange={(e) => handleChangeState(e, setPhysicalPower)}
        />

        <label className="text-white">Magical Power</label>
        <input
          className="text-black"
          value={magicalPower}
          onChange={(e) => handleChangeState(e, setMagicalPower)}
        />

        <label className="text-white">Target&apos;s Armor Rating</label>
        <input
          className="text-black"
          value={targetArmorRating}
          onChange={(e) => handleChangeState(e, setTargetArmorRating)}
        />

        {/* <select ("class")></form>
          <option value="fighter">fighter</option>
          <option value="wizard">wizard</option>
          <option value="rogue">rogue</option>
        </select> */}
      </form>
      <div className="text-white">
        Calculated dmg is: Head - {calculateDmg(1).head}, Body -{" "}
        {calculateDmg(1).body}, Limb - {calculateDmg(1).limb}
      </div>
      <div className="text-white">
        Calculated power bonus is {calculatePowerBonus()}
        <br />
        Calculated pdr is{" "}
        {Math.round(calculatePhysicalDamageReduction() * 100) / 100 + "%"}
      </div>
      <div className="text-white">
        Strength: {strength} {typeof strength}
      </div>
    </div>
  )
}

//-- FORMULA --//
// (((( Base Damage + Weapon/Magical Damage) * Power Bonus) + Additional Damage) * Location Bonus * Damage Reduction * Projectile Reduction) + True Damage
