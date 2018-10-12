
/* 

Function Expression
As closures
As arguments to other functions
As Immediately Invoked Function Expressions (IIFE)
Aren’t hoisted,

 Fonction anonyme auto-exécutable
*/

// Crockford's preference - parens on the inside
(function() {
    console.log('Welcome to the Internet. Please follow me.');
  }());
  
  //The OPs example, parentheses on the outside
  (function() {
    console.log('Welcome to the Internet. Please follow me.');
  })();
  
  //Using the exclamation mark operator
  //https://stackoverflow.com/a/5654929/1175496


// fonction fleche 
const myFn = (x) => {
    return x + 1;
  };
  // ===
  const myFn = (x) => x + 1;
  // ===
  const myFn = x => x + 1;
  // ===
  const myFn = x => (x + 1);



  /* -------------------------- Calback ------------------------------- */

  //prblm 1

  function b(callback) {

    console.log('hamdi');

    callback()

  }

  function a() {
  console.log(" miled")
  }

  b(a)

// output hamdi /n miled

//mm rslt sans callback

function b() {
  console.log('hamdi');
  a()
}

function a() {
console.log(" miled")
}
b()







var allUserData = [];

function logStuff (userData) {
    if ( typeof userData === "string")
    {
        console.log(userData);
    }
    else if ( typeof userData === "object")
    {
        for (var item in userData) {
            console.log(item + ": " + userData[item]);
        }

    }

}
function getInput (options, callback) {
    allUserData.push (options);
    logStuff (options);

}
getInput ({name:"Rich", speciality:"JavaScript"});


