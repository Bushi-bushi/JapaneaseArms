/**
 * 「武具の魅力」LP インタラクティブ処理 (script.js)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Sticky Header
  // ==========================================================================
  const header = document.querySelector('.site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // 初期ロード時にも判定
  handleScroll();


  // ==========================================================================
  // 2. Hamburger Menu (Mobile Navigation)
  // ==========================================================================
  const hamburgerBtn = document.getElementById('js-hamburger-btn');
  const navMenu = document.getElementById('js-nav-menu');
  const navLinks = navMenu.querySelectorAll('a');

  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // メニューが開いているときはスクロールを防ぐ（オプション）
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    // ページ内遷移リンクの場合のみ閉じる
    if (link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', closeMenu);
    }
  });


  // ==========================================================================
  // 3. Scroll Reveal Animation (Intersection Observer)
  // ==========================================================================
  // 対象の要素に 'fade-element' クラスを付与し、画面内に入ったら 'fade-in' クラスを追加する
  const revealTargets = document.querySelectorAll(
    '.intro-text, .intro-image, .highlight-card, .exhibitor-card, .timeline-item, .venue-info, .venue-map, .ticket-card, .faq-item'
  );

  // 最初は非表示状態にするためのクラスを設定
  revealTargets.forEach(target => {
    target.classList.add('fade-element');
  });

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // 一度表示されたら監視を終了する（必要に応じて）
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // ビューポートを基準にする
    rootMargin: '0px 0px -80px 0px', // 少し手前でアニメーションを開始
    threshold: 0.15 // 15%見えたらトリガー
  });

  revealTargets.forEach(target => {
    revealObserver.observe(target);
  });


  // ==========================================================================
  // 4. FAQ Accordion
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      if (isOpen) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
        question.querySelector('.faq-icon i').className = 'fa-solid fa-plus';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.querySelector('.faq-icon i').className = 'fa-solid fa-minus';
      }
    });
  });

});
