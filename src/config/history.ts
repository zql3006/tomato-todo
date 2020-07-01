import { createHashHistory } from 'history'

const history = createHashHistory()

export default history
// import { createBrowserHistory } from 'history';

// const ENV = process.env.NODE_ENV;
// let publicUrl:string = '';

// if(ENV === 'development'){
// 	publicUrl = '/';
// }else if(ENV === 'production'){
// 	publicUrl = '/tomato-todo';
// }


// const history = createBrowserHistory({
// 	basename: publicUrl
// });

// export default history