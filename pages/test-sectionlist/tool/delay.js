// 延时
export const delay = (fn, time = 3000) => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(true)
         fn();
      }, time);
   })
}