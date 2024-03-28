/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let wordSet = new Set(this.words);
    let wordArray = Array.from(wordSet);
    this.uniqueWords = wordArray;
    let chains = {};
    for (let word of wordArray) {
      let nextWords = [];
      for (let i = 0; i < this.words.length; i++) {
        if (this.words.at(i) === word) {
          if (this.words.at(i + 1)) {
            nextWords.push(this.words.at(i + 1));
          } else {
            nextWords.push(null);
          }
        }
      }
      chains[word] = nextWords;
    }
    this.chains = chains;
  }

  static randomEl(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let output = [];
    let choice = MarkovMachine.randomEl(this.uniqueWords);

    while (output.length < numWords && choice !== null) {
      output.push(choice);
      choice = MarkovMachine.randomEl(this.chains[choice]);
    }

    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
