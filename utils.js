// export function shuffleArray(arr) {
//     for (let i = arr.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//   return arr;
//   }
export function shuffleArray(arr) {
    var i = arr.length, k , temp;      // k is to generate random index and temp is to swap the values
    while(--i > 0){
       k = Math.floor(Math.random() * (i+1));
       temp = arr[k];
       arr[k] = arr[i];
       arr[i] = temp;
    }
  return arr;
  }