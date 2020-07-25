import React, { useEffect, useMemo, memo, useState } from 'react';

const  TestEffect =  memo(() => {
  const [data, setData] = useState([{a: 1}]);
  useEffect(() => {
    console.log(12313);
  }, [data]);
  return (
    <>
    <span onClick={() => setData([{a: 1}, {b: 2}])}>12312312312312312313213</span>
    </>
  );
});

export default TestEffect;