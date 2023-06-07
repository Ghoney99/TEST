let posts = [];

// JSON 파일에서 게시글 데이터 로드
function loadPosts() {
  fetch('faq.json')
    .then(response => response.json())
    .then(postsData => {
      posts = postsData;
      displayPosts();
    });
}

// 게시물 목록 표시
function displayPosts(filteredPosts) {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  const postsToDisplay = filteredPosts || posts;

  for (let i = 0; i < postsToDisplay.length; i++) {
    const post = postsToDisplay[i];
    const postItem = document.createElement("div");
    postItem.className = "post-item";
    postItem.innerHTML = `
      <h7 class="post-title" onclick="togglePostContent(${post.id})">${post.title}</h7>
      <div class="meta-info">
        <span>작성자: ${post.author}</span>
        <span>작성일: ${post.date}</span>

      </div>
      <div id="postContent_${post.id}" class="post-content hidden"></div>
      <div id="comments_${post.id}" class="comments hidden"></div>
    `;
    postList.appendChild(postItem);
  }
}

// 특정 ID의 게시물 가져오기
function getPostById(id) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      return posts[i];
    }
  }
  return null;
}

// 게시물 내용 토글
function togglePostContent(postId) {
  const postContent = document.getElementById(`postContent_${postId}`);
  const commentsSection = document.getElementById(`comments_${postId}`);

  postContent.classList.toggle('hidden');
  commentsSection.classList.toggle('hidden');

  if (!postContent.classList.contains('hidden')) {
    const post = getPostById(postId);
    if (post) {
      postContent.innerHTML = `<p class="content">${post.content}</p>`;
    }
  } else {
    postContent.innerHTML = "";
    commentsSection.innerHTML = "";
  }
}


// 최신순으로 게시물 정렬
function sortPostsByLatest() {
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  displayPosts();
}

// 조회수 순으로 게시물 정렬
function sortPostsByViews() {
  posts.sort((a, b) => b.views - a.views);
  displayPosts();
}

function handleSearch(event) {
  if (event.key === "Enter") {
    searchPosts();
  }
}

// 검색 기능
function searchPosts() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm !== "") {
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.author.toLowerCase().includes(searchTerm)
    );
    displayPosts(filteredPosts);
  } else {
    displayPosts();
  }
}

// 초기화
function init() {
  loadPosts();
}

// 초기화 함수 호출
init();
