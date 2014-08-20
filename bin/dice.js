#!/usr/bin/env node

var dice = require('..');
var argv = require('minimist')(process.argv.slice(2));

var pool = {
  ability: argv.a,
  boost: argv.b,
  challenge: argv.c,
  difficulty: argv.d,
  force: argv.f,
  proficiency: argv.p,
  setback: argv.s
}


console.log('\n---------------------')
console.log('Legend');
console.log('---------------------')
console.log(dice.legend())

var result = dice.roll(pool)
console.log('---------------------')
console.log('Rolls');
console.log('---------------------')
console.log(dice.nice_output(result));


var total = dice.totals(result);
console.log('---------------------')
console.log('Total');
console.log('---------------------')
console.log(total);
console.log('\n')

