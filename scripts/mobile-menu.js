// mobile-menu.js
document.addEventListener('DOMContentLoaded', function() {
    // メニュートグルボタンと対象メニューの要素を取得
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
      menuToggle.addEventListener('click', function() {
        console.log('メニュートグル実行');
        
        // display スタイルを切り替え
        if (menu.style.display === 'flex') {
          menu.style.display = 'none';
        } else {
          menu.style.display = 'flex';
        }
      });
    }
  });