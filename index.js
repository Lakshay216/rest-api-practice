const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));

let posts=[
    {
        id:uuidv4(),
        username:"lakshay",
        content:"hi how are you??"
    },
    {
        id:uuidv4(),
        username:"asees",
        content:"hey there how you doing"
    },
    {
        id:uuidv4(),
        username:"diya",
        content:"hi how you doing"
    },
]

app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');
})
app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({username,content,id});
    res.redirect('/posts');
})


app.get('/posts/:id',(req,res)=>{
    let{id} = req.params;
    let post = posts.find((post)=>id ===post.id);
   // console.log(post);
    res.render('show.ejs',{post});
})

app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=>id ===post.id);
    res.render('edit.ejs',{post});
})

app.patch('/posts/:id',(req,res)=>{
    let {id}= req.params;
    let newContent = req.body.content;
    let post = posts.find((post)=>id ===post.id);
    post.content = newContent;
    res.redirect('/posts');
})

app.delete('/posts/:id',(req,res)=>{
    let{id} = req.params;
    posts = posts.filter((post)=>id !==post.id);
    res.redirect('/posts');

})


app.listen(port,()=>{
    console.log(`listening on port ${port}`); 
})
