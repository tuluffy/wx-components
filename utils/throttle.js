/**节流函数
 * @param fn: 可执行函数
 * @param context: fn的作用域
 * @param delay: 延时时间
 * @param text: fn接收的参数
 * @param mustApplyTime：间隔时间（在该时间段内，fn至少执行一次）
 * */
export function throttle(fn, context, delay, text, mustApplyTime) {
   clearTimeout(fn.timer);

   fn.current = Date.now();  //记录当前时间

   if (!fn.start) {      //若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
      fn.start = fn.current;
   }
   if (fn.current - fn.start > mustApplyTime) {
      //当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
      fn.call(context, text);
      fn.start = fn.current;
   } else {
      fn.timer = setTimeout(function () {
         fn.call(context, text);
      }, delay);
   }
};