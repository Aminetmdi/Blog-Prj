const container = document.querySelector(".blogs");
const searchForm = document.querySelector(".search");

const renderPosts = async (term) => {
  let URL = "http://localhost:3000/posts?_sort=likes&_order=desc";
  if (term) {
    URL += `&q=${term}`;
  }
  const res = await fetch(URL);
  const posts = await res.json();

  let template = "";
  posts.forEach((post) => {
    template += `
    <div class="post">
    <h2>${post.title}</h2>
    <p><small>${post.likes} likes</small></p>
    <p>${post.body.slice(0, 200)}</p>
    <a href="/details.html?id=${post.id}">read more...</a>
    </div>
    `;
  });
  container.innerHTML = template;
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});

window.addEventListener("DOMContentLoaded", () => renderPosts());
