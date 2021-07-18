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
  constructor(x) {
    this.words = [];
    this.suggestionWanted = x; // default number of suggestions 10
  }

  canExtendThisWord(temp_node) {
    for (let i = 0; i < 26; i++) {
      let c = String.fromCharCode(97 + i);

      if (temp_node.child[c] !== undefined) {
        return true;
      }
    }

    for (let i = 0; i < 26; i++) {
      let c = String.fromCharCode(65 + i);
      if (temp_node.child[c] !== undefined) {
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
    return x;
  }

  DFS(inp_val, node) {
    if (this.words.length >= this.suggestionWanted) {
      return;
    }

    if (node.leaf) {
      this.words.push(inp_val);
    }

    for (let c in node.child) {
      if (node.child[c] !== undefined) {
        let new_string = inp_val;
        new_string += c;

        this.DFS(new_string, node.child[c]);
      }
    }
  }

  BFS(inp_val, node) {
    let v = [inp_val];
    let q = [{ inp_val, node }];

    while (q.length) {
      if (v.length >= this.suggestionWanted) {
        this.words = v;
        return;
      }

      let pre;
      let n;
      let x = q.shift();

      pre = x.inp_val;
      n = x.node;

      for (let c in n.child) {
        const isOk = n.child[c].leaf;

        if (isOk) {
          v.push(pre + c);
        }

        q.push({
          inp_val: pre + c,
          node: n.child[c],
        });
      }
    }

    this.words = v;
    return;
  }

  GetSuggestionsUsingDFS(inp_val, root) {
    this.words = [];
    let checkInTrie = this.findInTrie(inp_val, root);

    let len = checkInTrie.len,
      maxWordFound = checkInTrie.maxStringObtained,
      node = checkInTrie.temp_node,
      foundWholeString = checkInTrie.foundWholeString;
    let n = inp_val.length;

    let ans = [];

    if (foundWholeString && !(this.canExtendThisWord(node) && len == n)) {
      ans.push(maxWordFound);
    }

    if (this.canExtendThisWord(node) && len == n) {
      this.DFS(maxWordFound, node);
      for (let i = 0; i < this.words.length; i++) {
        ans.push(this.words[i]);
      }

      return ans;
    } else {
      if (len == n && node.leaf) {
        return ans;
      } else {
        return ans;
      }
    }
  }

  GetSuggestionsUsingBFS(inp_val, root) {
    this.words = [];
    let checkInTrie = this.findInTrie(inp_val, root);

    let len = checkInTrie.len,
      maxWordFound = checkInTrie.maxStringObtained,
      node = checkInTrie.temp_node,
      foundWholeString = checkInTrie.foundWholeString;

    let n = inp_val.length;

    let ans = [];

    if (this.canExtendThisWord(node) && len == n) {
      this.BFS(maxWordFound, node);

      for (let i = 0; i < this.words.length; i++) {
        ans.push(this.words[i]);
      }

      return ans;
    } else {
      if (len == n && node.leaf) {
        return ans;
      } else {
        return ans;
      }
    }
  }
}

function findDistance(s1, s2) {
  let n1 = s1.length;
  let n2 = s2.length;

  var dp = new Array(n1 + 1);

  for (let i = 0; i < n1 + 1; i++) {
    dp[i] = new Array(n2 + 1);
  }

  for (let i = 0; i < n1 + 1; i++) {
    let j = 0;
    while (j < n2 + 1) {
      if (i == 0) {
        dp[i][j] = j;
      } else if (j == 0) {
        dp[i][j] = i;
      } else if (s1[i - 1] == s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (
        i > 1 &&
        j > 1 &&
        s1[i - 1] == s2[j - 2] &&
        s1[i - 2] == s2[j - 1]
      ) {
        let x = Math.min(dp[i][j - 1], dp[i - 1][j]);
        let y = Math.min(dp[i - 2][j - 2], dp[i - 1][j - 1]);
        dp[i][j] = 1 + Math.min(x, y);
      } else {
        let x = Math.min(dp[i][j - 1], dp[i - 1][j]);
        dp[i][j] = 1 + Math.min(x, dp[i - 1][j - 1]);
      }

      j++;
    }
  }

  return dp[n1][n2];
}

function solve() {
  let s = document.getElementById("inputString").value;
  console.log("string s is " + s);

  if (s.length == 0) {
    return [];
  }

  const autocomplete = new ConstructTrie(DB);

  const x = new TrieOperations(15);
  const ans = x.GetSuggestionsUsingDFS(s, autocomplete.root);

  console.log(ans.toString());

  return ans;
}

function findSimilarWords() {
  let inp_val = document.getElementById("inputString").value;
  let n = inp_val.length;

  let ans = [];
  if (n == 0) {
    return ans;
  }

  const autocomplete = new ConstructTrie(DB);

  const x = new TrieOperations(1000000);
  const arr = x.GetSuggestionsUsingDFS("", autocomplete.root);

  let n1 = arr.length;
  for (let i = 0; i < n1; i++) {
    let v = findDistance(arr[i], inp_val);
    ans.push([v, arr[i]]);
  }

  ans.sort(function (a, b) {
    return parseFloat(a[0]) - parseFloat(b[0]);
  });

  let finalAns = [];
  for (let i = 0; i < Math.min(15, ans.length); i++) {
    finalAns.push(ans[i][1]);
  }

  return finalAns;
}

function printList() {
  const arr = solve();

  var ansList = "<ul>";

  for (let i = 0; i < arr.length; i++) {
    let x = arr[i];
    let y = arr[i][0];

    ansList += "<li>" + y.toUpperCase() + x.substring(1) + "</li>";
  }

  ansList += "</ul>";

  if (arr.length == 0) {
    ansList = "";
  }

  document.getElementById("showSuggestions").innerHTML = "";
  document.getElementById("showSuggestions").innerHTML += ansList;
}

function printSimilarWords() {
  const arr = findSimilarWords();

  var ansList = "<ul>";

  for (let i = 0; i < arr.length; i++) {
    let x = arr[i];
    let y = arr[i][0];

    ansList += "<li>" + y.toUpperCase() + x.substring(1) + "</li>";
  }

  ansList += "</ul>";

  if (arr.length == 0) {
    ansList = "";
  }

  document.getElementById("showSimilarSuggestions").innerHTML = "";
  document.getElementById("showSimilarSuggestions").innerHTML += ansList;
}

// Front End Related Stuff
function opennav() {
  document.getElementById("sidenav").style.width = "250px";
}

function closenav() {
  document.getElementById("sidenav").style.width = "0";
}
