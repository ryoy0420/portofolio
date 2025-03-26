// シンプルなモバイルメニュー切り替え
// mobile-menu.js
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューをクリックしたとき
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
      menuToggle.onclick = function() {
        // activeクラスを切り替え
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
        } else {
          menu.classList.add('active');
        }
      };
    }
  });