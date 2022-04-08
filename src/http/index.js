const axios = require("axios").default;
const http = axios.create({
    timeout: 30000,
});
http.interceptors.request.use(
    (config)=>{
        let {url} = config;
        let baseURL = '';
        const isProd = process.env.NODE_ENV === 'production';
        if(isProd){
            baseURL = `${document.location.protocol}`
        }
        config = {
            ...config,
            baseURL :baseURL,
            url,
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json;charset=utf-8',
                ...config.headers,
            }
        };
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);
http.interceptors.response.use(
    (res)=>{
        if(res.status === 200){
            return res;
        }
        return Promise.reject(res);
    },
    (error)=>{
        const status = (error.response && error.response.status && error.response.status) || '';
        const data = (error.response && error.response.data) || {};
        if(data.message){
            return Promise.reject(data.message);
        }

        if(error.code=='ECONNABORTED' && error.message.indexOf('timeout' != -1)){
            return Promise.reject('请求超时');
        }
        return Promise.reject({
            status,
        })
    }
)

export default http;