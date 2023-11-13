const posts = require('../db/posts')

function index (req, res) {

    res.format({
        html: () => {        
            res.type("html")
            const html = [`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <h1>Lista dei post</h1>`];

            html.push("<ul class=''>");

            posts.forEach(post => {
                html.push(`<li>
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <img src="/assets/images/${post.image}" alt="${post.title}" class="w-25"><br>`);
            
                post.tags.forEach(tag => {
                    html.push(`<span class="badge bg-primary">${tag}</span>`);
                });
            
                html.push(`</li>`);
            });

            res.send(html.join(""));
        },
        json: () => {
            res.type("json").send(JSON.stringify(posts))
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        },
    })
}

module.exports = {
  index,
}