import React, {Component} from 'react';
import test from './test';

export default class FirstPage extends Component {
  constructor(props) {
    super();
    this.state = {
      showFinalStr: '',
    };
    var arr1 = [1, 2, [3, [4, 5]]]; // 平铺为 // [1, 2, 3, 4, 5]
    console.log(test(1)(2));
  }

  shortenString = (str) => {
    if (!str) return;
    let finalStr = `${str.slice(0, 1)}1`;
    for(let i = 1; i < str.length; i++) {
      let preStr = str.slice(i - 1, i);
      let aftStr = str.slice(i, i + 1);
      if (preStr === aftStr) {
        let finalPreStr = finalStr.slice(0, finalStr.length - 1);
        let finalPreStrNum = finalStr.slice(finalStr.length - 1);
        finalStr = `${finalPreStr}${finalPreStrNum * 1 + 1}`;
      } else {
        finalStr = `${finalStr}${aftStr}1`;
      }
    }
    return finalStr;
  }

  handleStringChange = (e) => {
    const showFinalStr = this.shortenString(e.target.value);
    this.setState({showFinalStr});
  }

  render() {
    return (
      <div>
        {/** 面试遇到的一些算法实现 */}
        <input onChange={this.handleStringChange} />
        {this.state.showFinalStr}
      </div>
    );
  }
}