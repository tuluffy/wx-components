export default Component({
   properties: {
      propsSectionConfig: {
         type: Array,
         value: []
      },
   },
   data: {
      listConfig: [],   // item-list
      showList: false,  // 是否展示item-list
      sectionThemeKey: '', // 选择的theme
      themeIndex: '',   // 选择的theme在propsSectionConfig的索引

      condition: [], // 最终筛选条件，格式[{key,value}, {key, value}, ...]
   },
   ready() {
   },
   methods: {
      selectSectionTheme(ev) {
         const {sectionthemekey} = ev.currentTarget.dataset;
         const {propsSectionConfig} = this.properties;

         const {sectionThemeKey} = this.data;

         // 根据key，获取对应的childlist
         let childrenList, themeIndex;

         // 如果切换了theme，重置listConfig
         for (let i = 0; i < propsSectionConfig.length; i++) {
            if (propsSectionConfig[i].key == sectionthemekey) {
               childrenList = propsSectionConfig[i].children || [];
               themeIndex = i;
               break;
            }
         }

         // 这里有一个问题，选择了“综合”，切换到“旅游类型”的时候，Sectionlist组件没有销毁，存在数据残留
         // 针对此种情况，需要做一个特别的操作，即：如果切换了主题栏，先销毁Sectionlist，再去生成
         if (sectionThemeKey != sectionthemekey) {
            this.setData({
               showList: false,
            }, () => {
               this.setData({
                  listConfig: childrenList,
                  sectionThemeKey: sectionthemekey,
                  themeIndex,
                  showList: true,
               })
            })
         } else {
            this.setData({
               showList: false,
            }, () => {
               this.setData({
                  showList: true,
               })
            })
         }
      },

      selectListTheme(ev) {
         const {listtheme, listthemekey} = ev.detail;
         const {themeIndex} = this.data;

         // 整合筛选条件
         // 匹配theme-item和list-item
         let con = {
            theme: listtheme,
            key: listthemekey,
         };

         // 整合
         this.data.condition[themeIndex] = con;

         // 更新过滤条件
         this.setData({
            condition: this.data.condition,
         }, () => {
            const {condition} = this.data;

            // 传递筛选条件给父级
            this.triggerEvent('DispatchGetFilterCondition', {condition})

            setTimeout(() => {
               this.setData({
                  showList: false,
               })
            }, 2000)

         })
      },
   }
})
