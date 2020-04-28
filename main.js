// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, currentdna) => {
  return ({
    specimenNum: num,
    dna: currentdna,
    // mutate, function that change one base of the dna
    mutate: function() {
      let dnaMutate = this.dna;
      let base_place = Math.floor(Math.random()*15);
      let base = this.dna[base_place];
      let mutation_bases = this.dna.filter(element=>element !== base);
      dnaMutate[base_place] = mutation_bases[Math.floor(Math.random()*3)];
      return dnaMutate;
    },

    //Compare this dna with otherDNA
    compareDNA: function(otherDNA){
      let common = 0;
      for (var i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherDNA.dna[i]) {
          common += 1;
        }
      }
      let percentage = common / this.dna.length * 100;
      percentage = percentage.toFixed(2);
      //console.log(`specimen ${ this.specimenNum } and specimend ${ otherDNA.specimenNum } have ${ percentage }% DNA in common`);
      return percentage;
    },

    //Is likely to survive if C or G is 60% common
    willLikelySurvive: function(){
      let countG = 0;
      let countC = 0;
      for (var i = 0; i < this.dna.length; i++) {
        if (this.dna[i]==='G') {
          countG++;
        }else if (this.dna[i] === 'C') {
          countC++;
        }
      }
      countG = countG/this.dna.length;
      countC = countC/this.dna.length;
      return(countC>=0.6 || countG>=0.6);
    },

    //Transcription of the dna
    complementStrand: function(){
      let complementDNA = [];
      for (var i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'A') {
          complementDNA.push('T');
        }else if (this.dna[i] === 'T') {
          complementDNA.push('A');
        }else if (this.dna[i] === 'C') {
          complementDNA.push('G');
        }else if (this.dna[i] === 'G') {
          complementDNA.push('C');
        }
      }
      return(complementDNA);
    },
  });
}


//Create a list of likely to survive dnas
let list_of_dna = [];
let count = 0;//count tries to get the result
let id = 0;
while (list_of_dna.length <30) {
    let dna = mockUpStrand();
    let new_dna = pAequorFactory(id, dna);
    if (new_dna.willLikelySurvive()) {
      list_of_dna.push(new_dna);
      id++;
    }
    count++;
}
//console.log(` It takes ${count} times to get the list.`);
//console.log(list_of_dna);



//Get par of dnas most related
let par_of_dna = [list_of_dna[0], list_of_dna[1],
list_of_dna[0].compareDNA(list_of_dna[1])];

for (var i = 0; i < list_of_dna.length-1; i++) {
  for (var j = i+1; j < list_of_dna.length; j++) {
    if (list_of_dna[i].compareDNA(list_of_dna[j])>par_of_dna[2]) {
      par_of_dna = [list_of_dna[i], list_of_dna[j],
      list_of_dna[i].compareDNA(list_of_dna[j])];
    }
  }
}
console.log(`The par of DNAs are
${par_of_dna[0].specimenNum}: ${par_of_dna[0].dna}
${par_of_dna[1].specimenNum}: ${par_of_dna[1].dna}
with a ${par_of_dna[2]}%.`);
