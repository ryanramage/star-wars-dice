Star Wars Dice
==============

 eg found here: http://www.amazon.ca/Star-Wars-Edge-Empire-Dice/dp/1616616598

![Dice](http://1.bp.blogspot.com/-KWBE5hDi0TI/USLcnQLRATI/AAAAAAAAI1g/0-CJFoXo6W0/s1600/dice-chart.png)

![Faces](http://4.bp.blogspot.com/-e0MHmFkFKEQ/USLe_XUI4DI/AAAAAAAAI2I/kfnDwpkjwXg/s320/symbols-and-dice.png)

Command Line Usage
==================

    npm install star-wars-dice

Run
---

  star-wars-dice -a 2 -d 3 -p 1 -s 1

Where the switches are the first letter of the dice type, eg:

  - -a ability die
  - -p proficiency die
  - -d difficulty die
  - -c challenge die
  - -b boost die
  - -s setback die
  - -f force die

And the number after is the number of that dice type. This makes the dice pool. There result of the roll will look like:

```
---------------------
Legend
---------------------
{ success: '✶',
  advantage: '℧',
  triumph: '⎈',
  failure: '▼',
  threat: '⎔',
  dispair: '⎊',
  'light force': '○',
  'dark force': '●' }
---------------------
Rolls
---------------------
{ ability: '[ ✶ ] [  ]',
  boost: '',
  challenge: '',
  difficulty: '[ ▼⎔ ] [ ▼▼ ] [ ▼⎔ ]',
  force: '',
  proficiency: '[ ℧℧ ]',
  setback: '[ ⎔ ]' }
---------------------
Total
---------------------
{ failure: 3, threat: 1 }

```

Module Use
==========

    npm install star-wars-dice

Code
----

    var swd = require('star-wars-dice');
    var rolls = swd.roll({ability: 2, difficulty:3, proficiency:1, setback: 1})
    var result = swd.totals(rolls);




