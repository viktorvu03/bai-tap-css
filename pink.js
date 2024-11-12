function handleTagClick(event) {
    const selectedTag = event.target;
    const contentDiv = document.querySelector('.content-pink');
  
    // Cập nhật giao diện thẻ được chọn
    document.querySelectorAll('.tag-content-pink button').forEach(tag => {
      tag.style.borderBottom = tag === selectedTag ? '2px solid rgb(253, 113, 175)' : 'none';
      tag.classList.toggle('unselected', tag !== selectedTag);
    });
  
    // Đường dẫn nội dung tương ứng với thẻ
    const contentPaths = {
      'Báo Cáo Thông Minh': './pink/content1.html',
      'Tự Động Tính Phí': './pink/content2.html',
      'Thiết Lập Đơn Giản': './pink/content3.html'
    };
  
    // Tải nội dung
    fetch(contentPaths[selectedTag.innerText] || '')
      .then(response => response.ok ? response.text() : Promise.reject())
      .then(data => contentDiv.innerHTML = data)
      .catch(() => contentDiv.innerHTML = '<p>Chọn một thẻ để xem nội dung.</p>');
  }
  
  // Gán sự kiện click cho tất cả các thẻ
  document.querySelectorAll('.tag-content-pink button').forEach(tag => {
    tag.addEventListener('click', handleTagClick);
  });
  
  // Đặt mặc định thẻ đầu tiên
  handleTagClick({ target: document.querySelector('.tag-content-pink button') });
  
  // Xử lý cuộn
  const tagContentPink = document.querySelector(".tag-content-pink");
  const scrollLeftButtonPink = document.querySelector(".scroll-left-pink");
  const scrollRightButtonPink = document.querySelector(".scroll-right-pink");
  
  scrollLeftButtonPink.addEventListener("click", () => tagContentPink.scrollBy({ left: -300, behavior: "smooth" }));
  scrollRightButtonPink.addEventListener("click", () => tagContentPink.scrollBy({ left: 300, behavior: "smooth" }));
  
  // Cập nhật hiển thị các nút cuộn
  function updateScrollButtonsPink() {
    const isFullyVisiblePink = tagContentPink.scrollWidth <= tagContentPink.clientWidth;
    const isScrolledToLeftPink = tagContentPink.scrollLeft === 0;
    const isScrolledToRightPink = tagContentPink.scrollLeft + tagContentPink.clientWidth >= tagContentPink.scrollWidth ;
  
    scrollLeftButtonPink.style.display = isFullyVisiblePink || isScrolledToLeftPink ? 'none' : 'block';
    scrollRightButtonPink.style.display = isFullyVisiblePink || isScrolledToRightPink ? 'none' : 'block';
  }
  
  // Cập nhật hiển thị nút cuộn khi cuộn hoặc thay đổi kích thước
  tagContentPink.addEventListener('scroll', updateScrollButtonsPink);
  window.addEventListener('resize', updateScrollButtonsPink);
  
  // Kiểm tra lần đầu để đặt trạng thái nút cuộn
  updateScrollButtonsPink();
  