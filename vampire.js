class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    if (!this.offspring.includes(vampire)) {
      this.offspring.push(vampire);
      vampire.creator = this;
    }
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let currentVamp = this;
    let count = 0;

    while(currentVamp.creator) {
      currentVamp = currentVamp.creator;
      count++;
    }
    
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal)
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vamp1 = this;
    let vamp2 = vampire;
    let vamp1Lineage = [this];
    
    while(vamp1.creator) {
      vamp1Lineage.push(vamp1.creator);
      vamp1 = vamp1.creator
    }

    while(vamp2) {
      let res = vamp1Lineage.find(v => v === vamp2);
      if (res) return res;
      vamp2 = vamp2.creator;
    }

    return false;
  }
}


module.exports = Vampire;

