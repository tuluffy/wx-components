import {city} from './../../utils/city';
import {hotCity} from './../../utils/hot-city';
import {letters} from './../../utils/letters';
import {throttle} from './../../utils/throttle';

// 获取筛选结果
function getCityFiltered(keyword) {
   let cityFiltered = [];

   city.forEach((item) => {
      const ci = item.item;

      let ciArr = [];
      ci.forEach((ciItem) => {
         if (ciItem.name.search(keyword) != '-1') {
            let filterCi = {
               name: ciItem.name,
               key: ciItem.name,
            };

            ciArr.push(filterCi);
         }
      })

      let filyerCity;
      if(!!ciArr.length){
         filyerCity= {
            title: item.title,
            item: ciArr,
         };
      }

      !!filyerCity && cityFiltered.push(filyerCity);
   })

   return cityFiltered;
}


Page({
   data: {
      focused: false, // 搜索框聚焦标志
      searchKey: '', // 搜索关键字

      location: '武汉',   // 当前位置
      city, // 城市列表
      hotCity, // 热门城市
      letters, // 字母索引
      letter: '',   // 字符索引序列
   },
   onLoad() {
   },

   // 选择城市
   choice(ev){
      const {cityname, citykey} = ev.currentTarget.dataset;
      console.log(cityname, citykey);
   },

   searchFocus() {
      // 变更搜索栏聚焦状态
      const {focused} = this.data;
      !focused && this.setData({
         focused: true,
      })
   },

   searchBlur() {
      // 变更搜索栏失焦状态
      const {searchKey} = this.data;

      !searchKey.length && this.setData({
         focused: false,
      })
   },

   searchInput(ev) {
      // 变更搜索栏输入内容
      let {value} = ev.detail;

      this.setData({
         searchKey: value,
      });

      throttle(this.$search, this, 500, value, 1000);
   },

   // 滚动到指定的字母块
   scrollIntoView(ev) {
      const {key} = ev.currentTarget.dataset;

      this.setData({
         letter: key,
      });
   },

   // 搜索
   $search(keyword) {
      let cityFiltered = getCityFiltered(keyword);

      this.setData({
         city: cityFiltered,
      });
   },
})
