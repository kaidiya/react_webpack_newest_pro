
const getObjectParams = (params) => {
  if (!params) return;
  const finalResult = [];
  const allKeys = Object.keys(params);
  if (allKeys.length) {
    allKeys.forEach(key => {
      if (params[key]) {
        finalResult.push(`${key}=${params[key]}`);
      }
    });
  }
  return finalResult.join('&');
};

const common_url = 'http:localhost:9090'

const getHttp = (type = 'POST') => (url, params) => {
  let secondParams = {
    Accept: 'application/json',
    credentials: 'include',
    method: type,
    headers: {
      fsUss: '411fcd76673d1e8a3eb857f49e3430eaa1b90d361701990c70b8db507d6798d8',
      'Content-Type': 'application/json;charset=UTF-8'
    },
  };
  if (type !== 'GET') {
    secondParams.body = JSON.stringify(params);
  }
  if (type === 'GET') {
    url = `${url}${params ? '?' : ''}${getObjectParams(params) || ''}`;
  }
  return fetch(url, secondParams).then(res => {
    return res.json();
  });
};

export default {
  get: getHttp('GET'),
  post: getHttp('POST'),
};