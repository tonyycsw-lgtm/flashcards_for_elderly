// data.js - 主數據配置文件
// 這個文件負責加載所有分類的數據

// 全局數據對象
window.cardsData = {};

// 分類列表
const CATEGORIES = [
    { id: 'food', name: '食物', file: 'data_food.js' },
    { id: 'color', name: '顏色', file: 'data_color.js' },
    { id: 'clothing', name: '服裝', file: 'data_clothing.js' },
    { id: 'toy', name: '玩具/遊戲', file: 'data_toy.js' },
    { id: 'transport', name: '交通工具', file: 'data_transport.js' },
    { id: 'vintage', name: '懷舊物品', file: 'data_vintage.js' },
    { id: 'emotion', name: '情緒', file: 'data_emotion.js' }
];

// 加載所有數據
function loadAllData(callback) {
    let loadedCount = 0;
    const totalCount = CATEGORIES.length;
    
    CATEGORIES.forEach(category => {
        loadScript(`data/${category.file}`, function() {
            loadedCount++;
            if (loadedCount === totalCount && callback) {
                callback();
            }
        });
    });
}

// 動態加載腳本
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = function() {
        console.error(`Failed to load ${src}`);
        // 如果加載失敗，使用空數據
        const categoryId = src.split('/').pop().replace('data_', '').replace('.js', '');
        if (!window.cardsData[categoryId]) {
            window.cardsData[categoryId] = [];
        }
        callback();
    };
    document.head.appendChild(script);
}