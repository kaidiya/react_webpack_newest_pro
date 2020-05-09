

// export default function handleArr(arr, result = []) {
//   for(let i = 0; i < arr.length; i++) {
//     if (Object.prototype.toString.call(arr[i]) === '[object Array]') {
//       handleArr(arr[i], result);
//     } else {
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }

// sum (1,2)和sum(1)(2)

export default function sumN(a) {
  if (arguments.length >= 2) {
    let sum = 0;
    for(let i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  }
  return function (b) {
    return a + b;
  } 
}


// function Timer() { 
//   this.s1 = 0; 
//   this.s2 = 0; 
//   setInterval(() => {
//     this.s1++; // Timer
//   }, 1000); 
//   setInterval(function () { 
//     this.s2++;  // 全局对象
//   }, 1000); 
// } 
//   var timer = new Timer(); 
//   setTimeout(() => console.log('s1: ', timer.s1), 3100);  // 3
//   setTimeout(() => console.log('s2: ', timer.s2), 3100); // 0 this > timer 
