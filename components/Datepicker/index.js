import {transformDate} from './../tool/transform-date';
import {createDays, createMonths, createYears, getCurrentYear, getCurrentMonth, getCurrentDay} from '../tool/generator-date';

export default Component({
   properties: {
      startYear: Number,
      endYear: Number,
      propsActiveDate: String,
   },
   data: {
      years: createYears(),
      months: createMonths(),
      days: createDays(),
      activedYear: '',
      activedMonth: '',
      activedDay: '',
      activeDate: [],

      activedYearIndex: [0],
      activedMonthIndex: [0],
      activedDayIndex: [0],
   },
   ready() {
      const {startYear, endYear, propsActiveDate} = this.properties;
      const {months, days} = this.data;

      // 获取年份集合
      let years = createYears(startYear, endYear);

      // 获取选择的年、月、日，及其对应的索引值
      let activeDate, currentYear, currentMonth, currentDay, activedYearIndex, activedMonthIndex, activedDayIndex;

      // 如果传递默认时间，回显默认时间
      if(!!propsActiveDate){
         activeDate = propsActiveDate.split('-');
         currentYear = activeDate[0].toString();
         currentMonth = activeDate[1].toString();
         currentDay = activeDate[2].toString();

         // 获取年、月、日反显索引
         activedYearIndex = [years.indexOf(currentYear)];
         activedMonthIndex = [months.indexOf(currentMonth)];
         activedDayIndex = [days.indexOf(currentDay)];
      } else {
         // 未传递默认时间，则显示当前日期
         currentYear = getCurrentYear().toString();
         currentMonth = (getCurrentMonth() + 1).toString();
         currentDay = getCurrentDay().toString();

         activedYearIndex = [years.indexOf(currentYear)];
         activedMonthIndex = [months.indexOf(currentMonth)];
         activedDayIndex = [days.indexOf(currentDay)];
      }

      this.setData({
         years,
         activedYear: currentYear,
         activedMonth: currentMonth,
         activedDay: currentDay,
         activedYearIndex,
         activedMonthIndex,
         activedDayIndex,
      });
   },
   methods: {
      datapickerChange(ev) {
         const {type} = ev.currentTarget.dataset;
         let val = ev.detail.value[0];

         this.setDatemsg(type, val)
      },
      setDatemsg(type, val) {
         let handler;

         switch (type) {
            case 'activedYear':
               handler = 'years';
               break;
            case 'activedMonth':
               handler = 'months';
               break;
            case 'activedDay':
               handler = 'days';
               break;
            default:
               throw new Error("function 'methods.setDatemsg' args('type') error!");
         }

         let handlerArr = this.data[handler];

         this.setData({
            [type]: handlerArr[val],
         }, this.resertDays);
      },

      // 重置日期
      resertDays(type) {
         const {activedYear, activedMonth} = this.data;
         let days = createDays(activedYear, activedMonth);

         this.setData({
            days,
         });
      },

      confirm() {
         const {activedYear, activedMonth, activedDay} = this.data;
         let activedDate = [activedYear, activedMonth, activedDay];
         const date = transformDate(activedDate, '-');

         this.triggerEvent('DispatchDatepickerConfirm', {date});
      },

      cancel() {
         this.closeDatepicker();
      },

      // 关闭日期选择器
      closeDatepicker() {
         this.triggerEvent('DispatchCloseDatepicker');
      },

      // 无实效的响应函数
      nullEventHandler() {
         return null;
      },
   }
})
