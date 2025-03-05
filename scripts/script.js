// scripts/script.js

document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', function() {
      if (window.pageYOffset > 200) {
          scrollToTopBtn.style.display = 'block';
      } else {
          scrollToTopBtn.style.display = 'none';
      }
  });

  scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  function smoothScrollTo(targetId) {
      console.log("smoothScrollTo functionが呼び出されました。targetId:", targetId); // 【追記】
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          console.log("ターゲット要素が見つかりました:", targetElement); // 【追記】
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
          });
      } else {
          console.log("ターゲット要素が見つかりませんでした:", targetId); // 【追記】
      }
  }

  const detailButtons = document.querySelectorAll('.experiment-detail-button');
  console.log("詳細ボタンの数:", detailButtons.length); // 【追記】
  detailButtons.forEach(button => {
      console.log("詳細ボタンにイベントリスナーを追加:", button); // 【追記】
      button.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          console.log("詳細ボタンがクリックされました。targetId:", targetId); // 【追記】
          smoothScrollTo(targetId);
      });
  });
});


// scripts/script.js に追加するか、新しいスクリプトファイルを作成してください

document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニュートグル機能
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
      });
    }
    
    // メニュー以外をクリックしたときにメニューを閉じる
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.menu') && !event.target.closest('.menu-toggle') && menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });
    
    // ウィンドウサイズが変更されたときにメニューをリセット
    window.addEventListener('resize', function() {
      if (window.innerWidth > 767 && menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });
  });