// Soldier
class Soldier {
    constructor(health, strength) {
        this.health = health;
        this.strength = strength;
    }

    attack() {
        return this.strength;
    }

    receiveDamage(damage) {
        this.health -= damage;
    }
}

// Viking
class Viking extends Soldier {
    constructor(name, health, strength) {
        super(health, strength);
        this.name = name;
    }
    receiveDamage(damage) {
        super.receiveDamage(damage);

        if (this.health > 0) {
            return `${this.name} has received ${damage} points of damage`;
        } else {
            return `${this.name} has died in act of combat`;
        }
    }
    battleCry() {
        return "Odin Owns You All!";
    }
}

// Saxon
class Saxon extends Soldier {
    constructor(health, strength) {
        super(health, strength);
    }

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
class War {
    constructor() {
        this.vikingArmy = [];
        this.saxonArmy = [];
    }

    addViking(vikingObj) {
        this.vikingArmy.push(vikingObj);
    }

    addSaxon(saxonObj) {
        this.saxonArmy.push(saxonObj);
    }
    selectRandomIndexViking() {
        return Math.floor(Math.random() * this.vikingArmy.length);
    }
    selectRandomIndexSaxon() {
        return Math.floor(Math.random() * this.saxonArmy.length);
    }

    getIndexes() {

        return {
            saxon: this.selectRandomIndexSaxon(),
            viking: this.selectRandomIndexViking()
        };
    }


    vikingAttack() {

        let indexes = this.getIndexes();
        let viking = this.vikingArmy[indexes.viking];
        let saxon = this.saxonArmy[indexes.saxon];
        let damage = viking.strength;
        let retDamage = saxon.receiveDamage(damage);
        if (retDamage === "A Saxon has died in combat") {
            this.saxonArmy.splice(indexes.saxon, 1);
        }
        return retDamage;
    }


    saxonAttack() {

        let indexes = this.getIndexes();
        let saxon = this.saxonArmy[indexes.saxon];
        let viking = this.vikingArmy[indexes.viking];
        let damage = saxon.strength;
        let retDamage = viking.receiveDamage(damage);
        if (retDamage === `${viking.name} has died in act of combat`) {
            this.vikingArmy.splice(indexes.viking, 1);
        }
        return retDamage;
    }

    attack(typeOfSolder) {
        let indexes = this.getIndexes();
        let saxon = this.saxonArmy[indexes.saxon];
        let viking = this.vikingArmy[indexes.viking];
        let damage, retDamage;

        if (typeOfSolder === "viking") {
            damage = viking.strength;
            retDamage = saxon.receiveDamage(damage);

            if (retDamage === "A Saxon has died in combat") {
                this.saxonArmy.splice(indexes.saxon, 1);
            }

        } else if (typeOfSolder === "saxon") {

            damage = saxon.strength;
            retDamage = viking.receiveDamage(damage);
            if (retDamage === `${viking.name} has died in act of combat`) {
                this.vikingArmy.splice(indexes.viking, 1);
            }
        }
        return retDamage;

    }

    showStatus() {}
}