import React, { useRef, useEffect } from 'react';

let time = 0;

function CanvasExample() {
  const canvasId = useRef(null);

  // 绘制页面不变的部分
  const drawNotChange = (context) => {
    context.fillStyle='red';
    context.beginPath();
    context.arc(100,100,10,0,2*Math.PI,true); // 内部的红圆
    context.closePath();
    context.fill();
    context.beginPath();
    context.arc(100,100,50,0,2*Math.PI,true); // 大圆圈
    context.closePath();
    context.stroke();
  };

  // 每隔一段时间，清除页面内容然后重新绘制
  const run = (cxt) => {
    cxt.clearRect(0,0,300,200);   
    drawNotChange(cxt);
    cxt.save(); // 将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
    cxt.translate(100,100);
    cxt.rotate(time*6*Math.PI/180); // 设定每次旋转的度数
    cxt.fillStyle='blue';
    cxt.beginPath();
    cxt.arc(35,35,10,0,2*Math.PI,false); // 旋转的蓝色的圆
    cxt.closePath();
    cxt.fill();
    cxt.restore(); // 将当前为(500,400)的点还原为（0,0）,其实在save中就是将上下文环境保存到栈中，在restore下面对其进行还原
    time+=1;
  };

  useEffect(() => {
    const canvasDom = canvasId.current;
    canvasDom.height=200;
    canvasDom.width=300;
    const context=canvasDom.getContext('2d');
    drawNotChange(context);
    context.fillStyle='blue';
    context.beginPath();
    context.arc(65,65,10,0,2*Math.PI,true);
    context.closePath();
    context.fill();
    setInterval(function(){
      run(context);
   }, 50);
  });
  return (
    <canvas ref={canvasId}/>
  );
}

export default CanvasExample;
