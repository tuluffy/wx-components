Page({
   data: {
      date: '',   // 2018-3-23
      isShowDatepicker: false,
   },
   onLoad() {
   },

   // 日期选择
   datepickerConfirm(ev){
      const {date = {}} = ev.detail;

      this.setData({
         date,
         isShowDatepicker: false,
      })
   },

   // 显示日期选择器
   showDatepicker(){
      this.setData({
         isShowDatepicker: true
      });
   },

   // 关闭如期选择器
   closeDatepicker(){
      this.setData({
         isShowDatepicker: false,
      });
   },
})
