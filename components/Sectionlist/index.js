export default Component({
   properties: {
      propsListConfig: {
         type: Array,
         value: [],
      },
      propsReviewCondition: {
         type: Object,
         value: {},
      },
   },
   data: {
      listThemeKey: '', // 激活的item
   },
   ready() {
      // 回显已选择的信息
      const {propsReviewCondition} = this.properties;

      this.setData({
         listThemeKey: propsReviewCondition ? propsReviewCondition.key : ''
      });
   },
   methods: {
      selectListTheme(ev){
         const {listthemekey, listtheme} = ev.currentTarget.dataset;

         this.setData({
            listThemeKey: listthemekey,
         }, () => {
            this.triggerEvent('DispatchSelectListTheme', {listthemekey, listtheme})
         })
      },
   }
})
