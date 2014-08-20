exports.roll = roll;
exports.nice_output = nice_output;
exports.totals = totals;
exports.legend = legend;

var _ = require('lodash')

var symbols = {
  1: 'success',
  2: 'advantage',
  3: 'triumph',

  4: 'failure',
  5: 'threat',
  6: 'dispair',

  7: 'light force',
  8: 'dark force'
}

var uni = {
  1: '✶',
  2: '℧',
  3: '⎈',

  4: '▼',
  5: '⎔',
  6: '⎊',

  7: '○',
  8: '●'
}

var dice = {
  boost:      [[], [],  [2,2], [2],   [1,2],[1]],
  setback:    [[], [],  [4],   [4],   [5],  [5]],
  ability:    [[], [1], [1],   [1,1], [2],  [2], [1,2], [2,2]],
  difficulty: [[], [4], [4,4], [5],   [5],  [5], [5,5], [4,5]],
  proficiency:[[], [1], [1],   [1,1], [1,1],[2], [1,2], [1,2], [1,2],[2,2],[2,2], [3]  ],
  challenge  :[[], [4], [4],   [4,4], [4,4],[5], [5],   [4,5], [4,5],[5,5],[5,5], [6]  ],
  force:     [[8], [8], [8],   [8],   [8],  [8], [8,8], [7],   [7],  [7,7],[7,7], [7,7]]
}


function roll(pool){
  var result = {};
  pool = init(pool);
  _.each(pool, function(amount, name){
    var rolls = [];
    for (var i = amount - 1; i >= 0; i--) {
      rolls.push( roll_dice( dice[name]  ) )
    };
    result[name] = rolls;
  })
  return result;
}

function nice_output(result) {
  var nice = {};
  _.each(result, function(rolls, name){
    nice[name] = _.map(rolls, nice_face).join(' ')
  });
  return nice;
}

function totals(result) {

  var total = { success: 0, advantage: 0, triumph: 0, dispair: 0 }
  _.each(result, function(rolls, name){
    _.map(rolls, function(face){
      _.each(face, function(icon){
        if (symbols[icon] === 'success' ) total.success++;
        if (symbols[icon] === 'advantage' )total.advantage++;
        if (symbols[icon] === 'triumph' ) {
          total.success++;
          total.triumph++;
        }
        if (symbols[icon] === 'failure' ) total.success--;
        if (symbols[icon] === 'threat' )  total.advantage--;

        if (symbols[icon] === 'dispair' ) {
          total.success--;
          total.dispair++;
        }
      })
    })
  })
  if (total.success <= 0)   {  total.failure = Math.abs(total.success); delete total.success  }
  if (total.advantage < 0) {  total.threat = Math.abs(total.advantage); delete total.advantage  }
  if (total.advantage === 0) delete total.advantage;
  if (total.dispair === 0) delete total.dispair;
  if (total.triumph === 0) delete total.triumph;

  return total;
}


function legend(){
  var l = {}
  _.each(symbols, function(name, int){
    l[name] = uni[int]
  })
  return l;
}


function nice_face(face) {
  return '[ ' + _.map(face, function(icon){
    return uni[icon]
  }).join('') + ' ]'
}



function roll_dice(dice_type) {
  var sides = dice_type.length;
  var side = random(0, sides-1);
  return dice_type[side];
}

function random(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}


function init(pool) {
  if (!pool) pool = {};
  if (!pool.boost) pool.boost = 0;
  if (!pool.setback) pool.setback = 0;
  if (!pool.ability) pool.ability = 0;
  if (!pool.difficulty) pool.difficulty = 0;
  if (!pool.proficiency) pool.proficiency = 0;
  if (!pool.challenge) pool.challenge = 0;
  if (!pool.force) pool.force = 0;
  return pool;
}

