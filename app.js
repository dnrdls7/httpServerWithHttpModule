const http = require("http");
const server = http.createServer();

const users = [
    {
        id: 1,
        name: "정재욱",
        email: "dnrdls77@gmail.com",
        password: "1q2w3e4r"
    },
    {
        id: 2,
        name: "만두",
        email: "mandoo@gmail.com",
        password: "qwer1234"
    }
];

const posts = [
    {
        id: 1,
        title: "프로그래머 입문자 생활",
        content: "wecode 생활 팁",
        userId: 1
    },
    {
        id: 2,
        title: "간식 맛있게 먹는법",
        content: "말랑한 간식은 천천히 먹기",
        userId: 2
    }
];

const httpRequestListener = function (req, res) {
    const { url, method } = req; 
    if(method === 'GET') {
        if(url === '/ping') {
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({'message' : 'pong'}))
        } else if(url === '/posts/list/all') {
            let body = [];
            
                for(let i=0; i<posts.length; i++) {
                    let post_username = "";

                    for(let j=0; j<users.length; j++) {
                        if(users[j].id === posts[i].userId) {
                            post_username = users[j].name;
                        }
                    };

                    body.push({
                        userID: posts[i].userId,
                        userName: post_username,
                        postingID: posts[i].id,
                        postingTitle: posts[i].title,
                        postingContent: posts[i].content
                    });
                };
                res.writeHead(200, {'Content-Type' : 'application/json'});
                res.end(JSON.stringify({'data' : body}));
                // res.end(JSON.stringify({'message' : 'postsAllList'}));

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

                // res.end(JSON.stringify({'message' : 'userCreated'}));
                res.end(JSON.stringify({'message' : users}));
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

                // res.end(JSON.stringify({'message' : 'postCreated'}));
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