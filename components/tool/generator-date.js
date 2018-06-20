// 获取当前年份
export function getCurrentYear() {
   return new Date().getFullYear();
}

// 获取当前月份
export function getCurrentMonth() {
   return new Date().getMonth();
}

// 获取当天
export function getCurrentDay() {
   return new Date().getDate();
}

// 生成年份集合
export const createYears = function (start, end) {
   let _start, _end, years = [];
   const currentYear = getCurrentYear();

   _start = !!start ? start : 1960;
   _end = !!end ? end : currentYear;

   for (let i = _start; i <= _end; i++) {
      years.push(i.toString());
   }

   return years;
}

// 生成月份集合
export const createMonths = function () {
   return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
}

// 生成指定年、月对应的天数集合
export const createDays = function (year, month) {
   let days = []

   let total = 32 - new Date(year, month - 1, 32).getDate();

   for (let i = 1; i <= total; i++) {
      days.push(i.toString());
   }

   if (!!year && !!month){
      return days;
   }

   return createDays(getCurrentYear(), getCurrentMonth() + 1);
}