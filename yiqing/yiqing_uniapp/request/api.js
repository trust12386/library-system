const http = uni.$u.http;

const getApiList = () => http.get('/api/list').then(res => res.data.data)

export { getApiList };
