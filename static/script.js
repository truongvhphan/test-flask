  const searchHomeBtn = document.getElementById('searchHomeBtn');
  const searchHomeInput = document.getElementById('searchHomeInput');

  searchHomeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchHomeInput.value.trim();
    if (query) {
      const url = `http://localhost:5050/shopping?search=${encodeURIComponent(query)}`;
      window.location.href = url;
    }
  });

const slides = [
  {
    title: 'RƯỚC BOSS<br>NGOAN NGOÃN<br>SIÊU ĐÁNG YÊU',
    subtitle: 'Khám phá tất cả các bé thú cưng siêu đáng yêu',
    discount: 'Giảm giá ngay 25%',
    image: '/static/images/home/dog.png',
    altText: 'Chó đang vui vẻ'
  },
  {
    title: 'BỮA ĂN<br>ĐẦY ĐỦ CHO<br>BOSS CỦA BẠN',
    subtitle: 'Mang đến điều tốt nhất cho các bé mèo của bạn',
    discount: 'Tiết kiệm 30% cho các thương hiệu chọn lọc',
    image: '/static/images/home/cat.png',
    altText: 'Mèo tinh nghịch'
  },
  {
    title: 'DỊCH VỤ<br>TẬN TÂM<br>BOSS AN TÂM',
    subtitle: 'Tất cả các dịch vụ bạn cần cho thú cưng',
    discount: 'Giảm giá 20% trong thời gian có hạn',
    image: '/static/images/home/spa.png',
    altText: 'Các dịch vụ spa'
  }
];

let currentIndex = 0;
const titleText = document.getElementById('titleText');
const subtitleText = document.getElementById('subtitleText');
const discountText = document.getElementById('discountText');
const dogImage = document.getElementById('dogImage');
const textSection = document.getElementById('promoText');
const dotsContainer = document.getElementById('dotsContainer');

function updateSlide(index) {
  const slide = slides[index];
  textSection.style.opacity = 0;
  dogImage.style.opacity = 0;

  setTimeout(() => {
    titleText.innerHTML = slide.title;
    subtitleText.textContent = slide.subtitle;
    discountText.textContent = slide.discount;
    dogImage.src = slide.image;
    dogImage.alt = slide.altText;

    textSection.style.opacity = 1;
    dogImage.style.opacity = 1;

    updateDots(index);
  }, 400);
}

function createDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlide(i);
      resetTimer();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateSlide(index) {
  const slide = slides[index];

  textSection.style.opacity = 0;
  dogImage.style.opacity = 0;

  setTimeout(() => {
    titleText.innerHTML = slide.title;
    subtitleText.textContent = slide.subtitle;
    discountText.textContent = slide.discount;

    dogImage.classList.remove('flash-in');
    void dogImage.offsetWidth;

    dogImage.src = slide.image;
    dogImage.alt = slide.altText;

    textSection.style.opacity = 1;

    dogImage.style.opacity = 1;
    dogImage.classList.add('flash-in');

    setTimeout(() => {
      dogImage.classList.remove('flash-in');
    }, 500); 

    updateDots(index);
  }, 400);
}


function updateDots(activeIndex) {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}

document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide(currentIndex);
  resetTimer();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex);
  resetTimer();
});

document.getElementById("shopBtn").addEventListener("click", function () {
  window.location.href = `/shopping${encodeURIComponent(query)}`;
});

let slideInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex);
}, 4000);

function resetTimer() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
  }, 4000);
}

createDots();
updateSlide(currentIndex);

function toggleArticle(element) {
    const content = element.parentElement.querySelector('.article-full-content');
    const isHidden = content.classList.contains('hidden');
    
    const originalText = element.innerText.includes("Thu gọn") ? element.dataset.originalText : element.innerText;
    if (!element.dataset.originalText) {
        element.dataset.originalText = originalText;
    }

    content.classList.toggle('hidden');
    element.innerHTML = isHidden
        ? `<svg viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke-width="2"/></svg> Thu gọn`
        : `<svg viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke-width="2"/></svg> ${element.dataset.originalText}`;
}

function openModal(element) {
    const modal = document.getElementById('articleModal');
    const title = element.getAttribute('data-title');
    const content = element.getAttribute('data-content');

    document.getElementById('modalTitle').innerText = title;

    document.getElementById('modalContent').innerHTML = content.replace(/\n/g, "<br><br>");

    modal.classList.remove('hidden');
}


function closeModal() {
    document.getElementById('articleModal').classList.add('hidden');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});


// PART 4
document.getElementById('allProductsBtn').addEventListener('click', () => {
  alert('Redirect to all products page or load more products.');
});


document.querySelector('.subscribe-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const emailInput = this.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  if (email.length === 0 || !validateEmail(email)) {
    alert('Vui lòng nhập email hợp lệ!');
    emailInput.focus();
    return;
  }
  alert('Cảm ơn bạn đã đăng ký: ' + email);
  emailInput.value = '';
});

function validateEmail(email) {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email.toLowerCase());
}

function handleClick(label) {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = `You selected: ${label}`;
  snackbar.classList.add('show');

  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 2500);

}


const cards = document.querySelectorAll('.feature-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.style.transition = 'box-shadow 0.1s ease';
    card.style.boxShadow = '0 0 0 4px #000 inset';
    setTimeout(() => {
      card.style.boxShadow = '';
      card.style.transition = 'box-shadow 0.3s ease';
    }, 150);
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.querySelector('.open-booking-btn');
  const bookingForm = document.getElementById('bookingForm');
  const closeBtn = bookingForm.querySelector('.close-booking-btn');

  openBtn.addEventListener('click', () => {
    bookingForm.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    bookingForm.classList.add('hidden');
  });
});

  const menuIcon = document.getElementById('menu-icon');
  const navMenu = document.getElementById('navMenu');

  menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });


