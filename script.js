// 页面加载后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化打字机效果
    initTypewriter();
    
    // 初始化加载动画
    initLoader();
    
    // 初始化关于对话框
    initAboutDialog();
    
    // 初始化主题切换
    initThemeSelector();
});

// 初始化打字机效果
function initTypewriter() {
    const typingTexts = [
        "欢迎来到我的主页",
        "May you happy every day",
    ];
    
    const options = {
        strings: typingTexts,
        typeSpeed: 100,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 1000,
        loop: true
    };
    
    new Typed('#typewriter-text', options);
}

// 初始化加载动画
function initLoader() {
    const loader = document.querySelector('.loadBox');
    
    // 2秒后隐藏加载动画
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        
        // 完全移除加载动画
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }, 2000);
}

// 初始化关于对话框
function initAboutDialog() {
    const aboutLink = document.getElementById('about-link');
    const dialog = document.getElementById('about-dialog');
    const closeBtn = dialog.querySelector('.close');
    const closeDialogBtn = document.getElementById('close-dialog');
    
    // 打开对话框
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        dialog.style.display = 'block';
    });
    
    // 关闭对话框 - 叉号按钮
    closeBtn.addEventListener('click', function() {
        dialog.style.display = 'none';
    });
    
    // 关闭对话框 - 知道啦按钮
    closeDialogBtn.addEventListener('click', function() {
        dialog.style.display = 'none';
    });
    
    // 点击对话框外部关闭
    dialog.addEventListener('click', function(event) {
        if (event.target === dialog) {
            dialog.style.display = 'none';
        }
    });
}

// 初始化主题切换
function initThemeSelector() {
    const themeOptions = document.querySelectorAll('input[name="theme"]');
    
    // 获取保存的主题或使用默认主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // 设置对应的单选按钮为选中状态
    document.querySelector(`input[value="${savedTheme}"]`).checked = true;
    
    // 监听主题切换
    themeOptions.forEach(option => {
        option.addEventListener('change', function() {
            const theme = this.value;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });
    
    // 如果选择了系统主题，监听系统主题变化
    if (savedTheme === 'system') {
        applySystemTheme();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme);
    }
}

// 应用系统主题
function applySystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
} 