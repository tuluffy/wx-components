import {sectionConfig} from './config/section';

Page({
   data: {
      sectionConfig,
   },
   onLoad() {
   },

   getFilterCondition(ev){
      // 接收筛选条件
      const {condition} = ev.detail;
      console.log(condition);
   },
})
