const posts = document.querySelector('.posts');
const temp = document.querySelector('template');
const fetchBtn = document.querySelector("#btn-fetch");
const form = document.querySelector('form');
const xhr = new XMLHttpRequest();

function sendHttpRequest(method,url,data){
    const promise = new Promise(function (resolve){
        xhr.open(method,url);
        xhr.onload = function () {
            resolve(JSON.parse(xhr.response))
        }
        xhr.send(JSON.stringify(data));
    });
    return promise;
}

function fetchPosts(){
    sendHttpRequest('GET','https://jsonplaceholder.typicode.com/posts').then(function (responseData){
            for (let post of responseData){
                const postEl = document.importNode(temp.content,true);
                postEl.querySelector('h2').textContent = `${post.title}`;
                postEl.querySelector('p').textContent = `${post.body}`;
                postEl.querySelector('li').id = `${post.id}`;
                posts.append(postEl);
            }
    })

}
fetchBtn.addEventListener('click',fetchPosts)

function createPost(title,content){
    const userId = Math.random();
    const post = {
        title : title,
        body : content,
        userId : userId,
    }
    sendHttpRequest("POST",'https://jsonplaceholder.typicode.com/posts',post);
}
form.addEventListener('submit',function (event){
    event.preventDefault();
    const enterdTitle = document.querySelector('#title').value;
    const enterdContent = document.querySelector('#content').value;
    createPost(enterdTitle,enterdContent)
})
posts.addEventListener('click',function (event){
    if(event.target.tagName === "BUTTON"){
        const postLi = event.target.closest('li').id;
        console.log(postLi)
        sendHttpRequest("DELETE",`https://jsonplaceholder.typicode.com/posts/${postLi}`);
    }
})





