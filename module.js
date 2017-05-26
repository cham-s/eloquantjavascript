// var dayName = function() {
//   var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
//               "Thursday", "Friday", "Saturday"];
//   return function (number) {
//     return names[number]
//   }
// }();

// console.log(dayName(1));

// (function(){
//   function square(x) { return x * x;  }
//   var hundred = 100;
  
//   console.log(square(hundred));
// })();

// var weekDay = function() {
//   var names = ["Sunday", "Monday", "Tuesday", 
//               "Wednesday", "Thursday", "Friday", "Saturday"];
//   return {
//     name: function(number) { return names[number]  },
//     number: function(name) { return names.indexOf(name);  }
//   }
// }();

// console.log(weekDay.name(weekDay.number("Sunday")));

// (function(exports){
//   var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
//                 "Thursday", "Friday", "Saturday"];
//   exports.name = function(number) {
//     return names[number];
//   };
//   exports.number = function(name) {
//     return names.indexOf(name);
//   };
// })(this.weekDay = {});

// console.log(weekDay.name(weekDay.number("Saturday")));

// function evalAndReturnX(code) {
//   eval(code);
//   return x;
// }

// console.log(evalAndReturnX("var x = 2"));

// var plusOne = new Function("n", "return n  + 1;");
// console.log(plusOne(4));

// function require(name) {
//   var code = new Function("exports", readFile(name));
//   var exports = {};
//   code(exports);
//   return exports;
// }

// function require(name) {
//   if (name in require.cache)
//     return require.cache[name];
    
//   var code = new Function("exports, module", readFile(name));
//   var exports = {}, module = {exports: exports};
//   code(exports, module);
  
//   require.cache[name] = module.exports;
//   return module.exports;
// }

// require.cache = Object.create(null);

define([], function() {
  var names = ["Sunday", "Monday", "Tuesday", 
              "Wednesday", "Thursday", "Friday", "Saturday"]
              
  return {
    name: function(number) { return names[number];  },
    number: function(name) { return names.indexOf(name);  }
  }
});

var defineCache = Object.create(null);
var currentMod = null;

function getModule(name) {
  if (name in defineCache)
    return defineCache[name];
    
  var module = {
    exports: null,
    loaded: false,
    onLoad: []
  };
  
  defineCache[name] = module;
  backgroundReadfile(name, function(code) {
    currentMod = module;
    new Function("", code)();
  });
  return module;
}

function define(dedNames, moduleFunction) {
  var myMod = currentMod;
  var deps = depNames.map(getModule);
  
  deps.forEach(function(mod) {
    if (!mod.loaded)
      mod.onLoad.push(whenDepsLoaded)
  });
  
  function whenDepsLoaded() {
    if (!deps.every(function(m) { return m.loaded; }))
      return;
      
    var args = deps.map(function(m) { return m.exports });
    var exports = moduleFunction.apply(null, args)
    if (myMod) {
      myMod.exports = exports;
      myMod.loaded = true;
      myMod.onLoad.forEach(function(f) {f();  });
    }
    whenDepsLoaded();
  }
}