const http=require('http' );

const app=require('./app');
const { initializeSocket } = require('./socket');
const port=process.env.PORT ||3000;
// app ke liye ek http server create hua 
const server= http.createServer(app);
// this will initialize the socket for that server
initializeSocket(server);
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
