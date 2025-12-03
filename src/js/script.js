// --- 1. 模擬資料庫 (Mock Data) & 全域變數 ---

// 預設資料 (如果完全沒存過檔才會用這些)
const defaultGames = [
    { id: 1, name: "卡坦島 (Catan)", category: "策略", players: "3-4人", image: "images/catan.jpg" },
    { id: 2, name: "璀璨寶石 (Splendor)", category: "輕策略", players: "2-4人", image: "images/splendor.jpg" },
    { id: 3, name: "阿瓦隆 (Avalon)", category: "陣營", players: "5-10人", image: "images/avalon.jpg" },
    { id: 4, name: "機密代號 (Codenames)", category: "派對", players: "4-8人", image: "images/codenames.jpg" },
    { id: 5, name: "龍焰魔法鎮 (Flamecraft)", category: "策略", players: "1-5人", image: "images/flamecraft.jpg" },
    { id: 6, name: "碰! (Bang!)", category: "陣營", players: "4-7人", image: "images/bang.jpg" },
    { id: 7, name: "妙語說書人 (Dixit)", category: "派對", players: "3-6人", image: "images/dixit.jpg" }
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
let currentCaptcha = ''; // 驗證碼變數

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
            const gamesList = filteredGames.map(game => `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
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
                            ${currentUser ? `<button onclick="navigateTo('reservation')" class="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100">預約</button>` : ''}
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
                        <div class="mt-6 bg-blue-50 p-4 rounded text-sm text-blue-800">
                            <p>管理員: admin / admin</p>
                            <p>會員: user / user</p>
                        </div>
                        <div class="mt-6 text-center border-t pt-6">
                            <p class="text-gray-600 text-sm mb-3">還沒有帳號？</p>
                            <button onclick="navigateTo('register')" class="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">註冊會員</button>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'register':
            // 進入頁面時先產生一次
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
            // 產生今天與未來 30 日的日期限制
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
            
            root.innerHTML = `
                <div class="max-w-6xl mx-auto px-4 py-8">
                    <h2 class="text-2xl font-bold text-white mb-6">後台：桌遊管理</h2>
                    <div class="bg-gray-100 p-6 rounded-lg mb-8 border space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label class="text-xs text-gray-500">名稱</label><input id="newGameName" class="p-2 border rounded w-full"></div>
                            <div><label class="text-xs text-gray-500">類別</label><select id="newGameCat" class="p-2 border rounded w-full" required><option value="">請選擇</option>${categoryOptions}</select></div>
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
            
            // 為圖片輸入添加預覽功能
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
    // 如果回到首頁，初始化或重新啟動輪播
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
        // 儲存人數（若表單沒有 game 欄位，保留不指定）
        party_size: formData.get('party_size') ? parseInt(formData.get('party_size'), 10) : null,
        game: formData.get('game') || '不指定'
    };
    reservations.push(newRes);
    saveReservations(); // 新增
    alert("預約申請已送出！");
    navigateTo('home');
}

function addGame() {
    const name = document.getElementById('newGameName').value;
    const category = document.getElementById('newGameCat').value;
    const imageInput = document.getElementById('newGameImage');
    
    if(!name) return alert("請輸入名稱");
    if(!imageInput.files || !imageInput.files[0]) return alert("請上傳遊戲圖片");
    
    const file = imageInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // 使用 Base64 編碼的圖片資料
        const imageData = e.target.result;
        
        games.push({
            id: Date.now(),
            name, 
            category,
            players: "2-4人",
            image: imageData  // 存儲 Base64 圖片數據
        });
        saveGames();
        alert("新增成功！");
        // 清空表單
        document.getElementById('newGameName').value = '';
        document.getElementById('newGameCat').value = '';
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
        saveGames(); // 新增：儲存桌遊
        renderPage('admin-games');
    }
}

function deleteReservation(id) {
    if(confirm("確定取消？")) {
        reservations = reservations.filter(r => r.id !== id);
        saveReservations(); // 新增
        renderPage('admin-reservations');
    }
}

function kickMember(id) {
    const member = users.find(u => u.id === id);
    if(!member) return;
    
    if(confirm(`確定要踢除會員 ${member.name} 嗎？`)) {
        users = users.filter(u => u.id !== id);
        saveUsers();
        // 如果被踢的人是當前登入的用戶，則登出
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
    // 自動捲動到底部
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
    panel.classList.toggle('hidden');
    const opened = !panel.classList.contains('hidden');
    panel.setAttribute('aria-hidden', (!opened).toString());
    if (opened) {
        const input = document.getElementById('chatInput');
        if (input) input.focus();
    }
    // 確保 lucide icon 更新
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
    // 模擬延遲回覆
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

// 鍵盤事件：Enter 送出
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

// ------------------ 輪播功能 ------------------
// ------------------ 3D 輪播功能 (修改版) ------------------
let carouselIndex = 0;
let carouselTimer = null;
let carouselItemsData = []; // 儲存當前輪播的資料

function initCarousel() {
    const stage = document.querySelector('.carousel-stage');
    if (!stage) return;

    // 使用前 7 張圖片 (奇數張效果較好)
    carouselItemsData = games.slice(0, 7); 
    if (carouselItemsData.length === 0) {
        stage.innerHTML = '<div style="color:#fff;">暫無圖片</div>';
        return;
    }

    // 產生 HTML 結構
    // 注意：我們給每個 item 加了 onclick 事件，傳入它自己的索引
    stage.innerHTML = carouselItemsData.map((g, i) => `
        <div class="carousel-item" onclick="clickSlide(${i})" style="background-image: url('${g.image.replace(/'/g, "\\'")}')">
            <div class="carousel-neon">${g.name}</div>
        </div>
    `).join('');

    // 初始化位置
    carouselIndex = Math.floor(carouselItemsData.length / 2); // 預設從中間開始
    update3DCarousel();

    // 自動播放
    startCarousel();
    
    // 滑鼠懸停暫停
    const wrap = document.querySelector('.carousel-wrap');
    wrap.addEventListener('mouseenter', stopCarousel);
    wrap.addEventListener('mouseleave', startCarousel);
}

// 核心：更新 3D 位置與樣式 (循環優化版)
function update3DCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    // 注意：這裡要依賴上一步驟定義的 carouselItemsData
    // 如果你沒有定義這個變數，請確保 initCarousel 裡有正確賦值，或是改用 games.length
    const total = carouselItemsData.length || document.querySelectorAll('.carousel-item').length;
    const halfTotal = Math.floor(total / 2);

    items.forEach((item, i) => {
        // --- 1. 計算最短路徑 (讓最後一張的右邊變成第0張) ---
        let diff = i - carouselIndex;
        
        // 循環運算：如果距離太遠，就假設它在另一邊
        while (diff > halfTotal) diff -= total;
        while (diff < -halfTotal) diff += total;
        
        const offset = diff;
        // ---------------------------------------------

        // --- 2. 設定樣式 ---
        if (offset === 0) {
            // --- 中間主角 ---
            item.style.transform = `translateX(0) scale(1) translateZ(200px) rotateY(0deg)`;
            item.style.zIndex = 100;
            item.style.opacity = 1;
            item.style.filter = 'brightness(1.2)';
            item.classList.add('active');
        } else {
            // --- 左右配角 ---
            const limitOffset = Math.abs(offset); 
            const direction = offset > 0 ? 1 : -1;

            // 參數調整區
            const xBase = 55;   // 左右拉開的距離 (%)
            const zBase = -100; // 深度 (px)
            const rotateBase = -25; // 旋轉角度 (deg)

            // 為了讓循環看起來自然，我們顯示範圍稍微寬一點，但太遠的還是隱藏
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
    
    // 更新下方小圓點
    const dots = document.querySelectorAll('.carousel-dots button');
    if(dots.length) {
        dots.forEach(d => d.classList.remove('active'));
        if(dots[carouselIndex]) dots[carouselIndex].classList.add('active');
    }
}

// 點擊圖片切換
function clickSlide(index) {
    // 如果點擊的不是當前這張，就切換過去
    if (index !== carouselIndex) {
        stopCarousel();
        carouselIndex = index;
        update3DCarousel();
        // 點擊後重新開始計時，避免馬上又跳轉
        // startCarousel() 會由 mouseleave 觸發，或是這裡可以不強制重啟
    }
}

function nextSlide() {
    // 往右轉，index + 1，如果到底了就回到 0
    carouselIndex = (carouselIndex + 1) % carouselItemsData.length;
    update3DCarousel();
}

function prevSlide() {
    // 往左轉，index - 1，如果 < 0 就回到最後一張
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
    carouselTimer = setInterval(nextSlide, 3000); // 3秒換下一張
}

function stopCarousel() {
    if (carouselTimer) {
        clearInterval(carouselTimer);
        carouselTimer = null;
    }
}


// 啟動
init();