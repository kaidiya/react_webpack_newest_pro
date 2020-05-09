import StringAlgorithm from 'algorithm/string';
import Intro from './intro';

const menuData = [
  {
    path: '/intro',
    component: Intro,
    key: '0',
    name: '简介',
    parentKey: 0,
    order: 1,
  },
  {
    path: '/js',
    key: '1',
    name: 'js',
    parentKey: 0,
    order: 2,
  }, 
  {
    path: '/js/string',
    component: StringAlgorithm,
    key: '1-1',
    name: 'string',
    parentKey: '1',
    order: 1,
  }, 
  // {
  //   path: '/js/object',
  //   component: '',
  //   key: '1-2',
  //   name: 'object',
  //   parentKey: '1',
  //   order: 2
  // }, 
  // {
  //   path: '/css',
  //   component: '',
  //   key: '2',
  //   name: 'css',
  //   parentKey: 0,
  //   order: 3
  // }
];

export default menuData;