// --- 1. 模擬資料庫 (Mock Data) & 全域變數 ---

// 預設資料 (包含詳細介紹)
const defaultGames = [
    { 
        id: 1, 
        name: "卡坦島 (Catan)", 
        category: "策略", 
        players: "3-4人", 
        image: "images/catan.jpg", 
        description: "玩家扮演拓荒者，在卡坦島上建立聚落、城鎮與道路。透過擲骰與交易資源來發展，爭取成為島上最強大的勢力。這是一款經典的德式桌遊，強調交易與談判技巧。" 
    },
    { 
        id: 2, 
        name: "璀璨寶石 (Splendor)", 
        category: "輕策略", 
        players: "2-4人", 
        image: "images/splendor.jpg", 
        description: "玩家扮演文藝復興時期的富商，透過收集寶石換取發展卡，吸引貴族來訪，獲得聲望，成為最受矚目的珠寶商。規則簡單好上手，但充滿策略深度。" 
    },
    { 
        id: 3, 
        name: "阿瓦隆 (Avalon)", 
        category: "陣營", 
        players: "5-10人", 
        image: "images/avalon.jpg", 
        description: "亞瑟王的忠臣與莫德雷德的爪牙之間的陣營對決。玩家需隱藏身分，透過邏輯推理與話術來完成任務或破壞行動。這是派對與聯誼必備的經典遊戲。" 
    },
    { 
        id: 4, 
        name: "機密代號 (Codenames)", 
        category: "派對", 
        players: "4-8人", 
        image: "images/codenames.jpg", 
        description: "兩隊間諜首領給出單字提示，隊員需猜出己方代號，同時避免猜到敵方代號或觸碰致命的殺手。考驗團隊默契與聯想力的文字遊戲。" 
    },
    { 
        id: 5, 
        name: "龍焰魔法鎮 (Flamecraft)", 
        category: "策略", 
        players: "1-5人", 
        image: "images/flamecraft.jpg", 
        description: "玩家扮演火焰龍守護者，在魔法鎮中協助工匠，收集資源與施展魔法，與可愛的龍寶寶們一起建設城鎮。美術風格極度可愛，療癒系策略遊戲。" 
    },
    { 
        id: 6, 
        name: "碰! (Bang!)", 
        category: "陣營", 
        players: "4-7人", 
        image: "images/bang.jpg", 
        description: "西部牛仔主題的陣營遊戲，警長、歹徒與叛徒之間的槍戰對決。利用手牌進行攻擊與防禦，判斷誰是敵是友，只有最後存活的人才能獲勝。" 
    },
    { 
        id: 7, 
        name: "妙語說書人 (Dixit)", 
        category: "派對", 
        players: "3-6人", 
        image: "images/dixit.jpg", 
        description: "用圖片說故事，考驗默契與想像力。敘述者需給出既不能太直白也不能太隱晦的提示，讓其他玩家猜測哪張是你的牌。卡牌畫風唯美，充滿藝術感。" 
    },
    {
        id: 8,
        name: "瘋狂實驗室 (Dr. Eureka)",
        category: "輕策略",
        players: "2-4人",
        image: "images/dr_eureka.jpg",
        description: "玩家扮演瘋狂科學家，透過移動試管中的彩色球體來完成實驗任務。這是一款考驗手眼協調與快速反應的遊戲，適合全家大小一起玩。"
    },
    {
        id: 9,
        name: "文明繪卷 (Tapestry)",
        category: "策略",
        players: "1-5人",
        image: "images/tapestry.jpg",
        description: "文明發展主題的策略遊戲，玩家從史前時代一路發展到未來科技。透過探索、科技、文化與軍事等多種路徑來建立獨特的文明，爭取最高分數。"
    },
    {
        id: 10,
        name: "狼人殺 (Werewolf)",
        category: "陣營",
        players: "7-6~18人 + 1名主持者",
        image: "images/werewolf.jpg",
        description: "經典的社交推理遊戲，村民與狼人之間的心理戰。玩家需透過討論與投票找出潛伏的狼人，同時狼人則試圖混淆視聽，消滅村民。適合大型聚會與派對。"
    },
    {
        id: 11,
        name: "骷髏與玫瑰(Skull & Roses)",
        category: "派對",
        players: "3-6人",
        image: "images/skull_roses.jpg",
        description: "一款心理戰與猜測的派對遊戲，玩家輪流放置骷髏或玫瑰卡片，並嘗試猜測對手的卡片組合。適合喜歡刺激與策略的玩家。"
    }
];

const defaultUsers = [
    { id: 1, username: "user", name: "王小明", role: "member", password: "user" },
    { id: 99, username: "admin", name: "店長大大", role: "admin", password: "admin" }
];

// 真正的全域變數
let games = [];
let users = [];
let reservations = [];

// 全域狀態
let currentUser = null; 
let currentPage = 'home';
let categoryFilter = '全部';
let currentCaptcha = ''; 

// --- 讀寫函數 (加強版) ---
function loadAllData() {
    // 載入桌遊
    const storedGames = localStorage.getItem('games');
    games = storedGames ? JSON.parse(storedGames) : [...defaultGames]; 
    if (!storedGames) saveGames(); 

    // 載入使用者
    const storedUsers = localStorage.getItem('users');
    users = storedUsers ? JSON.parse(storedUsers) : [...defaultUsers];
    if (!storedUsers) saveUsers();

    // 載入預約
    const storedRes = localStorage.getItem('reservations');
    reservations = storedRes ? JSON.parse(storedRes) : [];
    
    // 載入當前登入者
    const storedCurr = localStorage.getItem('currentUser');
    if (storedCurr) {
        const parsedUser = JSON.parse(storedCurr);
        // 檢查該使用者是否還在使用者名單中
        const validUser = users.find(u => u.id === parsedUser.id);
        currentUser = validUser || null;
    }
}

function saveGames() { localStorage.setItem('games', JSON.stringify(games)); }
function saveUsers() { localStorage.setItem('users', JSON.stringify(users)); }
function saveReservations() { localStorage.setItem('reservations', JSON.stringify(reservations)); }
function saveCurrentUser() { 
    if(currentUser) localStorage.setItem('currentUser', JSON.stringify(currentUser)); 
    else localStorage.removeItem('currentUser');
}

// --- 核心功能函數 ---

function init() {
    loadAllData(); // 確保資料載入
    
    // 清除舊聊天記錄 (可選)
    try { localStorage.removeItem('chatMessages'); } catch(e) {}
    chatMessages = [];
    addMessage('bot', '哈囉！我是小圈機器人，歡迎來到圈圈桌遊店。');
    addMessage('bot', '提示：你可以輸入「你好」、「營業時間」、「價格」、「預約」、「桌遊」得到快速回覆。');
    
    renderNavbar();
    renderPage('home');
    lucide.createIcons();
    
    // 延遲初始化輪播
    setTimeout(() => {
        try { initCarousel(); } catch(e) { console.error(e); }
    }, 100);
}

// 登入
function login(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    
    // 強制重讀最新使用者資料
    loadAllData();

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        saveCurrentUser();
        alert(`歡迎回來，${user.name}！身分：${user.role === 'admin' ? '管理員' : '會員'}`);
        renderNavbar();
        renderPage('home');
    } else {
        alert("帳號或密碼錯誤 (測試帳號: admin/admin 或 user/user)");
    }
}

// 註冊
function register(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const username = form.username.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const captchaInput = form.captcha.value;
    
    // --- 驗證碼檢查 ---
    if (captchaInput !== currentCaptcha) {
        alert("驗證碼錯誤，請重新輸入！");
        form.captcha.value = ''; // 清空錯誤的輸入
        refreshCaptcha();        // 錯誤時自動刷新驗證碼
        form.captcha.focus();    // 讓游標回到輸入框
        return;
    }

    // 驗證密碼一致性
    if (password !== confirmPassword) {
        alert("密碼和確認密碼不一致");
        return;
    }
    
    // 檢查帳號是否已存在
    if (users.find(u => u.username === username)) {
        alert("此帳號已被使用，請選擇其他帳號");
        return;
    }
    
    // 建立新使用者
    const newUser = {
        id: Date.now(),
        username,
        name,
        role: "member",
        password
    };
    
    users.push(newUser);
    saveUsers();
    
    alert(`註冊成功！歡迎 ${name}！`);
    currentUser = newUser;
    saveCurrentUser();
    renderNavbar();
    renderPage('home');
}

// 刷新驗證碼
function refreshCaptcha() {
    // 產生新的 4 位亂數
    currentCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
    // 更新畫面上顯示的數字
    const display = document.getElementById('captchaDisplay');
    if (display) {
        display.textContent = currentCaptcha;
        // 加入一點閃爍動畫提示已更新
        display.classList.add('bg-gray-300');
        setTimeout(() => display.classList.remove('bg-gray-300'), 200);
    }
}

// 登出
function logout() {
    currentUser = null;
    saveCurrentUser();
    renderNavbar();
    renderPage('home');
}


// 導航跳轉
function navigateTo(page) {
    // 權限檢查：訪客想點預約
    if (!currentUser && page === 'reservation') {
        alert("請先登入會員才能進行線上預約！");
        renderPage('login');
        return;
    }
    renderPage(page);
    // 關閉手機選單
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu) mobileMenu.classList.add('hidden');
}

// 手機選單切換
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// --- 4. 頁面渲染邏輯 (View Rendering) ---

// 渲染導覽列
function renderNavbar() {
    const desktopMenu = document.getElementById('desktop-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const role = currentUser?.role || 'guest';
    
    let menuItems = '';
    
    // 共同項目
    menuItems += `<button onclick="navigateTo('home')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">首頁</button>`;

    // 根據身分
    if (role === 'admin') {
        menuItems += `
            <button onclick="navigateTo('admin-games')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">桌遊管理</button>
            <button onclick="navigateTo('admin-users')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">會員管理</button>
            <button onclick="navigateTo('admin-reservations')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">預約管理</button>
        `;
    } else {
        menuItems += `
            <button onclick="navigateTo('games')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">桌遊清單 🎲</button>
            <button onclick="navigateTo('reservation')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">線上預約 📆</button>
        `;
    }

    // 桌面版右側 (登入狀態)
    let rightSide = '';
    if (currentUser) {
        rightSide = `
            <div class="border-l pl-4 ml-4 flex items-center space-x-3">
                <div class="flex flex-col items-end">
                    <span class="text-sm font-bold text-white">${currentUser.name}</span>
                    <span class="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">${role === 'admin' ? '管理員' : '會員'}</span>
                </div>
                <button onclick="logout()" class="text-gray-300 hover:text-red-400 p-2" title="登出">
                    <i data-lucide="log-out" class="w-5 h-5"></i>
                </button>
            </div>
        `;
    } else {
        rightSide = `
            <div class="border-l pl-4 ml-4 flex items-center space-x-3">
                <span class="text-sm text-gray-300">訪客</span>
                <button onclick="navigateTo('login')" class="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition text-sm">
                    <i data-lucide="log-in" class="w-4 h-4 mr-1"></i> 登入
                </button>
            </div>
        `;
    }

    if (desktopMenu) desktopMenu.innerHTML = menuItems + rightSide;
    
    // 手機版選單簡單處理
    if (mobileMenu) {
        mobileMenu.innerHTML = menuItems + (currentUser ? 
            `<div class="border-t pt-2 mt-2"><button onclick="logout()" class="w-full text-left px-3 py-2 text-red-600">登出 (${currentUser.name})</button></div>` : 
            `<div class="border-t pt-2 mt-2"><button onclick="navigateTo('login')" class="w-full text-left px-3 py-2 text-indigo-600">登入</button></div>`
        );
    }
    
    lucide.createIcons();
}

// 渲染主頁面
function renderPage(page) {
    currentPage = page;
    const root = document.getElementById('app-root');
    root.innerHTML = ''; // 清空內容

    switch(page) {
        case 'home':
            root.innerHTML = `
                <div class="space-y-12 pb-12">
                    <div class="relative bg-transparent text-white py-20 px-4 overflow-hidden">
                        <div class="absolute inset-0 opacity-20">
                            <div class="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full filter blur-xl opacity-70"></div>
                            <div class="absolute top-0 right-0 w-32 h-32 bg-purple-400 rounded-full filter blur-xl opacity-70"></div>
                        </div>
                        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-8">
                            <div class="w-full md:w-1/2 z-10 flex flex-col justify-center items-center text-center px-4 md:px-0">
                                <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight">圈圈桌遊店</h1>
                                <p class="text-2xl md:text-3xl text-gray-200 mb-8 leading-relaxed">相聚，<br class="md:hidden">從一場好遊戲開始。</p>
                                <button onclick="navigateTo('games')" class="bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-bold text-xl hover:bg-yellow-300 transition shadow-lg transform hover:scale-105 duration-200">
                                    查看桌遊目錄
                                </button>
                            </div>
                            <div class="w-full md:w-1/2 z-0 px-4 md:px-0 mt-8 md:mt-0">
                                <div class="carousel-wrap" style="height:360px; border-radius:12px;">
                                    <div class="carousel-stage"></div>
                                    <div class="carousel-controls">
                                        <button class="prev" onclick="carouselPrev()"><i data-lucide="chevron-left" class="w-6 h-6"></i></button>
                                        <button class="next" onclick="carouselNext()"><i data-lucide="chevron-right" class="w-6 h-6"></i></button>
                                        <div class="carousel-dots" id="carouselDots"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                        
                        <div class="group bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-500/40 border-b-0 hover:border-b-4 border-indigo-500 relative overflow-hidden flex flex-col items-center text-center">
                            <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-100 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-150 duration-500"></div>
                            <div class="relative inline-block p-4 bg-indigo-100 text-indigo-600 rounded-full mb-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
                                <i data-lucide="gamepad-2" class="w-10 h-10"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">海量桌遊</h3>
                            <p class="text-lg text-gray-600">超過 500 款桌遊任你挑選。</p>
                        </div>

                        <div class="group bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-green-500/40 border-b-0 hover:border-b-4 border-green-500 relative overflow-hidden flex flex-col items-center text-center">
                            <div class="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-150 duration-500"></div>
                            <div class="relative inline-block p-4 bg-green-100 text-green-600 rounded-full mb-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white">
                                <i data-lucide="users" class="w-10 h-10"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">舒適空間</h3>
                            <p class="text-lg text-gray-600">寬敞桌椅與明亮照明。</p>
                        </div>

                        <div class="group bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-500/40 border-b-0 hover:border-b-4 border-orange-500 relative overflow-hidden flex flex-col items-center text-center">
                            <div class="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-150 duration-500"></div>
                            <div class="relative inline-block p-4 bg-orange-100 text-orange-600 rounded-full mb-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white">
                                <i data-lucide="calendar" class="w-10 h-10"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-2 group-hover:text-orange-600 transition-colors">線上預約</h3>
                            <p class="text-lg text-gray-600">會員專屬預約系統。</p>
                        </div>

                    </div>
                    
                    <div class="bg-gray-100 py-8 px-4 text-center shadow-md">
                        <p class="text-xl text-gray-700 font-semibold mb-2">📍 店址：台灣科技大學</p>
                        <p class="text-lg text-black"><i data-lucide="dollar-sign" class="w-5 h-5 inline mr-1"></i>費用：每小時 $70</p>
                    </div>
                </div>
            `;
            break;

        case 'games':
            const categories = getCategories();
            const catNav = `
                <div class="flex flex-wrap gap-2 mb-6">
                    ${categories.map(c => `
                        <button onclick="setCategoryFilter('${c}')"
                            class="px-3 py-1 rounded-full text-sm ${categoryFilter === c ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}">
                            ${c}
                        </button>
                    `).join('')}
                </div>
            `;
            const filteredGames = categoryFilter === '全部'
                ? games
                : games.filter(g => g.category === categoryFilter);
            
            // 加入 onclick 觸發 openGameModal
            const gamesList = filteredGames.map(game => `
                <div onclick="openGameModal(${game.id})" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col cursor-pointer transform hover:-translate-y-1">
                    <div class="h-48 bg-gray-200 relative">
                        <img src="${game.image}" alt="${game.name}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/400x300?text=Game'">
                        <span class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">${game.category}</span>
                    </div>
                    <div class="p-4 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="font-bold text-lg mb-1">${game.name}</h3>
                            <p class="text-gray-500 text-sm mb-2 flex items-center"><i data-lucide="users" class="w-3 h-3 mr-1"></i> ${game.players}</p>
                        </div>
                        <div class="flex justify-end items-center mt-4 pt-4 border-t">
                            <span class="text-xs text-gray-400">點擊查看詳情</span>
                        </div>
                    </div>
                </div>
            `).join('');
            
            root.innerHTML = `
                <div class="max-w-7xl mx-auto px-4 py-8">
                    <h2 class="text-3xl font-bold mb-4 text-white-800 border-l-8 border-indigo-600 pl-4">桌遊清單</h2>
                    ${catNav}
                    ${filteredGames.length
                        ? `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">${gamesList}</div>`
                        : `<div class="text-center text-gray-500 py-20">無「${categoryFilter}」類別的桌遊。</div>`
                    }
                </div>
            `;
            break;

        case 'login':
            root.innerHTML = `
                <div class="min-h-[80vh] flex items-center justify-center px-4">
                    <div class="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">會員登入</h2>
                        <p class="text-center text-gray-500 text-sm mb-6">歡迎回到圈圈桌遊店</p>
                        <form onsubmit="login(event)" class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">帳號</label>
                                <input type="text" name="username" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">密碼</label>
                                <input type="password" name="password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                            </div>
                            <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">登入</button>
                        </form>
                        <div class="mt-6 text-center border-t pt-6">
                            <p class="text-gray-600 text-sm mb-3">還沒有帳號？</p>
                            <button onclick="navigateTo('register')" class="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">註冊會員</button>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'register':
            currentCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
            root.innerHTML = `
                <div class="min-h-[80vh] flex items-center justify-center px-4">
                    <div class="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">會員註冊</h2>
                        <p class="text-center text-gray-500 text-sm mb-6">加入圈圈桌遊店會員</p>
                        <form onsubmit="register(event)" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">真名</label>
                                <input type="text" name="name" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">帳號</label>
                                <input type="text" name="username" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="至少 3 個字符" required minlength="3">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">密碼</label>
                                <input type="password" name="password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="至少 3 個字符" required minlength="3">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">確認密碼</label>
                                <input type="password" name="confirmPassword" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">驗證碼</label>
                                <div class="flex gap-2 items-stretch h-11">
                                    <input type="text" name="captcha" class="flex-1 min-w-0 px-4 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="輸入數字" required maxlength="4">
                                    <div id="captchaDisplay" class="w-20 bg-gray-200 text-gray-700 rounded-lg font-mono text-xl font-bold tracking-widest flex items-center justify-center select-none border border-gray-300 transition-colors duration-200">
                                        ${currentCaptcha}
                                    </div>
                                    <button type="button" onclick="refreshCaptcha()" class="px-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-indigo-600 transition border border-gray-300" title="更換驗證碼">
                                        <i data-lucide="refresh-cw" class="w-5 h-5"></i>
                                    </button>
                                </div>
                            </div>
                            <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition mt-6">完成註冊</button>
                        </form>
                        <div class="mt-6 text-center border-t pt-6">
                            <p class="text-gray-600 text-sm">已有帳號？</p>
                            <button onclick="navigateTo('login')" class="text-indigo-600 hover:text-indigo-700 font-bold mt-2">返回登入</button>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'reservation':
            const _today = new Date();
            function _fmt(d) {
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                return `${y}-${m}-${dd}`;
            }
            const _minDate = _fmt(_today);
            const _maxDate = _fmt(new Date(_today.getTime() + 30 * 24 * 60 * 60 * 1000));

            root.innerHTML = `
                <div class="max-w-3xl mx-auto px-4 py-10">
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div class="bg-indigo-600 p-6 text-white">
                            <h2 class="text-2xl font-bold">線上預約</h2>
                            <p class="opacity-80">預約您的歡樂時光</p>
                        </div>
                        <div class="p-8">
                            <form onsubmit="submitReservation(event)" class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label class="block text-sm font-medium text-gray-700 mb-1">日期</label><input type="date" name="date" required class="w-full px-4 py-2 border rounded-lg" min="${_minDate}" max="${_maxDate}"></div>
                                    <div><label class="block text-sm font-medium text-gray-700 mb-1">時間</label><input type="time" name="time" required class="w-full px-4 py-2 border rounded-lg"></div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">預約人數</label>
                                    <input type="number" name="party_size" class="w-full px-4 py-2 border rounded-lg" min="1" max="20" value="2" required>
                                    <p class="text-xs text-gray-500 mt-1">請輸入參與人數 (1 ~ 20 人)</p>
                                </div>
                                <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700">送出預約</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'admin-games':
            const adminGamesList = games.map(game => `
                <tr>
                    <td class="px-6 py-4 font-medium">${game.name}</td>
                    <td class="px-6 py-4 text-gray-500">${game.category}</td>
                    <td class="px-6 py-4 text-right"><button onclick="deleteGame(${game.id})" class="text-red-600 hover:text-red-900 font-bold">刪除</button></td>
                </tr>
            `).join('');
            
            const allCategories = ['全部', ...new Set(games.map(g => g.category))];
            const categoryOptions = allCategories.filter(c => c !== '全部').map(cat => `<option value="${cat}">${cat}</option>`).join('');
            
            // 修改重點：加入 遊戲介紹 的輸入框
            root.innerHTML = `
                <div class="max-w-6xl mx-auto px-4 py-8">
                    <h2 class="text-2xl font-bold text-white mb-6">後台：桌遊管理</h2>
                    <div class="bg-gray-100 p-6 rounded-lg mb-8 border space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label class="text-xs text-gray-500">名稱</label><input id="newGameName" class="p-2 border rounded w-full"></div>
                            <div><label class="text-xs text-gray-500">類別</label><select id="newGameCat" class="p-2 border rounded w-full" required><option value="">請選擇</option>${categoryOptions}</select></div>
                            <div class="md:col-span-2"><label class="text-xs text-gray-500">遊戲介紹</label><textarea id="newGameDesc" class="p-2 border rounded w-full h-20" placeholder="請輸入簡單的遊戲介紹..."></textarea></div>
                            <div><label class="text-xs text-gray-500">遊戲圖片 *</label><input id="newGameImage" type="file" accept="image/*" class="p-2 border rounded w-full" required></div>
                        </div>
                        <div id="imagePreview" class="w-32 h-40 bg-gray-200 rounded border-2 border-dashed flex items-center justify-center text-gray-400 text-sm">
                            預覽區域
                        </div>
                        <button onclick="addGame()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">新增</button>
                    </div>
                    <div class="bg-white shadow overflow-hidden rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500">名稱</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500">類別</th><th class="px-6 py-3 text-right">操作</th></tr></thead>
                            <tbody class="bg-white divide-y divide-gray-200">${adminGamesList}</tbody>
                        </table>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                const imageInput = document.getElementById('newGameImage');
                if(imageInput) {
                    imageInput.addEventListener('change', function(e) {
                        const preview = document.getElementById('imagePreview');
                        if(e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = function(event) {
                                preview.innerHTML = `<img src="${event.target.result}" class="w-full h-full object-cover rounded">`;
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    });
                }
            }, 100);
            break;
        
        case 'admin-users':
            const userList = users.map(u => `
                <div class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                    <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4 font-bold">${u.name[0]}</div>
                        <div><div class="font-bold">${u.name}</div><div class="text-sm text-gray-500">@${u.username}</div></div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="px-3 py-1 rounded-full text-xs ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}">${u.role === 'admin' ? '管理員' : '會員'}</span>
                        ${u.role !== 'admin' ? `<button onclick="kickMember(${u.id})" class="text-red-600 hover:text-red-800 font-bold text-sm px-3 py-1 rounded hover:bg-red-50">踢除</button>` : ''}
                    </div>
                </div>
            `).join('');
            root.innerHTML = `<div class="max-w-4xl mx-auto px-4 py-8"><h2 class="text-2xl font-bold mb-6">會員名單</h2><div class="grid gap-4">${userList}</div></div>`;
            break;

        case 'admin-reservations':
            const resList = reservations.map(r => `
                <tr>
                    <td class="px-6 py-4 font-medium">${r.userName}</td>
                    <td class="px-6 py-4">${r.date} ${r.time}</td>
                    <td class="px-6 py-4">${r.party_size ? (r.party_size + ' 人') : (r.game || '')}</td>
                    <td class="px-6 py-4 text-right"><button onclick="deleteReservation(${r.id})" class="text-red-600 font-bold">取消</button></td>
                </tr>
            `).join('');
                root.innerHTML = `
                <div class="max-w-6xl mx-auto px-4 py-8">
                    <h2 class="text-2xl font-bold mb-6">預約管理</h2>
                    <div class="bg-white shadow overflow-hidden rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500">會員</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500">時間</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500">預約人數</th><th class="px-6 py-3 text-right">操作</th></tr></thead>
                            <tbody class="bg-white divide-y divide-gray-200">${reservations.length ? resList : '<tr><td colspan="4" class="px-6 py-4 text-center text-gray-500">無預約</td></tr>'}</tbody>
                        </table>
                    </div>
                </div>
            `;
            break;
    }
    lucide.createIcons();
    if (page === 'home') {
        setTimeout(() => {
            try {
                initCarousel();
            } catch(e) {
                console.error('Carousel reinit error:', e);
            }
        }, 100);
    }
}

// --- 5. 資料操作邏輯 ---

function submitReservation(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRes = {
        id: Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        status: "待確認",
        date: formData.get('date'),
        time: formData.get('time'),
        party_size: formData.get('party_size') ? parseInt(formData.get('party_size'), 10) : null,
        game: formData.get('game') || '不指定'
    };
    reservations.push(newRes);
    saveReservations(); 
    alert("預約申請已送出！");
    navigateTo('home');
}

function addGame() {
    const name = document.getElementById('newGameName').value;
    const category = document.getElementById('newGameCat').value;
    const desc = document.getElementById('newGameDesc').value; // 獲取介紹
    const imageInput = document.getElementById('newGameImage');
    
    if(!name) return alert("請輸入名稱");
    if(!imageInput.files || !imageInput.files[0]) return alert("請上傳遊戲圖片");
    
    const file = imageInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        games.push({
            id: Date.now(),
            name, 
            category,
            players: "2-4人",
            description: desc || "暫無介紹", // 儲存介紹
            image: imageData 
        });
        saveGames();
        alert("新增成功！");
        document.getElementById('newGameName').value = '';
        document.getElementById('newGameCat').value = '';
        document.getElementById('newGameDesc').value = '';
        document.getElementById('newGameImage').value = '';
        document.getElementById('imagePreview').innerHTML = '預覽區域';
        renderPage('admin-games');
    };
    
    reader.onerror = function() {
        alert("讀取圖片失敗，請重試");
    };
    
    reader.readAsDataURL(file);
}

function deleteGame(id) {
    if(confirm("確定刪除？")) {
        games = games.filter(g => g.id !== id);
        saveGames(); 
        renderPage('admin-games');
    }
}

function deleteReservation(id) {
    if(confirm("確定取消？")) {
        reservations = reservations.filter(r => r.id !== id);
        saveReservations(); 
        renderPage('admin-reservations');
    }
}

function kickMember(id) {
    const member = users.find(u => u.id === id);
    if(!member) return;
    
    if(confirm(`確定要踢除會員 ${member.name} 嗎？`)) {
        users = users.filter(u => u.id !== id);
        saveUsers();
        if (currentUser && currentUser.id === id) {
            currentUser = null;
            saveCurrentUser();
            logout();
        } else {
            renderPage('admin-users');
        }
    }
}

function getCategories() {
    return ['全部', ...new Set(games.map(g => g.category))];
}

function setCategoryFilter(cat) {
    categoryFilter = cat;
    renderPage('games');
}

// ------------------ 聊天機器人功能 ------------------
let chatMessages = [];

function loadChatMessages() {
    try {
        const raw = localStorage.getItem('chatMessages');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) chatMessages = parsed;
        }
    } catch (e) { console.warn('載入聊天訊息失敗', e); }
}

function saveChatMessages() {
    try {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    } catch (e) { console.warn('儲存聊天訊息失敗', e); }
}

function renderChatMessages() {
    const body = document.getElementById('chatBody');
    if (!body) return;
    body.innerHTML = '';
    chatMessages.forEach(m => {
        const el = document.createElement('div');
        el.className = 'chat-msg ' + (m.from === 'user' ? 'user' : 'bot');
        el.textContent = m.text;
        body.appendChild(el);
    });
    body.scrollTop = body.scrollHeight;
}

function addMessage(from, text) {
    const msg = { id: Date.now() + Math.random(), from, text, time: new Date().toISOString() };
    chatMessages.push(msg);
    saveChatMessages();
    renderChatMessages();
}

function toggleChat() {
    const panel = document.getElementById('chatbotPanel');
    if (!panel) return;
    panel.classList.toggle('open');
    
    const opened = panel.classList.contains('open');
    panel.setAttribute('aria-hidden', (!opened).toString());
    
    if (opened) {
        const input = document.getElementById('chatInput');
        if (input) input.focus();
    }
    setTimeout(() => { try { lucide.createIcons(); } catch(e) {} }, 0);
}

function sendChatFromInput() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendUserMessage(text);
}

function sendUserMessage(text) {
    addMessage('user', text);
    setTimeout(() => botRespond(text), 700);
}

function botRespond(userText) {
    const t = String(userText).toLowerCase();
    let reply = '';
    if (/你好|hi|哈囉|嗨/.test(t)) reply = '哈囉！我是小圈機器人，有什麼我可以幫忙的嗎？';
    else if (/營業|時間|營業時間/.test(t)) reply = '營業時間：12:00 - 22:00，歡迎來電或線上預約。';
    else if (/價格|費用|多少/.test(t)) reply = '費用：每小時 $70。';
    else if (/預約|預定/.test(t)) reply = '你可以點選「線上預約」頁面，選擇日期與人數完成預約。';
    else if (/遊戲|桌遊/.test(t)) reply = '我們提供策略、派對、陣營等不同類型桌遊，可至「桌遊清單」查看。';
    else reply = '抱歉，我還在學習中。若需要真人客服請使用聯絡方式。';
    addMessage('bot', reply);
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatInput');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatFromInput();
            }
        });
    }
});

// ------------------ 3D 輪播功能 ------------------
let carouselIndex = 0;
let carouselTimer = null;
let carouselItemsData = []; 

function initCarousel() {
    const stage = document.querySelector('.carousel-stage');
    if (!stage) return;

    // --- 修改重點：拿掉 .slice(0, 7)，改為顯示全部 ---
    // [...games]：複製一份陣列
    // .reverse()：反轉，讓最新的遊戲排在最前面
    carouselItemsData = [...games].reverse(); 
    // ---------------------------------------------

    if (carouselItemsData.length === 0) {
        stage.innerHTML = '<div style="color:#fff;">暫無圖片</div>';
        return;
    }

    stage.innerHTML = carouselItemsData.map((g, i) => `
        <div class="carousel-item" onclick="clickSlide(${i})" style="background-image: url('${g.image.replace(/'/g, "\\'")}')">
            <div class="carousel-neon">${g.name}</div>
        </div>
    `).join('');

    // 初始化位置
    carouselIndex = Math.floor(carouselItemsData.length / 2); 
    update3DCarousel();
    startCarousel();
    
    const wrap = document.querySelector('.carousel-wrap');
    if(wrap) {
        wrap.addEventListener('mouseenter', stopCarousel);
        wrap.addEventListener('mouseleave', startCarousel);
    }
}

function update3DCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const total = carouselItemsData.length || document.querySelectorAll('.carousel-item').length;
    const halfTotal = Math.floor(total / 2);

    items.forEach((item, i) => {
        let diff = i - carouselIndex;
        while (diff > halfTotal) diff -= total;
        while (diff < -halfTotal) diff += total;
        
        const offset = diff;

        if (offset === 0) {
            item.style.transform = `translateX(0) scale(1) translateZ(200px) rotateY(0deg)`;
            item.style.zIndex = 100;
            item.style.opacity = 1;
            item.style.filter = 'brightness(1.2)';
            item.classList.add('active');
        } else {
            const limitOffset = Math.abs(offset); 
            const direction = offset > 0 ? 1 : -1;
            const xBase = 55;   
            const zBase = -100; 
            const rotateBase = -25; 
            const isFar = limitOffset > 3; 

            const tx = offset * xBase; 
            const tz = limitOffset * zBase; 
            const ry = direction * rotateBase; 

            item.style.transform = `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${1 - limitOffset * 0.15})`;
            item.style.zIndex = 100 - limitOffset; 
            item.style.opacity = isFar ? 0 : (0.6 - limitOffset * 0.1); 
            item.style.filter = 'brightness(0.5)';
            item.classList.remove('active');
        }
    });
    
    const dots = document.querySelectorAll('.carousel-dots button');
    if(dots.length) {
        dots.forEach(d => d.classList.remove('active'));
        if(dots[carouselIndex]) dots[carouselIndex].classList.add('active');
    }
}

function clickSlide(index) {
    if (index !== carouselIndex) {
        stopCarousel();
        carouselIndex = index;
        update3DCarousel();
    }
}

function nextSlide() {
    carouselIndex = (carouselIndex + 1) % carouselItemsData.length;
    update3DCarousel();
}

function prevSlide() {
    carouselIndex = (carouselIndex - 1 + carouselItemsData.length) % carouselItemsData.length;
    update3DCarousel();
}

function carouselNext() {
    stopCarousel();
    nextSlide();
}

function carouselPrev() {
    stopCarousel();
    prevSlide();
}

function startCarousel() {
    stopCarousel();
    carouselTimer = setInterval(nextSlide, 3000); 
}

function stopCarousel() {
    if (carouselTimer) {
        clearInterval(carouselTimer);
        carouselTimer = null;
    }
}

// --- 新增：遊戲詳情 Modal 邏輯 ---
function openGameModal(id) {
    const game = games.find(g => g.id === id);
    if(!game) return;
    
    const modal = document.getElementById('gameModalOverlay');
    const body = document.getElementById('gameModalBody');
    
    // 填入內容 (移除按鈕)
    body.innerHTML = `
        <div class="relative">
            <img src="${game.image}" class="w-full h-64 object-cover rounded-t-lg" onerror="this.src='https://via.placeholder.com/600x400?text=Game'">
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h3 class="text-3xl font-bold">${game.name}</h3>
                <span class="text-sm bg-indigo-600 px-2 py-1 rounded ml-2">${game.category}</span>
            </div>
        </div>
        <div class="p-6">
            <div class="flex items-center text-gray-500 mb-4">
                <i data-lucide="users" class="w-5 h-5 mr-2"></i>
                <span class="font-medium">建議人數：${game.players}</span>
            </div>
            <div class="prose max-w-none text-gray-700 leading-relaxed">
                <h4 class="font-bold text-lg mb-2 text-indigo-900">遊戲介紹</h4>
                <p>${game.description || "暫無詳細介紹。"}</p>
            </div>
        </div>
    `;
    
    modal.classList.add('open');
    lucide.createIcons();
}

function closeGameModal(e) {
    // 如果是點擊背景遮罩(overlay)或是明確呼叫，則關閉
    if (!e || e.target.id === 'gameModalOverlay' || !e.target) {
        document.getElementById('gameModalOverlay').classList.remove('open');
    }
}

// 啟動
init();