// Soldier
/**
 * Create a soldier with health and strength properties
 * passed to the constructor
 * @class Soldier
 */
class Soldier {
  /**
   *Creates an instance of Soldier.
   * @param {number} health
   * @param {number} strength
   * @memberof Soldier
   */
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }
  /**
   * return attack strength of soldier
   *
   * @returns {number} soldier strength
   * @memberof Soldier
   */
  attack() {
    return this.strength;
  }
  /**
   * removes from health the strength of the attack
   *
   * @param {number} damage
   * @memberof Soldier
   */
  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
/**
 * create a viking type soldier with a property name
 *
 * @class Viking
 * @extends {Soldier}
 */
class Viking extends Soldier {
  /**
   *Creates an instance of Viking.
   * @param {string} name
   * @param {number} health
   * @param {number} strength
   * @memberof Viking
   */
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }
  /**
   * removes from health of the viking the strength of the attack
   * and returns a message, indicating if the viking is dead or not
   *
   * @param {number} damage
   * @returns {string}
   * @memberof Viking
   */
  receiveDamage(damage) {
    super.receiveDamage(damage);

    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`;
    } else {
      return `${this.name} has died in act of combat`;
    }
  }
  /**
   * returns a message corresponding to the war cry
   *
   * @returns {string}
   * @memberof Viking
   */
  battleCry() {
    return "Odin Owns You All!";
  }
}

// Saxon
/**
 * create a saxon type soldier with a property name
 *
 * @class Saxon
 * @extends {Soldier}
 */
class Saxon extends Soldier {
  /**
   *Creates an instance of Saxon.
   * @param {number} health
   * @param {number} strength
   * @memberof Saxon
   */
  constructor(health, strength) {
    super(health, strength);
  }
  /**
   * removes from health of the saxon the strength of the attack
   * and returns a message, indicating if the saxon is dead or not
   *
   * @param {number} damage
   * @returns {string}
   * @memberof Saxon
   */
  receiveDamage(damage) {
    super.receiveDamage(damage);

    if (this.health > 0) {
      return `A Saxon has received ${damage} points of damage`;
    } else {
      return `A Saxon has died in combat`;
    }
  }
}

// War
/**
 *  store Vikings and Saxons in an array, method to add remove soldiers and attack
 *
 * @class War
 */
class War {
  /**
   *Creates an instance of War with 2 array of army (viking and saxon)
   * @memberof War
   */
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }
  /**
   * add viking in vikingArmy property
   *
   * @param {object} vikingObj
   * @memberof War
   */
  addViking(vikingObj) {
    this.vikingArmy.push(vikingObj);
  }
  /**
   * add saxon in saxonArmy property
   *
   * @param {*} saxonObj
   * @memberof War
   */
  addSaxon(saxonObj) {
    this.saxonArmy.push(saxonObj);
  }
  /**
   * get random index of viking in vikingArmy
   *
   * @returns {number}
   * @memberof War
   */
  selectRandomIndexViking() {
    return Math.floor(Math.random() * this.vikingArmy.length);
  }
  /**
   * get random index of saxon in saxonArmy
   *
   * @returns {number}
   * @memberof War
   */
  selectRandomIndexSaxon() {
    return Math.floor(Math.random() * this.saxonArmy.length);
  }
  /**
   * get one random index viking and one random index saxon in each army
   *
   * @returns {object}
   * @memberof War
   */
  getIndexes() {
    return {
      saxon: this.selectRandomIndexSaxon(),
      viking: this.selectRandomIndexViking(),
    };
  }
  /**
   * choose a Viking in his army and make him attack a Saxon
   *
   * @returns {string}
   * @memberof War
   */
  vikingAttack() {
    let indexes = this.getIndexes();
    let viking = this.vikingArmy[indexes.viking];
    let saxon = this.saxonArmy[indexes.saxon];
    let retDamage = saxon.receiveDamage(viking.attack());
    if (retDamage === "A Saxon has died in combat") {
      this.saxonArmy.splice(indexes.saxon, 1);
    }
    return retDamage;
  }
  /**
   * choose a Saxon in his army and make him attack a Saxon
   *
   * @returns {string}
   * @memberof War
   */
  saxonAttack() {
    let indexes = this.getIndexes();
    let saxon = this.saxonArmy[indexes.saxon];
    let viking = this.vikingArmy[indexes.viking];
    let retDamage = viking.receiveDamage(saxon.attack());
    if (retDamage === `${viking.name} has died in act of combat`) {
      this.vikingArmy.splice(indexes.viking, 1);
    }
    return retDamage;
  }
  /**
   * the parameter of the function is the type of the attacker,
   * then a soldier of this type attacks a soldier of the opposing army
   * if target die remove him from it's army
   *
   * @param {string} typeOfSolder
   * @returns {string | false} false if bad parameter
   * @memberof War
   */
  attackFrom(typeOfSolder) {
    // get one soldier of each army
    let indexes = this.getIndexes();
    let soldiers = {
      saxon: this.saxonArmy[indexes.saxon],
      viking: this.vikingArmy[indexes.viking],
    };
    // set target
    let target =
      typeOfSolder === "saxon"
        ? soldiers.viking
        : typeOfSolder === "viking"
        ? soldiers.saxon
        : null;
    if (target === null) return false;
    // attacker attack target
    let retDamage = target.receiveDamage(soldiers[typeOfSolder].attack());
    // remove target from his army if he die
    if (typeOfSolder === "viking" && retDamage === "A Saxon has died in combat") {
      this.saxonArmy.splice(indexes.saxon, 1);
    }
    if (
      typeOfSolder === "saxon" &&
      retDamage === `${soldiers.viking.name} has died in act of combat`
    ) {
      this.vikingArmy.splice(indexes.viking, 1);
    }
    // return message
    return retDamage;
  }
  /**
   * return message of state of the war
   *
   * @returns {string}
   * @memberof War
   */
  showStatus() {
    let nbViking = this.vikingArmy.length;
    let nbSaxon = this.saxonArmy.length;
    if (nbViking === 0 && nbSaxon > 0) {
      return "Saxons have fought for their lives and survived another day...";
    }
    if (nbSaxon === 0 && nbViking > 0) {
      return "Vikings have won the war of the century!";
    }
    if (nbViking === 0 && nbSaxon === 0) {
      return "EveryBody is die, or no army to do the war!!!!!!";
    }
    if (nbViking > 0 && nbSaxon > 0) {
      return "Vikings and Saxons are still in the thick of battle.";
    }
  }
}
