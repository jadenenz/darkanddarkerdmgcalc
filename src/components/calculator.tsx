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

  type DamageType = "p" | "m"

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
  const [magicalWeaponDamage, setMagicalWeaponDamage] = useState("0")
  const [additionalPhysicalDamage, setAdditionalPhysicalDamage] = useState("0")
  const [additionalMagicalDamage, setAdditionalMagicalDamage] = useState("0")
  const [truePhysicalDamage, setTruePhysicalDamage] = useState("0")
  const [weaponOrMagicDamage, setWeaponOrMagicDamage] = useState("0")
  const [physicalPower, setPhysicalPower] = useState("0")
  const [magicalPower, setMagicalPower] = useState("0")
  const [targetArmorRating, setTargetArmorRating] = useState("0")
  const [targetMagicResistRating, setTargetMagicResistRating] = useState("0")
  const [magicResistFromArmor, setMagicResistFromArmor] = useState("0")
  const [crystalSword, setCrystalSword] = useState(false)
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

  const magicalPowerBonusBrackets = [
    {
      start: 0,
      end: 1,
      min: -90,
      max: -90,
      step: 0,
    },
    {
      start: 1,
      end: 5,
      min: -90,
      max: -50,
      step: 10,
    },
    {
      start: 5,
      end: 15,
      min: -50,
      max: 0,
      step: 5,
    },
    {
      start: 15,
      end: 25,
      min: 0,
      max: 30,
      step: 3,
    },
    {
      start: 25,
      end: 40,
      min: 30,
      max: 60,
      step: 2,
    },
    {
      start: 40,
      end: 50,
      min: 60,
      max: 70,
      step: 1,
    },
    {
      start: 50,
      end: 100,
      min: 70,
      max: 95,
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

  const magicResistFromWillBrackets = [
    {
      start: 0,
      end: 5,
      min: -20,
      max: 0,
      step: 4,
    },
    {
      start: 5,
      end: 35,
      min: 0,
      max: 90,
      step: 3,
    },
    {
      start: 35,
      end: 55,
      min: 90,
      max: 130,
      step: 2,
    },
    {
      start: 55,
      end: 65,
      min: 130,
      max: 140,
      step: 1,
    },
    {
      start: 65,
      end: 91,
      min: 140,
      max: 153,
      step: 0.5,
    },
    {
      start: 91,
      end: 92,
      min: 153,
      max: 152, // Note: Assuming the -1 is a mistake as mentioned.
      step: -1,
    },
    {
      start: 92,
      end: 94,
      min: 152,
      max: 154,
      step: 1,
    },
    {
      start: 94,
      end: 100,
      min: 154,
      max: 157,
      step: 0.5,
    },
  ]

  const magicResistRatingBrackets = [
    {
      start: -300,
      end: -15,
      min: -595,
      max: -25,
      step: 2,
    },
    {
      start: -15,
      end: 10,
      min: -25,
      max: 0,
      step: 1,
    },
    {
      start: 10,
      end: 19,
      min: 0,
      max: 4.5,
      step: 0.5,
    },
    {
      start: 19,
      end: 30,
      min: 4.5,
      max: 8.9,
      step: 0.4,
    },
    {
      start: 30,
      end: 40,
      min: 8.9,
      max: 11.9,
      step: 0.3,
    },
    {
      start: 40,
      end: 50,
      min: 11.9,
      max: 13.9,
      step: 0.2,
    },
    {
      start: 50,
      end: 100,
      min: 13.9,
      max: 18.9,
      step: 0.1,
    },
    {
      start: 100,
      end: 150,
      min: 18.9,
      max: 28.9,
      step: 0.2,
    },
    {
      start: 150,
      end: 250,
      min: 28.9,
      max: 58.9,
      step: 0.3,
    },
    {
      start: 250,
      end: 350,
      min: 58.9,
      max: 78.9,
      step: 0.2,
    },
    {
      start: 350,
      end: 500,
      min: 78.9,
      max: 93.9,
      step: 0.1,
    },
  ]

  function calculatePhysicalPowerBonus(): number {
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

  function calculateMagicalPowerBonus(): number {
    const powerBonus = parseInt(will) + parseInt(magicalPower)
    const bracket = magicalPowerBonusBrackets.find(
      (b) => b.start <= powerBonus && b.end >= powerBonus
    )
    if (typeof bracket !== "undefined") {
      return bracket.max - (bracket.end - powerBonus) * bracket.step
    }
    if (powerBonus >= 100) {
      return 95
    }
    //default case should not ever be reached -- change to throw error?
    return 0
  }

  // target's pdr for use in player damage calc
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

  function calculateMagicResistFromWill(): number {
    const willInt = parseInt(will)
    const bracket = magicResistFromWillBrackets.find(
      (b) => b.start <= willInt && b.end >= willInt
    )
    if (typeof bracket !== "undefined") {
      return bracket.max - (bracket.end - willInt) * bracket.step
    }
    if (willInt >= 100) {
      return 157
    }
    //default case should not ever be reached
    return 0
  }

  // target's mdr for use in player damage calc
  function calculateMagicalDamageReduction(): number {
    const magicResistRating = parseInt(targetMagicResistRating)
    const bracket = magicResistRatingBrackets.find(
      (b) => b.start <= magicResistRating && b.end >= magicResistRating
    )
    if (typeof bracket !== "undefined") {
      return bracket.max - (bracket.end - magicResistRating) * bracket.step
    }
    if (magicResistRating >= 100) {
      return 94
    }
    //default case should not ever be reached
    return 0
  }

  // this is player magic resist because it includes will
  function calculatePlayerMagicalDamageReduction(): number {
    const magicResistRating =
      calculateMagicResistFromWill() + parseInt(magicResistFromArmor)
    const bracket = magicResistRatingBrackets.find(
      (b) => b.start <= magicResistRating && b.end >= magicResistRating
    )
    if (typeof bracket !== "undefined") {
      return bracket.max - (bracket.end - magicResistRating) * bracket.step
    }
    if (magicResistRating >= 100) {
      return 94
    }
    //default case should not ever be reached
    return 0
  }

  const calculateDmg = (damageType: DamageType): CalculationResult => {
    const totalBaseDmg = parseInt(baseDamage) + parseInt(weaponOrMagicDamage)
    const finalPowerBonusMultiplier =
      damageType === "p"
        ? calculatePhysicalPowerBonus() / 100
        : calculateMagicalPowerBonus() / 100
    const additionalDmg =
      damageType === "p"
        ? parseInt(additionalPhysicalDamage)
        : parseInt(additionalMagicalDamage)
    const trueDmg = parseInt(truePhysicalDamage)
    const headshotMultiplier = 1.5
    const bodyshotMultiplier = 1
    const limbshotMultiplier = 0.5
    const dmgReduction =
      damageType === "p"
        ? calculatePhysicalDamageReduction() / 100
        : calculateMagicalDamageReduction() / 100
    const projectileReduction = 1

    function crunchNumbers(locationMultiplier: number): number {
      return (
        (totalBaseDmg * finalPowerBonusMultiplier +
          totalBaseDmg +
          additionalDmg) *
          locationMultiplier *
          (1 - dmgReduction) *
          projectileReduction +
        trueDmg
      )
    }

    const result = {
      head: Math.round(crunchNumbers(headshotMultiplier)),
      body: Math.round(crunchNumbers(bodyshotMultiplier)),
      limb: Math.round(crunchNumbers(limbshotMultiplier)),
    }

    return result
  }

  function calculateCrystalSwordDamage() {
    const physicalDamageResult = calculateDmg("p")
    const magicalDamageResult = calculateDmg("m")
    console.log(
      `Crystal sword physical: ${physicalDamageResult.body} --- Crystal sword magical: ${magicalDamageResult.body}`
    )
    const result = {
      head: Math.round(physicalDamageResult.head + magicalDamageResult.head),
      body: Math.round(physicalDamageResult.body + magicalDamageResult.body),
      limb: Math.round(physicalDamageResult.limb + magicalDamageResult.limb),
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
      <form className="flex gap-4 flex-col flex-wrap">
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

        <label className="text-white">Additional Physical Damage</label>
        <input
          className="text-black"
          value={additionalPhysicalDamage}
          onChange={(e) => handleChangeState(e, setAdditionalPhysicalDamage)}
        />

        <label className="text-white">True Physical Damage</label>
        <input
          className="text-black"
          value={truePhysicalDamage}
          onChange={(e) => handleChangeState(e, setTruePhysicalDamage)}
        />

        <label className="text-white">Additional Magical Damage</label>
        <input
          className="text-black"
          value={additionalMagicalDamage}
          onChange={(e) => handleChangeState(e, setAdditionalMagicalDamage)}
        />

        <label className="text-white">True Magical Damage</label>
        <input
          className="text-black"
          value={truePhysicalDamage}
          onChange={(e) => handleChangeState(e, setTruePhysicalDamage)}
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

        <label className="text-white">Target&apos;s Magic Resist Rating</label>
        <input
          className="text-black"
          value={targetMagicResistRating}
          onChange={(e) => handleChangeState(e, setTargetMagicResistRating)}
        />

        <label className="text-white">Magic Resist Bonus</label>
        <input
          className="text-black"
          value={magicResistFromArmor}
          onChange={(e) => handleChangeState(e, setMagicResistFromArmor)}
        />

        <label className="text-white">Magical Weapon Damage</label>
        <input
          className="text-black"
          value={magicalWeaponDamage}
          onChange={(e) => handleChangeState(e, setMagicalWeaponDamage)}
        />

        {/* <select ("class")></form>
          <option value="fighter">fighter</option>
          <option value="wizard">wizard</option>
          <option value="rogue">rogue</option>
        </select> */}
      </form>
      <div className="text-white">
        Calculated dmg is: Head - {calculateDmg("p").head}, Body -{" "}
        {calculateDmg("p").body}, Limb - {calculateDmg("p").limb}
      </div>
      <div className="text-white">
        Calculated power bonus is {calculatePhysicalPowerBonus()}
        <br />
        Calculated pdr is{" "}
        {Math.round(calculatePhysicalDamageReduction() * 100) / 100 + "%"}
        <br />
        Calculated mdr is{" "}
        {Math.round(calculateMagicalDamageReduction() * 100) / 100 + "%"}
        <br />
        {parseInt(magicalWeaponDamage) > 0 &&
          "Crystal sword damage is: " +
            "Head - " +
            calculateCrystalSwordDamage().head +
            " Body - " +
            calculateCrystalSwordDamage().body +
            " Limb - " +
            calculateCrystalSwordDamage().limb}
      </div>
      {/* <div className="text-white">
        Strength: {strength} {typeof strength}
      </div> */}
    </div>
  )
}

//-- FORMULA --//
// (((( Base Damage + Weapon/Magical Damage) * Power Bonus) + Additional Damage) * Location Bonus * Damage Reduction * Projectile Reduction) + True Damage
