import {uuid} from '../../../tool/uuid/index';

export const sectionConfig = [
   {
      theme: '主题一',
      key: uuid(),
      children: [
         {
            theme: '方式一',
            key: uuid(),
         },
         {
            theme: '方式二',
            key: uuid(),
         },
         {
            theme: '方式三',
            key: uuid(),
         },
      ]
   },
   {
      theme: '主题二',
      key: uuid(),
      children: [
         {
            theme: '全部',
            key: uuid(),
         },
         {
            theme: '方式一',
            key: uuid(),
         },
         {
            theme: '方式二',
            key: uuid(),
         },
         {
            theme: '方式三',
            key: uuid(),
         },{
            theme: '方式四',
            key: uuid(),
         },
      ]
   },
   {
      theme: '主题三',
      key: uuid(),
      children: [
         {
            theme: '方式一',
            key: uuid()
         },
         {
            theme: '方式二',
            key: uuid()
         },{
            theme: '方式三',
            key: uuid()
         },{
            theme: '方式四',
            key: uuid()
         }
      ],
   },
   {
      theme: '主题四',
      key: uuid(),
      children:[],
   },
];