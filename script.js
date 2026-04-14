/* ============================================================
   ARTIST WEBSITE — script.js
   작품 데이터는 artwork-manager에서 관리합니다.
   두 파일을 같은 브라우저에서 열면 자동으로 연동됩니다.
   ============================================================ */

/* ===== ARTWORK MANAGER 연동 =====
   artwork-manager/index.html 에서 작품을 추가하면
   이 웹사이트의 Exhibition 섹션에 자동으로 반영됩니다.
   ================================= */

function loadExhibitions() {
  try {
    const raw = JSON.parse(localStorage.getItem('shin_youngho_artworks')) || []
    if (raw.length === 0) return []

    return raw.map((art, i) => {
      // 작품마다 고유한 톤의 플레이스홀더 그라데이션 생성
      const hue = (i * 53 + 200) % 360
      const grad = `linear-gradient(140deg, hsl(${hue},14%,76%) 0%, hsl(${hue},14%,50%) 100%)`

      // 모달 캡션: "제목, 재료, 크기, 연도" 형식
      const captionParts = [art.medium, art.size, art.year].filter(Boolean)
      const caption = captionParts.length ? `${art.title}, ${captionParts.join(', ')}` : art.title

      return {
        id: art.id,
        title: art.title,
        // venue/city → 재료/크기로 활용 (모달 서브라인에 표시)
        venue: art.medium || '',
        city: art.size   || '',
        year: art.year   || '',
        series: art.series || '',
        // series 있으면 'solo', 없으면 'group' — 필터 버튼과 연동
        type: art.series ? 'solo' : 'group',
        gradient: grad,
        images: [{
          type: '작품',
          src: art.imageData || null,
          gradient: grad,
          caption: art.caption || caption,
        }],
      }
    })
  } catch (e) {
    return []
  }
}

const exhibitions = loadExhibitions()

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
