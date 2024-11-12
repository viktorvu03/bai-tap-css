const testimonials = [
    {
        quote: "Ant Center đã thực sự làm thay đổi cách quản lý trung tâm đào tạo của chúng tôi. Với những tính năng toàn diện, chúng tôi có thể dễ dàng quản lý việc đăng ký học viên, lịch học và tài liệu đào tạo. Phần mềm này đã tối ưu hóa quy trình làm việc của chúng tôi và cải thiện hiệu suất làm việc tổng thể.",
        name: "Quỳnh Anh",
        title: "Founder & CEO - Amslink",
        avatar: "https://ant-center.com/assets/testimonial-avatar/amslink.jpg"
    },
    {
        quote: "Kể từ khi triển khai Ant Center, chúng tôi đã chứng kiến một sự thay đổi đáng kể trong hoạt động của MoyArt. Các tính năng mạnh mẽ của phần mềm này cho phép chúng tôi dễ dàng theo dõi tiến trình học tập của học viên, quản lý phân công giảng viên và tạo ra báo cáo chi tiết.",
        name: "Võ Mai Thương",
        title: "Founder & CEO - MoyArt",
        avatar: "https://ant-center.com/assets/testimonial-avatar/MoyArt.jpg"
    },
    {
        quote: "Chúng tôi rất hài lòng với phần mềm Ant Center. Giao diện thân thiện và các tính năng mạnh mẽ của nó đã đơn giản hóa các công việc quản lý của chúng tôi. ",
        name: "Tùng Đàm",
        title: "Founder & CEO - AtSchool",
        avatar: "https://ant-center.com/assets/testimonial-avatar/AtSchool.jpg"
    },
    {
        quote: "Chúng tôi đã tiết kiệm rất nhiều thời gian và công sức kể từ khi sử dụng Ant Center. Nhiều tính năng linh hoạt và dễ sử dụng giúp chúng tôi dễ dàng theo dõi học viên, quản lý lớp học và tạo lịch học một cách hiệu quả.",
        name: "Ngân JP",
        title: "Founder & CEO - BrainSTEM",
        avatar: "https://ant-center.com/assets/testimonial-avatar/BrainSTEM.jpg"
    },
    {
        quote: "Ant Center đã giúp chúng tôi tối ưu xếp lịch dạy và quản lý công việc một cách hiệu quả. Bảng công tự động và tính năng đánh giá kết quả giảng dạy toàn diện đã giúp chúng tôi tiết kiệm thời gian và nâng cao hiệu suất làm việc của giáo viên.",
        name: "Linh Đặng",
        title: "Founder & CEO - BZ English",
        avatar: "https://ant-center.com/assets/testimonial-avatar/BZEnglish.jpg"
    }
];

const quoteElement = document.querySelector('.quote');
const nameElement = document.querySelector('.name');
const titleElement = document.querySelector('.title1');
const avatarScroll = document.querySelector('.avatar-scroll');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;
let autoSlideInterval;

// Tạo và hiển thị các avatar
function createAvatars() {
    testimonials.forEach((testimonial) => {
        const avatar = document.createElement('img');
        avatar.src = testimonial.avatar;
        avatar.classList.add('avatar');
        avatarScroll.appendChild(avatar);
    });
}

// Cập nhật nội dung testimonial
function updateTestimonial(index) {
    const testimonial = testimonials[index];
    quoteElement.textContent = testimonial.quote;
    nameElement.textContent = testimonial.name;
    titleElement.textContent = testimonial.title;
}

// Cập nhật ảnh đang active ở giữa
function updateActiveAvatar() {
    const avatars = avatarScroll.querySelectorAll('.avatar');
    avatars.forEach(avatar => avatar.classList.remove('active'));
    avatars[2].classList.add('active'); // Ảnh ở giữa là active
}

// Dịch chuyển avatar để đưa ảnh được chọn vào giữa
function adjustAvatarsToCenter(selectedIndex) {
    const avatars = Array.from(avatarScroll.children);
    let shiftCount = selectedIndex - 2;

    if (shiftCount > 0) {
        for (let i = 0; i < shiftCount; i++) {
            avatarScroll.appendChild(avatarScroll.firstElementChild);
        }
    } else if (shiftCount < 0) {
        for (let i = 0; i < Math.abs(shiftCount); i++) {
            avatarScroll.insertBefore(avatarScroll.lastElementChild, avatarScroll.firstElementChild);
        }
    }
}

// Sự kiện cho nút chuyển slide trái
function scrollLeft() {
    avatarScroll.style.transition = 'none';
    avatarScroll.appendChild(avatarScroll.firstElementChild);

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial(currentIndex);
        updateActiveAvatar();
    }, 0.5); 
}

// Sự kiện cho nút chuyển slide phải
function scrollRight() {
    avatarScroll.style.transition = 'none';
    avatarScroll.insertBefore(avatarScroll.lastElementChild, avatarScroll.firstElementChild);

    setTimeout(() => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentIndex);
        updateActiveAvatar();
    }, 0.5); 
}

prevButton.addEventListener('click', () => {
    scrollRight();
});

nextButton.addEventListener('click', () => {
    scrollLeft();
});

// Tự động chuyển ảnh
function autoSlide() {
    scrollLeft();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(autoSlide, 3000);
}

// Xử lý sự kiện click vào avatar
avatarScroll.addEventListener('click', (e) => {
    if (e.target.classList.contains('avatar')) {
        const avatars = Array.from(avatarScroll.children);
        const selectedIndex = avatars.indexOf(e.target);
        currentIndex = (currentIndex + (selectedIndex - 2) + testimonials.length) % testimonials.length;
        adjustAvatarsToCenter(selectedIndex);
        updateTestimonial(currentIndex);
        
        updateActiveAvatar();   
    }
});

// Khởi tạo và bắt đầu slider
createAvatars();
updateTestimonial(currentIndex);
updateActiveAvatar();
startAutoSlide();


