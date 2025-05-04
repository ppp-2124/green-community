// main.js - 社区低碳积分平台主JavaScript文件

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换功能
    setupMobileMenu();
    
    // 根据当前页面设置活动菜单项
    setActiveMenuItem();
    
    // 初始化各页面特定功能
    initPageSpecificFunctions();
    
    // 模拟用户数据（实际项目中应从后端获取）
    setupMockData();
});

/**
 * 设置移动端菜单切换功能
 */
function setupMobileMenu() {
    // 创建移动端菜单按钮
    const navbarContainer = document.querySelector('.navbar-container');
    if (navbarContainer) {
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.fontSize = '1.5rem';
        mobileMenuBtn.style.cursor = 'pointer';
        
        // 在小屏幕上显示菜单按钮
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        function handleScreenChange(e) {
            if (e.matches) {
                mobileMenuBtn.style.display = 'block';
            } else {
                mobileMenuBtn.style.display = 'none';
                document.querySelector('.navbar-menu').style.display = 'flex';
            }
        }
        mediaQuery.addListener(handleScreenChange);
        handleScreenChange(mediaQuery);
        
        // 添加菜单按钮到导航栏
        navbarContainer.appendChild(mobileMenuBtn);
        
        // 菜单切换功能
        mobileMenuBtn.addEventListener('click', function() {
            const navMenu = document.querySelector('.navbar-menu');
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                // 移动端菜单样式调整
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.backgroundColor = 'white';
                navMenu.style.padding = '10px 0';
                navMenu.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                navMenu.style.zIndex = '99';
            }
        });
    }
}

/**
 * 根据当前页面URL设置活动菜单项
 */
function setActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.navbar-menu a');
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        const itemPage = item.getAttribute('href');
        if (itemPage === currentPage) {
            item.classList.add('active');
        }
    });
}

/**
 * 初始化各页面特定功能
 */
function initPageSpecificFunctions() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'record.html':
            initRecordPage();
            break;
        case 'exchange.html':
            initExchangePage();
            break;
        case 'ranking.html':
            initRankingPage();
            break;
        case 'profile.html':
            initProfilePage();
            break;
        case 'login.html':
            initLoginPage();
            break;
    }
}

/**
 * 设置模拟数据
 */
function setupMockData() {
    // 如果localStorage中没有用户数据，初始化模拟数据
    if (!localStorage.getItem('mockUserData')) {
        const mockUserData = {
            isLoggedIn: false,
            username: '',
            points: 0,
            community: '阳光社区',
            activities: []
        };
        localStorage.setItem('mockUserData', JSON.stringify(mockUserData));
    }
    
    // 模拟商品数据
    if (!localStorage.getItem('mockProductsData')) {
        const mockProductsData = [
            {
                id: 1,
                name: '星巴克咖啡券',
                description: '任意中杯咖啡兑换券',
                points: 200,
                image: 'coffee.jpg'
            },
            {
                id: 2,
                name: '电影票8折券',
                description: '万达影城电影票8折优惠',
                points: 300,
                image: 'movie.jpg'
            },
            {
                id: 3,
                name: '购物中心代金券',
                description: '50元代金券',
                points: 500,
                image: 'shopping.jpg'
            }
        ];
        localStorage.setItem('mockProductsData', JSON.stringify(mockProductsData));
    }
    
    // 模拟社区排名数据
    if (!localStorage.getItem('mockRankingData')) {
        const mockRankingData = [
            { name: '阳光社区', points: 12500, members: 120 },
            { name: '绿树社区', points: 10800, members: 98 },
            { name: '和谐花园', points: 9600, members: 87 },
            { name: '康泰小区', points: 8200, members: 75 },
            { name: '宜居公寓', points: 7800, members: 68 }
        ];
        localStorage.setItem('mockRankingData', JSON.stringify(mockRankingData));
    }
}

/**
 * 碳行为记录页面初始化
 */
function initRecordPage() {
    // 获取表单元素
    const uploadForm = document.getElementById('upload-form');
    const stepForm = document.getElementById('step-form');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 模拟上传照片并获取积分
            addPoints(50, '垃圾分类照片上传');
            alert('照片上传成功！获得50积分');
        });
    }
    
    if (stepForm) {
        stepForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const steps = document.getElementById('steps').value;
            if (steps && !isNaN(steps)) {
                // 计算积分：每1000步获得10积分
                const earnedPoints = Math.floor(parseInt(steps) / 1000) * 10;
                addPoints(earnedPoints, '步行' + steps + '步');
                alert(`记录成功！您走了${steps}步，获得${earnedPoints}积分`);
            }
        });
    }
}

/**
 * 积分兑换页面初始化
 */
function initExchangePage() {
    const productContainer = document.getElementById('product-container');
    
    if (productContainer) {
        // 获取商品数据
        const products = JSON.parse(localStorage.getItem('mockProductsData') || '[]');
        
        // 渲染商品列表
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'card';
            productCard.innerHTML = `
                <div class="card-title">${product.name}</div>
                <div class="card-content">
                    <p>${product.description}</p>
                    <p style="color: var(--primary-color); font-weight: bold; margin-top: 10px;">${product.points} 积分</p>
                </div>
                <button class="btn btn-primary exchange-btn" data-id="${product.id}" data-points="${product.points}">立即兑换</button>
            `;
            productContainer.appendChild(productCard);
        });
        
        // 兑换按钮点击事件
        document.querySelectorAll('.exchange-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const productPoints = parseInt(this.getAttribute('data-points'));
                
                // 获取用户数据
                const userData = JSON.parse(localStorage.getItem('mockUserData') || '{}');
                
                if (!userData.isLoggedIn) {
                    alert('请先登录！');
                    window.location.href = 'login.html';
                    return;
                }
                
                if (userData.points < productPoints) {
                    alert('积分不足！');
                    return;
                }
                
                // 扣除积分
                userData.points -= productPoints;
                
                // 添加兑换记录
                const products = JSON.parse(localStorage.getItem('mockProductsData') || '[]');
                const product = products.find(p => p.id == productId);
                
                userData.activities.push({
                    type: '积分兑换',
                    description: `兑换${product.name}`,
                    points: -productPoints,
                    date: new Date().toLocaleString()
                });
                
                // 保存用户数据
                localStorage.setItem('mockUserData', JSON.stringify(userData));
                
                alert('兑换成功！');
                
                // 更新显示的积分
                const pointsDisplay = document.getElementById('user-points');
                if (pointsDisplay) {
                    pointsDisplay.textContent = userData.points;
                }
            });
        });
        
        // 显示用户积分
        const userData = JSON.parse(localStorage.getItem('mockUserData') || '{}');
        const userPointsContainer = document.createElement('div');
        userPointsContainer.className = 'user-points-container';
        userPointsContainer.innerHTML = `
            <div class="card" style="text-align: center; margin-bottom: 20px;">
                <h3>我的积分</h3>
                <p style="font-size: 2rem; color: var(--primary-color); font-weight: bold;" id="user-points">${userData.points || 0}</p>
            </div>
        `;
        
        productContainer.parentNode.insertBefore(userPointsContainer, productContainer);
    }
}

/**
 * 排行榜页面初始化
 */
function initRankingPage() {
    const rankingContainer = document.getElementById('ranking-container');
    
    if (rankingContainer) {
        // 获取排名数据
        const rankings = JSON.parse(localStorage.getItem('mockRankingData') || '[]');
        
        // 渲染排行榜
        rankings.sort((a, b) => b.points - a.points).forEach((community, index) => {
            const rankingCard = document.createElement('div');
            rankingCard.className = 'card';
            
            // 根据排名添加不同样式
            let rankBadge = '';
            if (index === 0) {
                rankBadge = '<span style="background-color: gold; color: black; padding: 3px 8px; border-radius: 3px; margin-right: 10px;">🥇</span>';
            } else if (index === 1) {
                rankBadge = '<span style="background-color: silver; color: black; padding: 3px 8px; border-radius: 3px; margin-right: 10px;">🥈</span>';
            } else if (index === 2) {
                rankBadge = '<span style="background-color: #cd7f32; color: white; padding: 3px 8px; border-radius: 3px; margin-right: 10px;">🥉</span>';
            } else {
                rankBadge = `<span style="background-color: var(--light-color); color: var(--dark-color); padding: 3px 8px; border-radius: 3px; margin-right: 10px;">${index+1}</span>`;
            }
            
            rankingCard.innerHTML = `
                <div style="display: flex; align-items: center;">
                    ${rankBadge}
                    <div>
                        <h3 class="card-title" style="margin: 0;">${community.name}</h3>
                        <p>成员: ${community.members}人</p>
                    </div>
                    <div style="margin-left: auto; text-align: right;">
                        <p style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">${community.points}</p>
                        <p>积分</p>
                    </div>
                </div>
            `;
            rankingContainer.appendChild(rankingCard);
        });
        
        // 高亮用户所在的社区
        const userData = JSON.parse(localStorage.getItem('mockUserData') || '{}');
        if (userData.community) {
            document.querySelectorAll('.card-title').forEach(title => {
                if (title.textContent === userData.community) {
                    title.parentNode.parentNode.parentNode.style.borderLeft = '5px solid var(--primary-color)';
                }
            });
        }
    }
}

/**
 * 个人中心页面初始化
 */
function initProfilePage() {
    // 获取用户数据
    const userData = JSON.parse(localStorage.getItem('mockUserData') || '{}');
    
    // 如果未登录，跳转到登录页
    if (!userData.isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // 更新用户信息
    const usernameEl = document.getElementById('username');
    const pointsEl = document.getElementById('user-points');
    const communityEl = document.getElementById('user-community');
    
    if (usernameEl) usernameEl.textContent = userData.username;
    if (pointsEl) pointsEl.textContent = userData.points;
    if (communityEl) communityEl.textContent = userData.community;
    
    // 渲染活动历史
    const activityContainer = document.getElementById('activity-history');
    if (activityContainer && userData.activities) {
        if (userData.activities.length === 0) {
            activityContainer.innerHTML = '<p>暂无活动记录</p>';
        } else {
            userData.activities.forEach(activity => {
                const activityItem = document.createElement('div');
                activityItem.className = 'card';
                activityItem.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 style="margin: 0; font-size: 1rem;">${activity.description}</h3>
                            <p style="color: var(--text-light); margin-top: 5px;">${activity.date}</p>
                        </div>
                        <div style="font-weight: bold; ${activity.points > 0 ? 'color: var(--success-color)' : 'color: var(--text-light)'}">
                            ${activity.points > 0 ? '+' : ''}${activity.points}
                        </div>
                    </div>
                `;
                activityContainer.appendChild(activityItem);
            });
        }
    }
    
    // 退出登录按钮
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            userData.isLoggedIn = false;
            localStorage.setItem('mockUserData', JSON.stringify(userData));
            window.location.href = 'index.html';
        });
    }
}

/**
 * 登录/注册页面初始化
 */
function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // 切换登录/注册表单
    if (switchToRegister && switchToLogin) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
        
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }
    
    // 处理登录
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            // 简单的用户验证（实际项目中应该通过后端API验证）
            if (username && password) {
                // 模拟登录成功
                const userData = JSON.parse(localStorage.getItem('mockUserData') || '{}');
                userData.isLoggedIn = true;
                userData.username = username;
                
                // 如果是新用户，初始化数据
                if (userData.points === undefined) {
                    userData.points = 100; // 新用户奖励100积分
                    userData.community = '阳光社区';
                    userData.activities = [{
                        type: '系统奖励',
                        description: '新用户注册奖励',
                        points: 100,
                        date: new Date().toLocaleString()
                    }];
                }
                
                localStorage.setItem('mockUserData', JSON.stringify(userData));
                
                alert('登录成功！');
                window.location.href = 'profile.html';
            } else {
                alert('请输入用户名和密码');
            }
        });
    }
    
    // 处理注册
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            const community = document.getElementById('register-community').value;
            
            if (username && password && community) {
                // 模拟注册成功
                const userData = {
                    isLoggedIn: true,
                    username: username,
                    points: 100, // 新用户奖励100积分
                    community: community,
                    activities: [{
                        type: '系统奖励',
                        description: '新用户注册奖励',
                        points: 100,
                        date: new Date().toLocaleString()
                    }]
                };
                
                localStorage.setItem('mockUserData', JSON.stringify(userData));
                
                alert('注册成功！已赠送100积分作为欢迎礼物');
                window.location.href = 'profile.html';
            } else {
                alert('请填写所有必填字段');
            }
        });
    }
}

/**
 * 给用户添加积分并记录活动
 * @param {number} points - 积分数量
 * @param {string} description - 活动描述
 */
function addPoints(points, description) {
    const userData = JSON.parse(localStorage.getItem('mockUserData') || '{}');
    
    // 检查用户是否登录
    if (!userData.isLoggedIn) {
        alert('请先登录！');
        window.location.href = 'login.html';
        return;
    }
    
    // 添加积分
    userData.points = (userData.points || 0) + points;
    
    // 记录活动
    userData.activities = userData.activities || [];
    userData.activities.unshift({
        type: '环保活动',
        description: description,
        points: points,
        date: new Date().toLocaleString()
    });
    
    // 更新社区积分
    const rankings = JSON.parse(localStorage.getItem('mockRankingData') || '[]');
    const communityIndex = rankings.findIndex(c => c.name === userData.community);
    if (communityIndex !== -1) {
        rankings[communityIndex].points += points;
        localStorage.setItem('mockRankingData', JSON.stringify(rankings));
    }
    
    // 保存用户数据
    localStorage.setItem('mockUserData', JSON.stringify(userData));
} 