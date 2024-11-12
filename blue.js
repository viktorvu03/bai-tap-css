function handleTagClick(event) {
  const selectedTag = event.target;
  const contentDiv = document.querySelector(".content");
  
  // Cập nhật giao diện thẻ được chọn
  document.querySelectorAll(".tag-content button").forEach(tag => {
    tag.style.borderBottom = tag === selectedTag ? "2px solid rgb(73, 204, 249)" : "none";
    tag.classList.toggle("unselected", tag !== selectedTag);
  });

  // Đường dẫn nội dung tương ứng với thẻ
  const contentPaths = {
    "Tuyển Sinh": "./blue/content1.html",
    "Công Việc": "./blue/content2.html",
    "Lớp Học": "./blue/content3.html",
    "Học Viên": "./blue/content4.html",
    "Giáo Viên": "./blue/content5.html",
    "Tài Chính": "./blue/content6.html"
  };

  // Tải nội dung tương ứng với thẻ
  fetch(contentPaths[selectedTag.innerText] || "")
    .then(response => response.ok ? response.text() : Promise.reject())
    .then(data => contentDiv.innerHTML = data)
    .catch(() => contentDiv.innerHTML = "<p>Chọn một thẻ để xem nội dung.</p>");
}

document.querySelectorAll(".tag-content button").forEach(tag => {
  tag.addEventListener("click", handleTagClick);
});

// Đặt mặc định thẻ đầu tiên
handleTagClick({ target: document.querySelector(".tag-content button") });

// Cuộn các thẻ
const tagContent = document.querySelector(".tag-content");
document.querySelector(".scroll-left").addEventListener("click", () => tagContent.scrollBy({ left: -1000, behavior: "smooth" }));
document.querySelector(".scroll-right").addEventListener("click", () => tagContent.scrollBy({ left: 1000, behavior: "smooth" }));

// Ẩn/hiện nút cuộn khi cần thiết
tagContent.addEventListener("scroll", () => {
  const isScrolledToLeft = tagContent.scrollLeft === 0;
  const isScrolledToRight = tagContent.scrollLeft + tagContent.clientWidth >= tagContent.scrollWidth - 50;
  document.querySelector(".scroll-left").style.display = isScrolledToLeft ? "none" : "block";
  document.querySelector(".scroll-right").style.display = isScrolledToRight ? "none" : "block";
});

window.addEventListener("resize", () => {
  const isFullyVisible = tagContent.scrollWidth <= tagContent.clientWidth;
  document.querySelector(".scroll-left").style.display = document.querySelector(".scroll-right").style.display = isFullyVisible ? "none" : "block";
});
