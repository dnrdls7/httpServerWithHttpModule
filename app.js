const http = require("http");
const server = http.createServer();

const users = [
    {
    id: 1,
    name: "정재욱",
    email: "dnrdls77@gmail.com",
    password: "1q2w3e4r"
    }
];

const posts = [
    {
    id: 1,
    title: "프로그래머 입문자 생활",
    content: "wecode 생활 팁",
    userId: 1
    }
];

const httpRequestListener = function (req, res) {
    const { url, method } = req; 
    if(method === 'GET') {
        if(url === '/ping') {
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({'message' : 'pong'}))
        }
    } else if(method === 'POST') {
        if(url === '/users/signup') {
            let body = "";
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', () => {
                const user = JSON.parse(body);
                
                users.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password
                });

                res.end(JSON.stringify({'message' : 'userCreated'}));
            });

        } else if(url === '/posts/add') {
            let body = "";
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', () => {
                const post = JSON.parse(body);

                posts.push({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    userId: post.userId
                });
                res.writeHead(200, {'Content-Type' : 'application/json'});
                res.end(JSON.stringify({'message' : posts}));
            });
        }
    }
    // res.writeHead(200, {'Contest-Type' : 'application/json'});
    // res.end(JSON.stringify({message : 'Hello, World!'}));
};

server.on("request", httpRequestListener);

const IP = '127.0.0.1';
const PORT = 8000;

server.listen(PORT, IP, function(){
    console.log(`Listening to request on ip ${IP} & port ${PORT}`);
});