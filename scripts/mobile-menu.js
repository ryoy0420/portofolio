// モバイルメニューの開閉機能 - 修正版
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    // デバッグ用コンソール出力
    console.log('Menu toggle element:', menuToggle);
    console.log('Menu element:', menu);
    
    if (menuToggle && menu) {
      menuToggle.addEventListener('click', function(event) {
        // クリックイベントのバブリングを防止
        event.preventDefault();
        event.stopPropagation();
        
        // クラスの切り替え
        menu.classList.toggle('active');
        
        // デバッグ用コンソール出力
        console.log('Menu toggled, active state:', menu.classList.contains('active'));
      });
      
      // メニューの外側をクリックした時にメニューを閉じる
      document.addEventListener('click', function(event) {
        if (menu.classList.contains('active') && 
            !menu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
          menu.classList.remove('active');
        }
      });
    } else {
      console.error('Menu toggle or menu elements not found');
    }
  });