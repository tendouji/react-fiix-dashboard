// const curBasePath = '/react-fiix-dashboard';
const curBasePath = '';
const curSWPath = curBasePath + '/service-worker.js';

if(typeof window !== 'undefined') { 
// NOTE: need to check, as this code is also used in Service Worker, which doesn't have window object
    window.appObj = {
        curBasePath,
        curSWPath,   
    };
}