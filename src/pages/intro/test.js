import React, {useState, useRef} from 'react';

export default function Test() {
  const [clickCount, setClickCount] = useState(0);
  const renderTimes = useRef(0);
  renderTimes.current++;

  const handleClick = () => {
    setClickCount(clickCount + 1);
    console.log(`第一次setClickount：${clickCount}`);
    setClickCount(clickCount + 1);
    console.log(`第二次setClickount：${clickCount}`);
    setTimeout(() => {
      setClickCount(clickCount + 1);
      console.log(`第三次setClickount：${clickCount}`);
      setClickCount(clickCount + 1);
      console.log(`第四次setClickount：${clickCount}`);
    }, 3000);
  };
  return (
    <div>
      <p>你点击了{clickCount}次</p>
      <p>{`页面第${renderTimes.current}次渲染`}</p>
      <button onClick={handleClick}>点击触发页面渲染</button>
    </div>
  );
}