/* ============================================================
   ARTIST WEBSITE — script.js
   ============================================================ */

/* ===== EXHIBITION DATA =====
   이미지 교체 방법:
   - images 배열의 각 객체에 src 속성 추가: src: 'images/exhibition-1/view1.jpg'
   - gradient는 src 이미지가 없을 때 placeholder로 표시됨
   ============================*/
const exhibitions = [
  {
    id: 1,
    title: '경계의 지형',
    subtitle: 'Topography of Boundaries',
    venue: '아트스페이스 루',
    city: '서울',
    year: '2024',
    type: 'solo',
    gradient: 'linear-gradient(140deg, #D4C8B4 0%, #8A7B68 100%)',
    images: [
      {
        type: '전시 전경',
        // src: 'images/ex1/view1.jpg',
        gradient: 'linear-gradient(140deg, #D4C8B4 0%, #8A7B68 100%)',
        caption: '전시 전경, 아트스페이스 루, 서울, 2024',
      },
      {
        type: '전시 전경',
        // src: 'images/ex1/view2.jpg',
        gradient: 'linear-gradient(160deg, #C8BAA4 0%, #786A58 100%)',
        caption: '전시 전경, 아트스페이스 루, 서울, 2024',
      },
      {
        type: '작품',
        // src: 'images/ex1/work1.jpg',
        gradient: 'linear-gradient(45deg, #B8A890 0%, #685848 100%)',
        caption: '무제 I, 캔버스에 유채, 120 × 90 cm, 2024',
      },
      {
        type: '작품',
        // src: 'images/ex1/work2.jpg',
        gradient: 'linear-gradient(90deg, #A89880 0%, #584838 100%)',
        caption: '무제 II, 캔버스에 유채, 100 × 80 cm, 2024',
      },
      {
        type: '작품',
        // src: 'images/ex1/work3.jpg',
        gradient: 'linear-gradient(120deg, #988878 0%, #483828 100%)',
        caption: '무제 III, 혼합매체, 80 × 60 cm, 2024',
      },
    ],
  },
  {
    id: 2,
    title: '공기의 무게',
    subtitle: 'Weight of Air',
    venue: '갤러리현대',
    city: '서울',
    year: '2022',
    type: 'solo',
    gradient: 'linear-gradient(140deg, #C4D4E4 0%, #4A6888 100%)',
    images: [
      {
        type: '전시 전경',
        gradient: 'linear-gradient(140deg, #C4D4E4 0%, #4A6888 100%)',
        caption: '전시 전경, 갤러리현대, 서울, 2022',
      },
      {
        type: '전시 전경',
        gradient: 'linear-gradient(160deg, #B4C4D4 0%, #3A5878 100%)',
        caption: '전시 전경, 갤러리현대, 서울, 2022',
      },
      {
        type: '작품',
        gradient: 'linear-gradient(45deg, #A4B4C4 0%, #2A4868 100%)',
        caption: '공기의 무게 I, 종이에 수채, 80 × 60 cm, 2022',
      },
      {
        type: '작품',
        gradient: 'linear-gradient(110deg, #94A4B4 0%, #1A3858 100%)',
        caption: '공기의 무게 II, 종이에 수채, 80 × 60 cm, 2022',
      },
    ],
  },
  {
    id: 3,
    title: '잠시 머무는 곳',
    subtitle: 'A Place to Stay',
    venue: '스페이스K',
    city: '서울',
    year: '2020',
    type: 'solo',
    gradient: 'linear-gradient(140deg, #E4D4C4 0%, #886448 100%)',
    images: [
      {
        type: '전시 전경',
        gradient: 'linear-gradient(140deg, #E4D4C4 0%, #886448 100%)',
        caption: '전시 전경, 스페이스K, 서울, 2020',
      },
      {
        type: '작품',
        gradient: 'linear-gradient(55deg, #D4C4B4 0%, #785438 100%)',
        caption: '머무는 시간, 캔버스에 아크릴, 200 × 150 cm, 2020',
      },
      {
        type: '작품',
        gradient: 'linear-gradient(100deg, #C4B4A4 0%, #684428 100%)',
        caption: '풍경의 기억, 종이에 혼합매체, 100 × 70 cm, 2020',
      },
    ],
  },
  {
    id: 4,
    title: '한국 현대미술의 단면',
    subtitle: 'Cross-section of Korean Contemporary Art',
    venue: '국립현대미술관',
    city: '서울',
    year: '2024',
    type: 'group',
    gradient: 'linear-gradient(140deg, #D4E4D4 0%, #488448 100%)',
    images: [
      {
        type: '전시 전경',
        gradient: 'linear-gradient(140deg, #D4E4D4 0%, #488448 100%)',
        caption: '전시 전경, 국립현대미술관, 서울, 2024',
      },
      {
        type: '작품',
        gradient: 'linear-gradient(60deg, #C4D4C4 0%, #387438 100%)',
        caption: '경계 위에서, 캔버스에 유채, 180 × 120 cm, 2023',
      },
    ],
  },
  {
    id: 5,
    title: '경계 너머',
    subtitle: 'Beyond Boundaries',
    venue: '아르코미술관',
    city: '서울',
    year: '2022',
    type: 'group',
    gradient: 'linear-gradient(140deg, #E4D4E4 0%, #784878 100%)',
    images: [
      {
        type: '전시 전경',
        gradient: 'linear-gradient(140deg, #E4D4E4 0%, #784878 100%)',
        caption: '전시 전경, 아르코미술관, 서울, 2022',
      },
      {
        type: '작품',
        gradient: 'linear-gradient(80deg, #D4C4D4 0%, #683868 100%)',
        caption: '무경계 No.3, 캔버스에 유채, 150 × 100 cm, 2022',
      },
    ],
  },
  {
    id: 6,
    title: '물질의 기억',
    subtitle: 'Memory of Matter',
    venue: '갤러리 포',
    city: '부산',
    year: '2018',
    type: 'solo',
    gradient: 'linear-gradient(140deg, #E4E4D4 0%, #787848 100%)',
    images: [
      {
        type: '전시 전경',
        gradient: 'linear-gradient(140deg, #E4E4D4 0%, #787848 100%)',
        caption: '전시 전경, 갤러리 포, 부산, 2018',
      },
      {
        type: '전시 전경',
        gradient: 'linear-gradient(160deg, #D4D4C4 0%, #686838 100%)',
        caption: '전시 전경, 갤러리 포, 부산, 2018',
      },
      {
        type: '작품',
        gradient: 'linear-gradient(45deg, #C4C4B4 0%, #585828 100%)',
        caption: '기억의 층위 I, 혼합매체, 90 × 120 cm, 2018',
      },
      {
        type: '작품',
        gradient: 'linear-gradient(100deg, #B4B4A4 0%, #484818 100%)',
        caption: '기억의 층위 II, 혼합매체, 90 × 120 cm, 2018',
      },
    ],
  },
]

/* ============================================================
   STATE
   ============================================================ */
let currentExhibition = null
let currentIndex = 0

/* ============================================================
   NAVIGATION
   ============================================================ */
const nav = document.getElementById('nav')
const navToggle = document.getElementById('navToggle')
const mobileMenu = document.getElementById('mobileMenu')
const navLinks = document.querySelectorAll('.nav-link')

// Scroll: add 'scrolled' class and update active link
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30)
  updateActiveNav()
}, { passive: true })

function updateActiveNav() {
  const offsets = ['home', 'cv', 'exhibition', 'contact'].map(id => {
    const el = document.getElementById(id)
    return { id, top: el ? el.getBoundingClientRect().top : Infinity }
  })

  let active = 'home'
  offsets.forEach(({ id, top }) => {
    if (top <= 100) active = id
  })

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${active}`)
  })
}

// Mobile toggle
navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open')
  navToggle.classList.toggle('open', open)
  navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기')
})

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    navToggle.classList.remove('open')
  })
})

// Smooth scroll for all internal anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})

/* ============================================================
   INTERSECTION OBSERVER — entrance animations
   ============================================================ */
const io = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      io.unobserve(entry.target)
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
)

document.querySelectorAll('.animate-in').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.05}s`
  io.observe(el)
})

/* ============================================================
   EXHIBITION GRID
   ============================================================ */
function renderGrid(list) {
  const grid = document.getElementById('exhibitionGrid')

  if (list.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:80px 0;color:#888;font-size:.8rem;letter-spacing:.1em">No exhibitions found</p>'
    return
  }

  grid.innerHTML = list.map(ex => {
    const imgContent = ex.images[0].src
      ? `<img src="${ex.images[0].src}" alt="${ex.title}" loading="lazy">`
      : `<div style="width:100%;height:100%;background:${ex.gradient};"></div>`

    return `
      <article class="ex-card animate-in" data-id="${ex.id}" tabindex="0" role="button" aria-label="${ex.title} 전시 보기">
        <div class="ex-card-img">${imgContent}</div>
        <span class="ex-card-badge">${ex.year}</span>
        <div class="ex-card-overlay">
          <div class="ex-card-info">
            <p class="ex-card-type">${ex.type === 'solo' ? 'Solo' : 'Group'}</p>
            <h3 class="ex-card-title">${ex.title}</h3>
            <p class="ex-card-meta">${ex.venue}, ${ex.city}</p>
          </div>
        </div>
      </article>
    `
  }).join('')

  // Observe new cards
  grid.querySelectorAll('.animate-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.06}s`
    io.observe(el)
  })

  // Click + keyboard
  grid.querySelectorAll('.ex-card').forEach(card => {
    const open = () => {
      const ex = exhibitions.find(e => e.id === parseInt(card.dataset.id))
      if (ex) openModal(ex)
    }
    card.addEventListener('click', open)
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() } })
  })
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    const filter = btn.dataset.filter
    const list = filter === 'all' ? exhibitions : exhibitions.filter(e => e.type === filter)
    renderGrid(list)
  })
})

/* ============================================================
   MODAL
   ============================================================ */
const overlay   = document.getElementById('modalOverlay')
const modalClose = document.getElementById('modalClose')
const modalPrev  = document.getElementById('modalPrev')
const modalNext  = document.getElementById('modalNext')
const modalImage = document.getElementById('modalImage')
const modalTag   = document.getElementById('modalTag')
const modalCtr   = document.getElementById('modalCounter')
const modalTitle = document.getElementById('modalTitle')
const modalVenue = document.getElementById('modalVenue')
const modalCap   = document.getElementById('modalCaption')
const modalThumbs= document.getElementById('modalThumbnails')

function openModal(ex) {
  currentExhibition = ex
  currentIndex = 0
  renderModal()
  overlay.classList.add('open')
  document.body.style.overflow = 'hidden'
  modalClose.focus()
}

function closeModal() {
  overlay.classList.remove('open')
  document.body.style.overflow = ''
  currentExhibition = null
}

function renderModal() {
  if (!currentExhibition) return
  const img   = currentExhibition.images[currentIndex]
  const total = currentExhibition.images.length

  // Image
  if (img.src) {
    modalImage.innerHTML = `<img src="${img.src}" alt="${img.caption}">`
  } else {
    modalImage.innerHTML = `<div class="modal-img-placeholder" style="background:${img.gradient};">${img.type}</div>`
  }

  // Metadata
  modalTag.textContent   = img.type
  modalCtr.textContent   = `${currentIndex + 1} / ${total}`
  modalTitle.textContent = currentExhibition.title
  modalVenue.textContent = `${currentExhibition.venue}, ${currentExhibition.city} · ${currentExhibition.year}`
  modalCap.textContent   = img.caption

  // Nav buttons
  modalPrev.disabled = currentIndex === 0
  modalNext.disabled = currentIndex === total - 1

  // Thumbnails
  modalThumbs.innerHTML = currentExhibition.images.map((im, i) => {
    const bg = im.src
      ? `background-image:url(${im.src});background-size:cover;background-position:center`
      : `background:${im.gradient}`
    return `<div class="modal-thumb ${i === currentIndex ? 'active' : ''}" data-index="${i}" style="${bg}" title="${im.caption}"></div>`
  }).join('')

  modalThumbs.querySelectorAll('.modal-thumb').forEach(t => {
    t.addEventListener('click', () => {
      currentIndex = parseInt(t.dataset.index)
      renderModal()
    })
  })
}

function prevImage() { if (currentIndex > 0) { currentIndex--; renderModal() } }
function nextImage() {
  if (currentExhibition && currentIndex < currentExhibition.images.length - 1) {
    currentIndex++; renderModal()
  }
}

modalClose.addEventListener('click', closeModal)
modalPrev.addEventListener('click', prevImage)
modalNext.addEventListener('click', nextImage)

// Close on overlay click
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal() })

// Keyboard
document.addEventListener('keydown', e => {
  if (!currentExhibition) return
  if (e.key === 'Escape')      closeModal()
  if (e.key === 'ArrowLeft')   prevImage()
  if (e.key === 'ArrowRight')  nextImage()
})

// Touch swipe
let touchX = 0
overlay.addEventListener('touchstart', e => { touchX = e.touches[0].clientX }, { passive: true })
overlay.addEventListener('touchend', e => {
  const diff = touchX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 48) diff > 0 ? nextImage() : prevImage()
}, { passive: true })

/* ============================================================
   CONTACT FORM
   ============================================================ */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault()
  const btn = document.getElementById('formSubmit')
  btn.textContent = 'Sent ✓'
  btn.classList.add('sent')
  btn.disabled = true
  setTimeout(() => {
    btn.textContent = 'Send Message'
    btn.classList.remove('sent')
    btn.disabled = false
    e.target.reset()
  }, 3200)
})

/* ============================================================
   INIT
   ============================================================ */
renderGrid(exhibitions)
updateActiveNav()
