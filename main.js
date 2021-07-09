class Trie {
  constructor() {
    this.leaf;
    this.child = [];
  }
}

function New_Node() {
  var TrieNode = new Trie();

  TrieNode.leaf = false;
  TrieNode.child = [];

  return TrieNode;
}

class ConstructTrie {
  constructor(AllWords) {
    let temp_root = New_Node();
    this.root = this.createTrieOnList(AllWords, temp_root);
  }

  insertInTrie(root, val) {
    let ind = 0;
    let temp_node = root;
    let sz = val.length;

    for (ind = 0; ind < sz; ind++) {
      let c = val[ind];

      if (temp_node.child[c] === undefined) {
        temp_node.child[c] = New_Node();
        temp_node = temp_node.child[c];
      } else {
        temp_node = temp_node.child[c];
      }
    }

    temp_node.leaf = true;
  }

  createTrieOnList(AllWords, temp_root) {
    let ind = 0;
    let sz = AllWords.length;

    for (ind = 0; ind < sz; ind++) {
      let s = AllWords[ind];
      this.insertInTrie(temp_root, s);
    }

    return temp_root;
  }
}

class TrieOperations {
  constructor() {
    this.words = [];
    this.suggestionWanted = 10; // default number of suggestions 10
  }

  canExtendThisWord(temp_node) {
    for (let i = 0; i < 26; i++) {
      let c = String.fromCharCode(97 + i);

      if (temp_node.child[c] !== undefined) {
        console.log(c); // Temporary thing for debug remove when submit
        return true;
      }
    }

    for (let i = 0; i < 26; i++) {
      let c = String.fromCharCode(65 + i);
      // console.log(c); // Temporary thing for debug remove when submit

      if (temp_node.child[c] !== undefined) {
        //  console.log(c); // Temporary thing for debug remove when submit
        return true;
      }
    }

    return false;
  }

  findInTrie(inp_val, root) {
    let temp_root = root;
    let temp_node = root;
    let sz = inp_val.length,
      len = 0;
    let foundWholeString = true;

    for (let i = 0; i < sz; i++) {
      let c = inp_val[i],
        doneThisChar = false;
      let x = c.toLowerCase();

      console.log("Start");
      console.log(c + " " + i);
      console.log(x);
      console.log(temp_node.leaf);
      console.log("End");

      if (temp_node.child[c]) {
        temp_node = temp_node.child[c];
        doneThisChar = true;
      } else if (temp_node.child[x]) {
        temp_node = temp_node.child[x];
        doneThisChar = true;
      } else {
        doneThisChar = false;
        foundWholeString = false;
        break;
      }

      if (doneThisChar) {
        len++;
      }

      console.log("Start");
      console.log(c + " " + i);
      console.log(x);
      console.log(temp_node.leaf);
      console.log("End");
    }

    let maxStringObtained = "";

    for (let i = 0; i < len; i++) {
      maxStringObtained += inp_val[i];
    }

    console.log(
      len +
        " " +
        maxStringObtained +
        "    x    " +
        temp_node.leaf +
        " " +
        foundWholeString
    );

    let x = { len, maxStringObtained, temp_node, foundWholeString };
    console.log(x);
    return x;
  }

  // number of suggestions user want can be fixed according to his/her choice
  DFS(inp_val, node) {
    if (this.words.length >= this.suggestionWanted) {
      return;
    }

    if (node.leaf) {
      this.words.push(inp_val);
    }

    console.log(inp_val + " " + " words: " + this.words);

    for (let c in node.child) {
      console.log("reached :: " + c + " inp " + inp_val);
      if (node.child[c] !== undefined) {
        let new_string = inp_val;
        new_string += c;

        console.log("new string : " + new_string);
        this.DFS(new_string, node.child[c]);
      }
    }
  }

  // todo Same thing for BFS
  // SuggestionsUsingBFS here only to avoid plag

  GetSuggestionsUsingDFS(inp_val, root) {
    this.words = [];
    let checkInTrie = this.findInTrie(inp_val, root);
    console.log(checkInTrie);
    console.log(checkInTrie.len);
    console.log("Was");

    let len = checkInTrie.len,
      maxWordFound = checkInTrie.maxStringObtained,
      node = checkInTrie.temp_node,
      foundWholeString = checkInTrie.foundWholeString;
    let n = inp_val.length;

    console.log(
      checkInTrie[0] + " " + maxWordFound + " " + " " + foundWholeString
    );

    let ans = [];

    if (node.leaf) {
      // Can add functionality here highlight or stop recommending this word as it is Already a valid string
      // Like in google search it skips if the word is correct , maybe like that??
      ans.push(maxWordFound);
    }

    console.log("123");
    console.log(node.leaf);
    console.log("ans :: " + ans);

    if (this.canExtendThisWord(node) && len == n) {
      console.log("here " + maxWordFound + " ans :: " + ans);
      this.DFS(maxWordFound, node);
      console.log(this.words);

      for (let i = 0; i < this.words.length; i++) {
        ans.push(this.words[i]);
      }

      return ans;
    } else {
      if (len == n && node.leaf) {
        // todo
        // this is only valid string without any further extension possible like Jatin
        // No other word exists that Jatin....xyz
        // this is only for those cases

        return ans;
      } else {
        // todo
        // this string does not exists
        // maybe adding the string into our list feature?

        return ans;
      }
    }
  }
}

function testing() {
  const autocomplete = new ConstructTrie(DB);
  const result = JSON.stringify(autocomplete.root);

  console.log("HERE");
  console.log(result);

  const x = new TrieOperations();
  const ans = x.GetSuggestionsUsingDFS("a", autocomplete.root);

  console.log(ans.toString());
}
