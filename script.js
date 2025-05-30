const track = document.getElementById('testimonialTrack');
const buttons = document.querySelectorAll('.scroll-btn');
let currentIndex = 0;
const totalCards = track.children.length;
function moveToIndex(index) {
  if (index < 0) index = 0;
  if (index >= totalCards) index = totalCards - 1;
  currentIndex = index;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

buttons.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    if (idx < totalCards - 1) {
      moveToIndex(currentIndex + 1);
    } else {
      const url = btn.getAttribute('data-url');
      if (url) window.open(url, '_blank');
    }
  });
});

let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50; 

track.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const distance = touchEndX - touchStartX;
  if (Math.abs(distance) < minSwipeDistance) return; 

  if (distance > 0) {
    moveToIndex(currentIndex - 1);
  } else {
    if (currentIndex < totalCards - 1) {
      moveToIndex(currentIndex + 1);
    } else {
      const lastBtn = buttons[buttons.length - 1];
      const url = lastBtn.getAttribute('data-url');
      if (url) window.open(url, '_blank');
    }
  }
}

document.querySelectorAll('.info-card .card-header').forEach(header => {
  const cardBody = header.nextElementSibling;

  header.style.cursor = 'pointer';

  header.addEventListener('click', () => {
    const isOpen = cardBody.style.display === 'block';

    // Toggle visibility of the card body
    cardBody.style.display = isOpen ? 'none' : 'block';
  });
});


//faqs
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    const arrow = trigger.querySelector('.faq-arrow');
    const targetId = trigger.getAttribute('data-target');
    const answer = document.getElementById(targetId);
  
    arrow.style.cursor = 'pointer';
  
    arrow.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = answer.style.display === 'block';
      answer.style.display = isVisible ? 'none' : 'block';
  
      if (!isVisible) {
        answer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  
  // Number Animations
function animateCount(el, target, duration = 2000) {
  let start = 1;
  const stepTime = Math.max(Math.floor(duration / (target - start)), 20);

  const counter = setInterval(() => {
    el.textContent = start;
    start++;

    if (start > target) {
      clearInterval(counter);
    }
  }, stepTime);
}

function animateCount(el, target, duration = 2000) {
  let start = 1;
  let current = start;

  const increment = target > 500 ? Math.ceil(target / (duration / 30)) : 1;
  const intervalTime = 30;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(counter);
    } else {
      el.textContent = current.toLocaleString();
    }
  }, intervalTime);
}

// scrolling animation
const animatedElements = document.querySelectorAll('.sm-boxes p');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.textContent.replace(/,/g, '').trim());

      if (!el.dataset.animated) {
        animateCount(el, target);
        el.dataset.animated = "true";
      }

      obs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

animatedElements.forEach(p => {
  observer.observe(p);
});


const boxes = document.querySelectorAll('.box');
const tooltip = document.getElementById('tooltip');

boxes.forEach(box => {
box.addEventListener('click', function(e) {
const info = this.dataset.info;
tooltip.innerText = info || '[Add content here]';
tooltip.style.top = this.offsetTop + this.offsetHeight + 5 + 'px';
tooltip.style.left = '184px'; 
tooltip.style.width = '249px'; 
tooltip.style.display = 'block';
});
});


document.addEventListener('click', function(e) {
  if (!e.target.classList.contains('box')) {
    tooltip.style.display = 'none';
  }
});

document.addEventListener('click', function(e) {
  if (!e.target.classList.contains('box')) {
    tooltip.style.display = 'none';
  }
});

  document.getElementById('videoContainer').addEventListener('click', function () {
    this.innerHTML = `
      <iframe width="560" height="315"
        src="https://www.youtube.com/embed/HTHX3xqWhn4?autoplay=1"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
      </iframe>`;
  });


  //portfolio
  const portfolioTrack = document.getElementById('portfolioTrack');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  function scrollToPortfolioCard(index) {
    if (index >= 0 && index < portfolioCards.length) {
      portfolioCards[index].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  }
  
  document.querySelectorAll('.scroll').forEach((button, index) => {
    button.addEventListener('click', () => {
      scrollToPortfolioCard(index + 1);
    });
  });
  
  let startX = 0;
  
  portfolioTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  portfolioTrack.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
  
    const visibleIndex = [...portfolioCards].findIndex(card =>
      Math.abs(card.getBoundingClientRect().left) < window.innerWidth / 2
    );
  
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) {
        scrollToPortfolioCard(visibleIndex + 1);
      } else {
        scrollToPortfolioCard(visibleIndex - 1);
      }
    }
  });
  