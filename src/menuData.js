import StringAlgorithm from 'algorithm/string';
import ObjectAlgorithm from 'algorithm/object';
import Intro from './pages/intro';
import CanvasExample from './pages/html/canvas';
import NodeTest from './pages/js/node_test';

const menuData = [
  {
    path: '/home',
    component: Intro,
    key: '0',
    name: '简介',
    parentKey: 0,
    order: 1,
  },
  {
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
  {
    path: '/js/object',
    component: ObjectAlgorithm,
    key: '1-2',
    name: 'object',
    parentKey: '1',
    order: 2
  },
  {
    path: '/js/nodetest',
    component: NodeTest,
    key: '1-3',
    name: 'node test',
    parentKey: '1',
    order: 3,
  },
  {
    path: '/css',
    component: '',
    key: '2',
    name: 'css',
    parentKey: 0,
    order: 3
  },
  {
    path: '/html',
    component: '',
    key: '3',
    name: 'html',
    parentKey: 0,
    order: 3
  },
  {
    path: '/html/canvas', 
    component: CanvasExample,
    key: '3-1',
    name: 'canvas',
    parentKey: '3',
    order: 1,
  },
];

export default menuData;