
let samplePosts = [
    { username: "Divyansh", content: "I just completed a heavy workout", Upvotes: 0, Downvotes: 0, comments: [] },
];

function displayPosts(posts) {
    const forumSection = document.querySelector(".forum");
    forumSection.innerHTML = ""; 

    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h3>${post.username}</h3>
            <p>${post.content}</p>
            <button onclick="upvoteP(${index})">Upvote</button>
            <span>${post.Upvotes}</span>
            <button onclick="downvoteP(${index})">Downvote</button>
            <span>${post.Downvotes}</span>
            <div class="comment-section">
                <textarea id="commentInput${index}" placeholder="Write a comment"></textarea>
                <button onclick="addComment(${index})">Add Comment</button>
                <div class="comments">
                    ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                </div>
            </div>
        `;
        forumSection.appendChild(postElement);
    });
}
function downvoteP(index) {
    samplePosts[index].Downvotes++;
    storePosts(samplePosts);
    displayPosts(samplePosts);
}
function upvoteP(index) {
    samplePosts[index].Upvotes++;
    storePosts(samplePosts);
    displayPosts(samplePosts);
}



function addComment(index) {
    const commentInput = document.getElementById(`commentInput${index}`);
    const commentText = commentInput.value.trim();
    if (commentText) {
        samplePosts[index].comments.push(commentText);
        storePosts(samplePosts);
        commentInput.value = '';
        displayPosts(samplePosts);
    }
}
function storePosts(posts){
    localStorage.setItem("forumPosts" , JSON.stringify(posts));
}


document.getElementById("postForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const postContent = document.getElementById("postContent").value;

    if (username && postContent) {
        const newPost = { username, content: postContent, Upvotes: 0, Downvotes: 0, comments: [] };

        samplePosts.push(newPost);
        storePosts(samplePosts);

        document.getElementById("username").value = "";
        document.getElementById("postContent").value = "";

        displayPosts(samplePosts);
    }
});

displayPosts(samplePosts);
