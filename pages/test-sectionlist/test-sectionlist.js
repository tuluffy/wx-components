import {sectionConfig} from './config/section';
import {delay} from './tool/delay';

Page({
   data: {
      sectionConfig,
      listConfig: [],
      sectionThemeKey: '', // 选择主题
      listThemeKey: '', // 选择展示listItem
      showList: false,  // 展示list

      condition: [],
   },
   onLoad() {
   },

   // 选择培训规则
   selectSectionTheme(ev){
      const {sectionthemekey} = ev.currentTarget.dataset;
      const {sectionThemeKey, condition} = this.data;

      // 根据key，获取对应的childlist
      let childrenList = [];
      let listThemeKey = '';

      for(let i=0; i<sectionConfig.length; i++){
         if(sectionConfig[i].key == sectionthemekey){
            childrenList = sectionConfig[i].children;

            // 如果sectionTheme发生变化，重置listThemeKey
            if((sectionthemekey != sectionThemeKey) && condition[i]){
                listThemeKey = condition[i].key;
            }
            break;
         }
      }

      this.setData({
         listConfig: childrenList,  // 重置listConfig
         showList: true,   // 展示list
         sectionThemeKey: sectionthemekey,
         listThemeKey,
      });

   },

   selectListTheme(ev){
      const {listthemekey} = ev.currentTarget.dataset;
      const {sectionThemeKey} = this.data;

      // 延时关闭list视窗
      const delaySetData = () => {
         this.setData({
            showList: false,
         });
      };

      this.setData({
         listThemeKey: listthemekey,
      }, () => {
         // delay(delaySetData)

         // 整理筛选的条件
         this.combinationSelectedCondition();
      });

   },

   // 组合选择的条件
   combinationSelectedCondition(){
      const {sectionThemeKey, listThemeKey} = this.data;
      let sectionThemeIndex, listTheme, childrenList;

      // 获取选中的section对应的childreList
      for(let i=0; i< sectionConfig.length; i++){
         if(sectionConfig[i].key == sectionThemeKey){
            sectionThemeIndex = i;
            childrenList = sectionConfig[i].children;

            break;
         }
      }

      // 获取item对应的theme
      for(let k=0; k<childrenList.length; k++){
         if(childrenList[k].key == listThemeKey){
            listTheme = childrenList[k].theme;

            break;
         }
      }

      // 组合数据结构
      let condition = {
         key: listThemeKey,
         theme: listTheme,
         active: true,
      };

      this.data.condition[sectionThemeIndex] = condition;

      this.setData({
         condition: this.data.condition,
      }, () => {
         console.log(this.data.condition)
      });
   }
})
