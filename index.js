import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import App from './src/index';


ReactDOM.render(<ConfigProvider locale={zhCN}><App/></ConfigProvider>, document.getElementById('app'));