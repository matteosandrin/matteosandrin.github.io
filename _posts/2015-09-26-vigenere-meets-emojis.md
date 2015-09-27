---
layout: post
title: Vigenère Meets Emojis
---

### 1. The Idea

I was presented one morning, by my collegue [Ben Klebe](https://github.com/benklebe/), with a half formed idea for an interesting web app. Using the [Vigenère cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher), this app would encrypt a message, and render it with emojis. He had built a bare-bones encrypt function which worked only with letters [a-z] lowercase, but could not decrypt the messages. It also presented a horrid if-else statement made up of 26 different clauses, one for each letter, hand typed.  

### 2. The Theory

The Vigenère cipher is a method of alphabetical encryption, which utilises a series of Caesar ciphers. Assigning the numbers [0-25] to every letter [a-z], and converting each letter from the plaintext message `P`, the key `K` and the encrypted message `E`, the mathematical theory goes like this:
 
```
E(i) = ( M(i) + K(i) ) % 26
M(i) = ( E(i) - K(i) ) % 26
```

### 3. The Rescue Mission

I had to do something.  
Overcoming my deep-rooted hatred for Javascript, I forked the [repo](https://github.com/SandPhoenix/emojicipher) and started dissecting what I now come to define as "Crypto Mess". First I had to figure out why, every time the decrypt function was executed, it kept spitting out "NaN", or "Not a Number". The first insight came from a little bit of research. I found out that Javascript treats each emoji as a pair of characters rendered together instaed of a single character, leading to very peculiar results when you try to call `String.length`.

```javascript 
var str = "😀😅😁😂😆😃😇";
str.length // returns 14;
```

The solution to this problem came, as most things in programming, from a very helpful [Stackoverflow answer](http://stackoverflow.com/questions/24531751/how-can-i-split-a-string-containing-emoji-into-an-array). The basic idea is to split the string using a regex, to then return an array of emojis.

```javascript
function emojiStringToArray(str) {
  split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
  arr = [];
  for (var i=0; i<split.length; i++) {
    char = split[i]
    if (char !== "") {
      arr.push(char);
    }
  }
  return arr;
}
```

With that out of the way, I started painfully refactoring the whole codebase into something more digestable, starting with the biblical if-clause business.
I solved the problem quickly by inserting all my emojis into an array and just doing a check for membership for every emoji. Not the most efficient way, but quick and simple.  
Next I added the support for all ASCII characters, which was fairly easy. I just added a few more emojis to the list, for a total of 128, and changed the value of the modulo, from 26 to 128. Also, for some reason the encrypt button would work only once and then freeze the page. I switched all interactions with the DOM to jQuery and fixed it.

### 4. The End of a Struggle

In the end, I faced the horrors of Javascript and I won. You can try out a working demo of the app on [Github Pages](http://livepluscode.com/emojicipher/public/). It was a difficult four hous of work, but I came out on top. You can find all the code in the [Github repo](https://github.com/SandPhoenix/emojicipher). 
   
**Me - 1 | JS - 0**
