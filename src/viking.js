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

    vikingAttack() {
        let viking = Math.floor(Math.random() * this.vikingArmy.length)
        let saxon = Math.floor(Math.random() * this.saxonArmy.length)
    }
    saxonAttack() {}
    showStatus() {}



}