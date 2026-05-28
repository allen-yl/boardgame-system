// --- 1. 模擬資料庫 (Mock Data) & 全域變數 ---

// 預設資料
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
    },
    {
        id: 12,
        name: "馬尼拉(Manila)",
        category: "輕策略",
        players: "3-5人",
        image: "images/manila.jpg",
        description: "一款以18世紀菲律賓為背景的交易與冒險遊戲，玩家扮演商人，透過競標、航行與交易來賺取財富。規則簡單但充滿策略性，適合家庭與朋友聚會。"
    }
];

// 加入經驗值、稱號與偏好設定的會員資料
const defaultUsers = [
    { id: 1, username: "user", name: "王小明", role: "member", password: "user", xp: 3450, level: 8, title: "白銀策略家", preferences: ["策略", "輕策略"] },
    { id: 99, username: "admin", name: "店長大大", role: "admin", password: "admin", xp: 99999, level: 99, title: "桌遊之神", preferences: [] }
];

// 庫存損耗系統假資料
const defaultInventory = [
    { id: 'INV-001', gameName: "卡坦島 (Catan)", boxNo: "01", health: 100, status: "良好", missingParts: "無" },
    { id: 'INV-002', gameName: "卡坦島 (Catan)", boxNo: "02", health: 65, status: "缺件警告", missingParts: "少一個紅色木頭村莊" },
    { id: 'INV-003', gameName: "阿瓦隆 (Avalon)", boxNo: "01", health: 85, status: "輕微磨損", missingParts: "無" },
    { id: 'INV-004', gameName: "璀璨寶石 (Splendor)", boxNo: "01", health: 30, status: "嚴重損耗", missingParts: "少一枚綠寶石盲籌，牌面模糊" },
];

// LFG 揪團與桌況假資料
let lfgPosts = [
    { id: 101, host: "彬皓", game: "阿瓦隆 (Avalon)", maxPlayers: 8, currentPlayers: ["彬皓", "皓文", "寶龍"], time: "14:00", status: "缺人中" },
    { id: 102, host: "店長大大", game: "璀璨寶石 (Splendor)", maxPlayers: 4, currentPlayers: ["店長大大"], time: "16:00", status: "缺人中" },
    { id: 103, host: "王小明", game: "機密代號 (Codenames)", maxPlayers: 6, currentPlayers: ["王小明", "小美", "阿強", "老李", "大明", "阿花"], time: "19:00", status: "已滿團" }
];

// 真正的全域變數
let games = [];
let users = [];
let reservations = [];
let inventory = [];

// 全域狀態
let activeTab = 'tables'; 
let currentUser = null; 
let currentPage = 'home';
let categoryFilter = '全部';
let currentCaptcha = ''; 
let searchQuery = ''; 

// --- 讀寫函數 ---
function loadAllData() {
    const storedGames = localStorage.getItem('games');
    if (storedGames) {
        let parsedGames = JSON.parse(storedGames);
        games = parsedGames.map(game => {
            const defaultGame = defaultGames.find(d => d.id === game.id);
            if (defaultGame && !game.description) {
                return { ...game, description: defaultGame.description };
            }
            return game;
        });
        saveGames();
    } else {
        games = [...defaultGames];
        saveGames(); 
    }

    const storedUsers = localStorage.getItem('users');
    users = storedUsers ? JSON.parse(storedUsers) : [...defaultUsers];
    if (!storedUsers) saveUsers();

    const storedRes = localStorage.getItem('reservations');
    reservations = storedRes ? JSON.parse(storedRes) : [];
    
    const storedInv = localStorage.getItem('inventory');
    inventory = storedInv ? JSON.parse(storedInv) : [...defaultInventory];
    
    const storedCurr = localStorage.getItem('currentUser');
    if (storedCurr) {
        const parsedUser = JSON.parse(storedCurr);
        const validUser = users.find(u => u.id === parsedUser.id);
        currentUser = validUser || null;
    }
}

function saveGames() { localStorage.setItem('games', JSON.stringify(games)); }
function saveUsers() { localStorage.setItem('users', JSON.stringify(users)); }
function saveReservations() { localStorage.setItem('reservations', JSON.stringify(reservations)); }
function saveInventory() { localStorage.setItem('inventory', JSON.stringify(inventory)); }
function saveCurrentUser() { 
    if(currentUser) localStorage.setItem('currentUser', JSON.stringify(currentUser)); 
    else localStorage.removeItem('currentUser');
}

// --- 核心功能函數 ---

function init() {
    loadAllData();
    try { localStorage.removeItem('chatMessages'); } catch(e) {}
    chatMessages = [];
    addMessage('bot', '哈囉！我是小圈機器人，歡迎來到圈圈桌遊店。');
    addMessage('bot', '提示：你可以輸入「你好」、「營業時間」、「價格」、「預約」、「桌遊」得到快速回覆。');
    
    renderNavbar();
    renderPage('home');
    lucide.createIcons();
    
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
    
    if (captchaInput !== currentCaptcha) {
        alert("驗證碼錯誤，請重新輸入！");
        form.captcha.value = ''; 
        refreshCaptcha();        
        form.captcha.focus();    
        return;
    }

    if (password !== confirmPassword) {
        alert("密碼和確認密碼不一致");
        return;
    }
    
    if (users.find(u => u.username === username)) {
        alert("此帳號已被使用，請選擇其他帳號");
        return;
    }
    
    const newUser = {
        id: Date.now(),
        username,
        name,
        role: "member",
        password,
        xp: 0,
        level: 1,
        title: "桌遊新手",
        preferences: ["派對"]
    };
    
    users.push(newUser);
    saveUsers();
    
    alert(`註冊成功！歡迎 ${name}！`);
    currentUser = newUser;
    saveCurrentUser();
    renderNavbar();
    renderPage('home');
}

function refreshCaptcha() {
    currentCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
    const display = document.getElementById('captchaDisplay');
    if (display) {
        display.textContent = currentCaptcha;
        display.classList.add('bg-gray-300');
        setTimeout(() => display.classList.remove('bg-gray-300'), 200);
    }
}

function logout() {
    currentUser = null;
    saveCurrentUser();
    renderNavbar();
    renderPage('home');
}

function navigateTo(page) {
    if (!currentUser && (page === 'reservation' || page === 'profile')) {
        alert("請先登入會員才能使用此功能！");
        renderPage('login');
        return;
    }
    renderPage(page);
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu) mobileMenu.classList.add('hidden');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function renderNavbar() {
    const desktopMenu = document.getElementById('desktop-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const role = currentUser?.role || 'guest';
    
    let menuItems = `<button onclick="navigateTo('home')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">首頁</button>`;

    if (role === 'admin') {
        menuItems += `
            <button onclick="navigateTo('admin-games')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">桌遊管理</button>
            <button onclick="navigateTo('admin-users')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">會員管理</button>
            <button onclick="navigateTo('admin-reservations')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">預約管理</button>
            <button onclick="navigateTo('admin-inventory')" class="px-3 py-2 rounded-md text-sm font-medium text-yellow-300 hover:bg-indigo-100 hover:text-indigo-700 transition">
                <i data-lucide="scan-line" class="w-4 h-4 inline mr-1"></i>庫存與維護
            </button>
        `;
    } else {
        menuItems += `
            <button onclick="navigateTo('games')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">桌遊清單 🎲</button>
            <button onclick="navigateTo('reservation')" class="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-100 hover:text-indigo-700 transition">智慧預約 📆</button>
        `;
    }

    let rightSide = '';
    if (currentUser) {
        rightSide = `
            <div class="border-l pl-4 ml-4 flex items-center space-x-3">
                <div class="flex flex-col items-end cursor-pointer hover:opacity-80 transition" onclick="navigateTo('profile')" title="進入會員中心">
                    <span class="text-sm font-bold text-yellow-300 border-b border-transparent hover:border-yellow-300">${currentUser.name}</span>
                    <span class="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        ${role === 'admin' ? '管理員' : 'LV.' + (currentUser.level || 1) + ' ' + (currentUser.title || '會員')}
                    </span>
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
    
    if (mobileMenu) {
        mobileMenu.innerHTML = menuItems + (currentUser ? 
            `<div class="border-t pt-2 mt-2">
                <button onclick="navigateTo('profile')" class="w-full text-left px-3 py-2 text-yellow-500 font-bold">會員中心</button>
                <button onclick="logout()" class="w-full text-left px-3 py-2 text-red-600">登出 (${currentUser.name})</button>
            </div>` : 
            `<div class="border-t pt-2 mt-2">
                <button onclick="navigateTo('login')" class="w-full text-left px-3 py-2 text-indigo-600">登入</button>
            </div>`
        );
    }
    
    lucide.createIcons();
}

function renderPage(page) {
    currentPage = page;
    const root = document.getElementById('app-root');
    root.innerHTML = ''; 

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
                            <h3 class="text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">智慧揪團</h3>
                            <p class="text-lg text-gray-600">不怕缺咖，線上大廳直接+1。</p>
                        </div>
                        <div class="group bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-500/40 border-b-0 hover:border-b-4 border-orange-500 relative overflow-hidden flex flex-col items-center text-center">
                            <div class="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-150 duration-500"></div>
                            <div class="relative inline-block p-4 bg-orange-100 text-orange-600 rounded-full mb-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white">
                                <i data-lucide="trophy" class="w-10 h-10"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-2 group-hover:text-orange-600 transition-colors">戰績系統</h3>
                            <p class="text-lg text-gray-600">累積經驗值，解鎖大師稱號。</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'games':
            const categories = getCategories();
            const catNav = `
                <div class="flex flex-wrap gap-2 items-center">
                    <span class="mr-2 text-gray-600 font-bold text-sm">分類：</span>
                    ${categories.map(c => `
                        <button onclick="setCategoryFilter('${c}')"
                            class="px-3 py-1 rounded-full text-sm transition ${categoryFilter === c ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}">
                            ${c}
                        </button>
                    `).join('')}
                </div>
            `;
            
            const filteredGames = games.filter(g => {
                const matchCat = categoryFilter === '全部' || g.category === categoryFilter;
                const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchCat && matchSearch;
            });
            
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
                    <h2 class="text-3xl font-bold mb-6 text-white-800 border-l-8 border-indigo-600 pl-4">桌遊清單</h2>
                    
                    <div class="bg-white p-6 rounded-xl shadow-md mb-8">
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">搜尋桌遊</label>
                            <div class="flex gap-2">
                                <input 
                                    type="text" 
                                    id="searchInput"
                                    value="${searchQuery}" 
                                    onkeydown="if(event.key === 'Enter') performSearch()"
                                    placeholder="輸入名稱後按 Enter 或點擊搜尋..." 
                                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                >
                                <button onclick="performSearch()" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center">
                                    <i data-lucide="search" class="w-5 h-5 mr-1"></i> 搜尋
                                </button>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 my-4"></div>
                        <div>
                            ${catNav}
                        </div>
                    </div>

                    ${filteredGames.length
                        ? `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">${gamesList}</div>`
                        : `<div class="text-center text-gray-500 py-20 bg-white rounded-xl shadow-inner">
                                <i data-lucide="ghost" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
                                <p>找不到符合條件的桌遊</p>
                           </div>`
                    }
                </div>
            `;
            break;

        case 'reservation':
            if (!currentUser) return;
            const today = new Date();
            const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            
            const tabUI = `
                <div class="flex justify-center mb-6 border-b border-gray-200">
                    <button onclick="switchResTab('tables')" class="px-6 py-3 font-bold text-lg transition-colors ${activeTab === 'tables' ? 'text-indigo-600 border-b-4 border-indigo-600' : 'text-gray-400 hover:text-indigo-400'}">實時桌況預約</button>
                    <button onclick="switchResTab('lfg')" class="px-6 py-3 font-bold text-lg transition-colors ${activeTab === 'lfg' ? 'text-green-600 border-b-4 border-green-600' : 'text-gray-400 hover:text-green-400'}">線上揪團大廳</button>
                </div>
            `;

            if (activeTab === 'tables') {
                root.innerHTML = `
                    <div class="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
                        <h2 class="text-3xl font-bold mb-2 text-gray-800"><i data-lucide="layout-dashboard" class="w-8 h-8 inline mr-2 text-indigo-600"></i>智慧預約面板</h2>
                        <p class="text-gray-500 mb-6">查看未來 4 小時實時桌況，精準鎖定您的座位。</p>
                        ${tabUI}
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="md:col-span-2 bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-500">
                                <h3 class="font-bold text-lg mb-4 text-gray-700">實時桌位狀態 (今日)</h3>
                                <div class="overflow-x-auto">
                                    <table class="w-full text-center border-collapse">
                                        <thead>
                                            <tr class="bg-gray-50 text-gray-500 text-sm">
                                                <th class="p-3 border">桌號 \\ 時間</th>
                                                <th class="p-3 border">14:00</th>
                                                <th class="p-3 border">15:00</th>
                                                <th class="p-3 border">16:00</th>
                                                <th class="p-3 border">17:00</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="p-3 border font-bold bg-gray-50">A 桌 (大桌)</td>
                                                <td class="p-3 border bg-red-100 text-red-600 text-sm font-bold">已預約</td>
                                                <td class="p-3 border bg-red-100 text-red-600 text-sm font-bold">已預約</td>
                                                <td class="p-3 border bg-green-50 text-green-600 text-sm cursor-pointer hover:bg-green-100" onclick="autoFillRes('A桌', '16:00')">空桌</td>
                                                <td class="p-3 border bg-green-50 text-green-600 text-sm cursor-pointer hover:bg-green-100" onclick="autoFillRes('A桌', '17:00')">空桌</td>
                                            </tr>
                                            <tr>
                                                <td class="p-3 border font-bold bg-gray-50">B 桌 (小桌)</td>
                                                <td class="p-3 border bg-green-50 text-green-600 text-sm cursor-pointer hover:bg-green-100" onclick="autoFillRes('B桌', '14:00')">空桌</td>
                                                <td class="p-3 border bg-yellow-100 text-yellow-700 text-sm font-bold">揪團中</td>
                                                <td class="p-3 border bg-yellow-100 text-yellow-700 text-sm font-bold">揪團中</td>
                                                <td class="p-3 border bg-green-50 text-green-600 text-sm cursor-pointer hover:bg-green-100" onclick="autoFillRes('B桌', '17:00')">空桌</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p class="text-xs text-gray-400 mt-4">* 點擊「空桌」可快速帶入右側預約表單。</p>
                            </div>

                            <div class="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
                                <h3 class="font-bold text-lg mb-4 text-indigo-900">鎖定座位</h3>
                                <form onsubmit="submitReservation(event)" class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">日期</label>
                                        <input type="date" name="date" required class="w-full px-3 py-2 border rounded-lg" min="${minDate}" value="${minDate}">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">時間</label>
                                        <input type="time" id="resTime" name="time" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">預計人數</label>
                                        <input type="number" name="party_size" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" min="1" max="20" value="4" required>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">備註 (可填指定桌號)</label>
                                        <input type="text" id="resNote" name="game" placeholder="例：指定 A 桌，想玩阿瓦隆" class="w-full px-3 py-2 border rounded-lg">
                                    </div>
                                    <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg transition">確認鎖定座位</button>
                                </form>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // 揪團大廳畫面
                const lfgCards = lfgPosts.map(post => {
                    const isFull = post.currentPlayers.length >= post.maxPlayers;
                    const isJoined = post.currentPlayers.includes(currentUser.name);
                    
                    let btnHTML = '';
                    if (isJoined) {
                        btnHTML = `<button disabled class="w-full bg-gray-300 text-gray-600 py-2 rounded-lg font-bold cursor-not-allowed">已加入</button>`;
                    } else if (isFull) {
                        btnHTML = `<button disabled class="w-full bg-red-100 text-red-600 py-2 rounded-lg font-bold cursor-not-allowed">已滿團</button>`;
                    } else {
                        btnHTML = `<button onclick="joinLFG(${post.id})" class="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 shadow transition transform hover:-translate-y-1">立即加入 (+1)</button>`;
                    }

                    return `
                        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex flex-col justify-between hover:shadow-lg transition">
                            <div>
                                <div class="flex justify-between items-start mb-3">
                                    <span class="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full border border-green-200">缺 ${post.maxPlayers - post.currentPlayers.length} 人</span>
                                    <span class="text-sm text-gray-500 font-mono bg-gray-100 px-2 rounded">${post.time}</span>
                                </div>
                                <h3 class="font-bold text-xl text-gray-800 mb-1">${post.game}</h3>
                                <p class="text-sm text-gray-600 mb-4 flex items-center"><i data-lucide="user" class="w-4 h-4 mr-1"></i> 主揪：${post.host}</p>
                                
                                <div class="mb-4">
                                    <div class="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>目前人數：${post.currentPlayers.length} / ${post.maxPlayers}</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full transition-all duration-500" style="width: ${(post.currentPlayers.length / post.maxPlayers) * 100}%"></div>
                                    </div>
                                </div>
                                
                                <div class="flex flex-wrap gap-1 mb-6">
                                    ${post.currentPlayers.map(p => `<span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded border">${p}</span>`).join('')}
                                </div>
                            </div>
                            <div>${btnHTML}</div>
                        </div>
                    `;
                }).join('');

                root.innerHTML = `
                    <div class="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
                        <div class="flex justify-between items-center mb-2">
                            <h2 class="text-3xl font-bold text-gray-800"><i data-lucide="users-2" class="w-8 h-8 inline mr-2 text-green-600"></i>線上揪團大廳 (LFG)</h2>
                            <button onclick="alert('實作發起揪團彈出視窗...')" class="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-black transition flex items-center">
                                <i data-lucide="plus" class="w-5 h-5 mr-1"></i> 發起揪團
                            </button>
                        </div>
                        <p class="text-gray-500 mb-6">找不到咖？馬上加入別人的局，系統會自動綁定桌位。</p>
                        ${tabUI}
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            ${lfgCards}
                        </div>
                    </div>
                `;
            }
            break;

        case 'profile':
            if (!currentUser) return;
            const xpPercentage = ((currentUser.xp || 0) % 1000) / 1000 * 100;
            const userPrefs = currentUser.preferences || [];
            const recommendedGames = games.filter(g => userPrefs.includes(g.category)).slice(0, 3);
            
            const recHtml = recommendedGames.map(g => `
                <div onclick="openGameModal(${g.id})" class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-indigo-50 border border-transparent hover:border-indigo-200 transition">
                    <img src="${g.image}" class="w-16 h-16 rounded object-cover">
                    <div>
                        <h4 class="font-bold text-gray-800">${g.name}</h4>
                        <span class="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded">${g.category}</span>
                    </div>
                </div>
            `).join('');

            root.innerHTML = `
                <div class="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white flex items-center gap-6">
                            <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg backdrop-blur-sm">
                                ${currentUser.name[0]}
                            </div>
                            <div class="flex-1">
                                <h2 class="text-3xl font-bold mb-1">${currentUser.name} <span class="text-lg font-normal text-indigo-200 bg-black/20 px-3 py-1 rounded-full ml-2">${currentUser.title || '會員'}</span></h2>
                                <p class="text-indigo-100 mb-4">@${currentUser.username} • 擅長：${userPrefs.join(', ') || '無'}</p>
                                
                                <div class="flex items-center gap-3">
                                    <span class="font-bold font-mono text-xl">LV.${currentUser.level || 1}</span>
                                    <div class="flex-1 bg-black/30 h-3 rounded-full overflow-hidden border border-white/20">
                                        <div class="bg-yellow-400 h-full relative" style="width: ${xpPercentage}%">
                                            <div class="absolute inset-0 bg-white/30 w-full h-full animate-pulse"></div>
                                        </div>
                                    </div>
                                    <span class="text-xs font-mono">${currentUser.xp || 0} XP</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                            <div>
                                <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center"><i data-lucide="sparkles" class="w-5 h-5 mr-2 text-yellow-500"></i>智慧推薦 (基於您的喜好)</h3>
                                <div class="space-y-3">
                                    ${recHtml || '<p class="text-gray-500">多玩幾款遊戲，系統就會給您專屬推薦喔！</p>'}
                                </div>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center"><i data-lucide="history" class="w-5 h-5 mr-2 text-indigo-500"></i>近期戰績與成就</h3>
                                <ul class="space-y-4">
                                    <li class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border-l-4 border-green-500">
                                        <div><div class="font-bold text-gray-800">阿瓦隆 - 勝利</div><div class="text-xs text-gray-500">昨天 16:00</div></div>
                                        <span class="text-green-600 font-bold">+150 XP</span>
                                    </li>
                                    <li class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border-l-4 border-gray-400">
                                        <div><div class="font-bold text-gray-800">卡坦島 - 亞軍</div><div class="text-xs text-gray-500">上週六 14:00</div></div>
                                        <span class="text-gray-600 font-bold">+50 XP</span>
                                    </li>
                                    <li class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border-l-4 border-yellow-500">
                                        <div><div class="font-bold text-gray-800">解鎖成就：【交際花】</div><div class="text-xs text-gray-500">累積參與 5 次派對遊戲</div></div>
                                        <i data-lucide="award" class="w-6 h-6 text-yellow-500"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'admin-inventory':
            const invList = inventory.map(item => {
                const healthColor = item.health > 80 ? 'bg-green-500' : (item.health > 50 ? 'bg-yellow-500' : 'bg-red-500');
                const statusColor = item.health > 80 ? 'text-green-600 bg-green-50' : (item.health > 50 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50');
                
                return `
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4 font-mono text-sm text-gray-500">${item.id}</td>
                    <td class="px-6 py-4 font-bold text-gray-800">${item.gameName} <span class="text-xs font-normal text-gray-400 ml-1">#${item.boxNo}</span></td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-2">
                            <div class="w-24 bg-gray-200 rounded-full h-2">
                                <div class="${healthColor} h-2 rounded-full" style="width: ${item.health}%"></div>
                            </div>
                            <span class="text-xs text-gray-500 w-8">${item.health}%</span>
                        </div>
                    </td>
                    <td class="px-6 py-4"><span class="px-2 py-1 rounded text-xs font-bold ${statusColor}">${item.status}</span></td>
                    <td class="px-6 py-4 text-sm text-gray-500">${item.missingParts}</td>
                    <td class="px-6 py-4 text-right">
                        <button onclick="openEditInventory('${item.id}')" class="text-indigo-600 hover:text-indigo-900 text-sm font-bold bg-indigo-50 px-3 py-1 rounded">編輯狀態</button>
                    </td>
                </tr>
            `}).join('');
            
            root.innerHTML = `
                <div class="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
                    <div class="flex justify-between items-end mb-6">
                        <div>
                            <h2 class="text-2xl font-bold text-white flex items-center"><i data-lucide="package-search" class="w-6 h-6 mr-2"></i>後台：智慧庫存維護</h2>
                            <p class="text-gray-300 text-sm mt-1">追蹤桌遊損耗狀況，及時替換缺件。</p>
                        </div>
                        <button onclick="simulateScanQR()" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition flex items-center transform hover:scale-105">
                            <i data-lucide="qr-code" class="w-5 h-5 mr-2"></i> 模擬掃描 QR 歸還
                        </button>
                    </div>
                    
                    <div class="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">資產編號</th>
                                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">遊戲名稱</th>
                                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">健康值</th>
                                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">狀態</th>
                                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">備註 / 缺件紀錄</th>
                                    <th class="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">操作</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${invList}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="invModalOverlay" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center backdrop-blur-sm">
                    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4 animate-fade-in">
                        <div class="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 class="text-xl font-bold text-gray-800" id="invModalTitle">編輯庫存狀態</h3>
                            <button onclick="closeEditInventory()" class="text-gray-400 hover:text-gray-600"><i data-lucide="x" class="w-6 h-6"></i></button>
                        </div>
                        <form id="invEditForm" onsubmit="saveInventoryEdit(event)" class="space-y-4">
                            <input type="hidden" id="editInvId">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">健康值 (0-100%)</label>
                                <input type="number" id="editInvHealth" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" min="0" max="100" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">狀態評估</label>
                                <select id="editInvStatus" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" required>
                                    <option value="良好">良好 (80%以上)</option>
                                    <option value="輕微磨損">輕微磨損 (50%-80%)</option>
                                    <option value="缺件警告">缺件警告 (需留意)</option>
                                    <option value="嚴重損耗">嚴重損耗 (50%以下)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">備註 / 缺件紀錄</label>
                                <input type="text" id="editInvMissing" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="例如：少一個紅色木頭村莊">
                            </div>
                            <div class="flex justify-end gap-3 mt-6 pt-4 border-t">
                                <button type="button" onclick="closeEditInventory()" class="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold">取消</button>
                                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-bold shadow-md">儲存變更</button>
                            </div>
                        </form>
                    </div>
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

        case 'admin-games':
            const adminGamesList = games.map(game => `
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4 font-medium">${game.name}</td>
                    <td class="px-6 py-4 text-gray-500">${game.category}</td>
                    <td class="px-6 py-4 text-right">
                        <button onclick="deleteGame(${game.id})" class="text-red-600 hover:text-red-900 font-bold bg-red-50 px-3 py-1 rounded">刪除</button>
                    </td>
                </tr>
            `).join('');
            
            const allCategories = ['全部', ...new Set(games.map(g => g.category))];
            const categoryOptions = allCategories.filter(c => c !== '全部').map(cat => `<option value="${cat}">${cat}</option>`).join('');
            
            root.innerHTML = `
                <div class="max-w-6xl mx-auto px-4 py-8">
                    <h2 class="text-2xl font-bold text-white mb-6">後台：桌遊管理</h2>
                    <div class="bg-gray-100 p-6 rounded-lg mb-8 border space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label class="text-xs text-gray-500">名稱</label><input id="newGameName" class="p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 outline-none"></div>
                            <div><label class="text-xs text-gray-500">類別</label><select id="newGameCat" class="p-2 border rounded w-full focus:ring-2 focus:ring-indigo-500 outline-none" required><option value="">請選擇</option>${categoryOptions}</select></div>
                            <div class="md:col-span-2"><label class="text-xs text-gray-500">遊戲介紹</label><textarea id="newGameDesc" class="p-2 border rounded w-full h-20 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="請輸入簡單的遊戲介紹..."></textarea></div>
                            <div><label class="text-xs text-gray-500">遊戲圖片 *</label><input id="newGameImage" type="file" accept="image/*" class="p-2 border rounded w-full" required></div>
                        </div>
                        <div id="imagePreview" class="w-32 h-40 bg-gray-200 rounded border-2 border-dashed flex items-center justify-center text-gray-400 text-sm">
                            預覽區域
                        </div>
                        <button onclick="addGame()" class="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 shadow-md">新增桌遊</button>
                    </div>
                    <div class="bg-white shadow overflow-hidden rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">名稱</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500">類別</th>
                                    <th class="px-6 py-3 text-right">操作</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${adminGamesList}
                            </tbody>
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
                <div class="bg-white p-4 rounded-lg shadow mb-3 flex justify-between items-center hover:shadow-md transition">
                    <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4 font-bold">${u.name[0]}</div>
                        <div>
                            <div class="font-bold text-gray-800">${u.name}</div>
                            <div class="text-sm text-gray-500">@${u.username}</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="px-3 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}">
                            ${u.role === 'admin' ? '管理員' : '會員'}
                        </span>
                        ${u.role !== 'admin' ? `<button onclick="kickMember(${u.id})" class="text-red-600 hover:text-red-800 font-bold text-sm px-3 py-1 rounded hover:bg-red-50 transition">踢除</button>` : ''}
                    </div>
                </div>
            `).join('');
            
            root.innerHTML = `
                <div class="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
                    <h2 class="text-2xl font-bold mb-6 text-white flex items-center">
                        <i data-lucide="users" class="w-6 h-6 mr-2"></i>會員名單
                    </h2>
                    <div class="grid gap-2">
                        ${userList}
                    </div>
                </div>
            `;
            break;

        case 'admin-reservations':
            // 這裡已經修好表頭遺失、人數與備註分開顯示的 Bug 囉！
            const resList = reservations.map(r => `
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4 whitespace-nowrap font-bold text-gray-800">${r.userName}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-600">${r.date} ${r.time}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-indigo-600 font-bold">${r.party_size} 人</td>
                    <td class="px-6 py-4 text-gray-500">${r.game || '無備註'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">
                        <button onclick="deleteReservation(${r.id})" class="text-red-600 hover:text-red-900 font-bold bg-red-50 px-3 py-1 rounded transition">取消預約</button>
                    </td>
                </tr>
            `).join('');
            
            root.innerHTML = `
                <div class="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
                    <h2 class="text-2xl font-bold mb-6 text-white flex items-center">
                        <i data-lucide="calendar-check" class="w-6 h-6 mr-2"></i> 後台：預約管理
                    </h2>
                    <div class="bg-white shadow-lg overflow-hidden rounded-xl border border-gray-200">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">預約會員</th>
                                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">預約時間</th>
                                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">預計人數</th>
                                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">備註 (桌號/遊戲)</th>
                                    <th class="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">操作</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${reservations.length ? resList : '<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500 font-bold">目前尚無任何預約</td></tr>'}
                            </tbody>
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

// --- 5. 資料操作、輔助邏輯與特效 ---

function performSearch() {
    const input = document.getElementById('searchInput');
    if(input) {
        searchQuery = input.value.trim();
        renderPage('games');
    }
}

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
    const desc = document.getElementById('newGameDesc').value; 
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
            description: desc || "暫無介紹", 
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
    
    reader.onerror = function() { alert("讀取圖片失敗，請重試"); };
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

function getCategories() { return ['全部', ...new Set(games.map(g => g.category))]; }
function setCategoryFilter(cat) { categoryFilter = cat; renderPage('games'); }

// 庫存編輯邏輯
function openEditInventory(id) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;
    
    document.getElementById('editInvId').value = item.id;
    document.getElementById('editInvHealth').value = item.health;
    
    const statusSelect = document.getElementById('editInvStatus');
    Array.from(statusSelect.options).forEach(opt => {
        if (opt.value === item.status) opt.selected = true;
    });
    
    document.getElementById('editInvMissing').value = item.missingParts === '無' ? '' : item.missingParts;
    document.getElementById('invModalTitle').innerText = `更新 ${item.gameName} (#${item.boxNo})`;
    
    document.getElementById('invModalOverlay').classList.remove('hidden');
    lucide.createIcons();
}

function closeEditInventory() {
    document.getElementById('invModalOverlay').classList.add('hidden');
}

function saveInventoryEdit(e) {
    e.preventDefault();
    const id = document.getElementById('editInvId').value;
    const health = parseInt(document.getElementById('editInvHealth').value, 10);
    const status = document.getElementById('editInvStatus').value;
    const missing = document.getElementById('editInvMissing').value.trim();
    
    const index = inventory.findIndex(i => i.id === id);
    if (index !== -1) {
        inventory[index].health = health;
        inventory[index].status = status;
        inventory[index].missingParts = missing || "無";
        
        saveInventory(); 
        alert('📦 庫存狀態已成功更新！');
        closeEditInventory();
        renderPage('admin-inventory'); 
    }
}

function switchResTab(tabName) {
    activeTab = tabName;
    renderPage('reservation');
}

function autoFillRes(table, time) {
    const timeInput = document.getElementById('resTime');
    const noteInput = document.getElementById('resNote');
    if (timeInput) timeInput.value = time;
    if (noteInput) {
        noteInput.value = `指定 ${table}`;
        noteInput.classList.add('ring-2', 'ring-green-400', 'bg-green-50');
        setTimeout(() => { noteInput.classList.remove('ring-2', 'ring-green-400', 'bg-green-50'); }, 500);
    }
}

function joinLFG(postId) {
    if (!currentUser) return alert("請先登入！");
    const post = lfgPosts.find(p => p.id === postId);
    if (!post) return;
    if (post.currentPlayers.length >= post.maxPlayers) return alert("此團已滿！");
    if (confirm(`確定要加入【${post.host}】開的《${post.game}》嗎？`)) {
        post.currentPlayers.push(currentUser.name);
        alert("加入成功！請準時抵達本店。");
        renderPage('reservation');
    }
}

function simulateScanQR() {
    const check = confirm("📷 已開啟相機。請對準桌遊盒上的 QR Code...");
    if (check) {
        setTimeout(() => {
            alert("掃描成功！\n資產編號：INV-004\n系統偵測：重量異常減輕，請清點「璀璨寶石」盲籌數量。");
        }, 800);
    }
}

// ------------------ 聊天機器人與 3D 輪播 ------------------
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
    try { localStorage.setItem('chatMessages', JSON.stringify(chatMessages)); } catch (e) {}
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
    chatMessages.push(msg); saveChatMessages(); renderChatMessages();
}

function toggleChat() {
    const panel = document.getElementById('chatbotPanel');
    if (!panel) return;
    panel.classList.toggle('open');
    const opened = panel.classList.contains('open');
    panel.setAttribute('aria-hidden', (!opened).toString());
    if (opened) { const input = document.getElementById('chatInput'); if (input) input.focus(); }
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
            if (e.key === 'Enter') { e.preventDefault(); sendChatFromInput(); }
        });
    }
});

let carouselIndex = 0;
let carouselTimer = null;
let carouselItemsData = []; 

function initCarousel() {
    const stage = document.querySelector('.carousel-stage');
    if (!stage) return;
    carouselItemsData = [...games].reverse(); 
    if (carouselItemsData.length === 0) { stage.innerHTML = '<div style="color:#fff;">暫無圖片</div>'; return; }

    stage.innerHTML = carouselItemsData.map((g, i) => `
        <div class="carousel-item" onclick="clickSlide(${i})" style="background-image: url('${g.image.replace(/'/g, "\\'")}')">
            <div class="carousel-neon">${g.name}</div>
        </div>
    `).join('');

    carouselIndex = Math.floor(carouselItemsData.length / 2); 
    update3DCarousel();
    startCarousel();
    
    const wrap = document.querySelector('.carousel-wrap');
    wrap.addEventListener('mouseenter', stopCarousel);
    wrap.addEventListener('mouseleave', startCarousel);
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
            const isFar = limitOffset > 3; 
            const tx = offset * 55; 
            const tz = limitOffset * -100; 
            const ry = direction * -25; 

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

function clickSlide(index) { if (index !== carouselIndex) { stopCarousel(); carouselIndex = index; update3DCarousel(); } }
function nextSlide() { carouselIndex = (carouselIndex + 1) % carouselItemsData.length; update3DCarousel(); }
function prevSlide() { carouselIndex = (carouselIndex - 1 + carouselItemsData.length) % carouselItemsData.length; update3DCarousel(); }
function carouselNext() { stopCarousel(); nextSlide(); }
function carouselPrev() { stopCarousel(); prevSlide(); }
function startCarousel() { stopCarousel(); carouselTimer = setInterval(nextSlide, 3000); }
function stopCarousel() { if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; } }

function openGameModal(id) {
    const game = games.find(g => g.id === id);
    if(!game) return;
    
    const modal = document.getElementById('gameModalOverlay');
    const body = document.getElementById('gameModalBody');
    
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
    if (!e || e.target.id === 'gameModalOverlay' || !e.target) { document.getElementById('gameModalOverlay').classList.remove('open'); }
}

init();