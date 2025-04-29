/**
 * activities.js - 环保活动页面的JavaScript功能
 * 包含活动管理、注册、过滤和显示的所有功能
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 工具函数：记录日志
    function log(message) {
        console.log(`[活动页面] ${message}`);
    }
    
    log('活动页面已加载');
    
    // 检查用户是否登录
    function isUserLoggedIn() {
        const userData = JSON.parse(localStorage.getItem('mockUserData') || '{}');
        return userData.username !== undefined;
    }
    
    // 初始活动数据
    let activities = [
        {
            id: 1,
            title: "春季社区垃圾分类挑战赛",
            type: "垃圾分类",
            format: "线下活动",
            date: "2025年4月1日 - 4月30日",
            location: "各社区垃圾分类站",
            registered: 486,
            maxRegistrations: 1000,
            description: "参与为期一个月的垃圾分类挑战，上传分类照片获取双倍积分，优胜社区将获得社区环境改造基金。",
            featured: true
        },
        {
            id: 2,
            title: "社区植树节活动",
            type: "植树造林",
            format: "线下活动",
            date: "2025年4月23日",
            time: "09:00-12:00",
            location: "青青公园",
            registered: 128,
            maxRegistrations: 200,
            description: "在青青公园参与植树活动，为社区增添绿色。每位参与者可获得100碳积分，并由专业园艺师指导种植技巧。"
        },
        {
            id: 3,
            title: "二手物品交换集市",
            type: "资源回收",
            format: "线下活动",
            date: "2025年4月27日",
            time: "14:00-17:00",
            location: "社区活动中心",
            registered: 86,
            maxRegistrations: null,
            description: "带上您家中闲置但仍有使用价值的物品，参与社区集市，以物换物，减少浪费。每成功交换一件物品可获得30碳积分。"
        },
        {
            id: 4,
            title: "线上环保知识竞赛",
            type: "环保宣传",
            format: "线上活动",
            date: "2025年4月30日",
            time: "19:30-21:00",
            location: "线上活动",
            registered: 215,
            maxRegistrations: null,
            description: "参与线上环保知识竞赛，测试您的环保知识水平。前10名将获得精美环保礼品，所有参与者可获得50碳积分。"
        },
        {
            id: 10,
            title: "社区植树节活动",
            type: "offline",
            format: "group",
            date: "2025-04-05",
            time: "09:00-12:00",
            location: "青青公园",
            maxParticipants: 200,
            currentParticipants: 128,
            points: 50,
            category: "植树造林",
            description: "在春季植树节期间，我们将在青青公园进行植树活动，为社区增添绿色。每位参与者将种植一棵小树苗，并学习基本的植树技巧和树木养护知识。",
            organizer: "绿色未来协会",
            contact: "13812345678",
            imageUrl: "images/activity-tree.jpg"
        },
        {
            id: 11,
            title: "垃圾分类小达人",
            type: "online",
            format: "individual",
            date: "2025-04-15",
            time: "19:30-21:00",
            location: "线上直播",
            maxParticipants: 500,
            currentParticipants: 326,
            points: 30,
            category: "环保教育",
            description: "线上垃圾分类知识竞赛活动，通过有趣的问答和案例分析，帮助大家掌握垃圾分类的正确方法，提高环保意识。前100名的参与者将获得环保小礼品。",
            organizer: "环保先锋队",
            contact: "contact@eco.org",
            imageUrl: "images/activity-sorting.jpg"
        },
        {
            id: 12,
            title: "海滩清洁日",
            type: "offline",
            format: "group",
            date: "2025-04-23",
            time: "08:30-11:30",
            location: "金沙湾海滩",
            maxParticipants: 100,
            currentParticipants: 67,
            points: 60,
            category: "清洁行动",
            description: "我们将在金沙湾海滩进行清洁活动，收集海滩垃圾并进行分类处理。活动结束后将举行小型环保讲座，讨论海洋污染问题及解决方案。请穿着舒适的衣物和鞋子。",
            organizer: "蓝色海洋保护协会",
            contact: "ocean@protect.org",
            imageUrl: "images/activity-beach.jpg"
        },
        {
            id: 13,
            title: "低碳生活线上工作坊",
            type: "online",
            format: "workshop",
            date: "2025-04-30",
            time: "20:00-21:30",
            location: "视频会议",
            maxParticipants: 300,
            currentParticipants: 158,
            points: 40,
            category: "环保教育",
            description: "本次工作坊将分享低碳生活的实用技巧，包括家庭节能、低碳饮食、绿色出行等方面的内容。参与者将制定个人的低碳行动计划，并在后续的社区活动中分享实践经验。",
            organizer: "低碳生活推广中心",
            contact: "workshop@lowcarbon.com",
            imageUrl: "images/activity-workshop.jpg"
        },
        {
            id: 14,
            title: "春季生态观鸟活动",
            type: "offline",
            format: "group",
            date: "2025-03-15",
            time: "07:00-10:00",
            location: "湿地自然保护区",
            maxParticipants: 50,
            currentParticipants: 38,
            points: 45,
            category: "自然教育",
            description: "春季是观鸟的好时节，我们将在湿地自然保护区进行观鸟活动，专业观鸟指导员会教授大家如何识别常见鸟类，了解它们的习性和栖息地保护知识。请携带双筒望远镜和笔记本。",
            organizer: "自然之友协会",
            contact: "birdwatch@nature.org",
            imageUrl: "images/activity-bird.jpg"
        },
        {
            id: 15,
            title: "社区环保创意集市",
            type: "offline",
            format: "fair",
            date: "2025-05-10",
            time: "13:00-17:00",
            location: "中央广场",
            maxParticipants: 500,
            currentParticipants: 215,
            points: 35,
            category: "环保创意",
            description: "这是一个展示环保创意和产品的社区集市，包括手工再生产品展示、旧物改造工作坊、二手物品交换区等。鼓励大家带上自己的环保创意作品参与展示和交流。",
            organizer: "创意环保联盟",
            contact: "market@ecocreative.net",
            imageUrl: "images/activity-market.jpg"
        },
        {
            id: 16,
            title: "城市自行车日",
            type: "offline",
            format: "group",
            date: "2025-05-20",
            time: "09:00-11:00",
            location: "市民广场",
            maxParticipants: 300,
            currentParticipants: 142,
            points: 55,
            category: "绿色出行",
            description: "城市自行车日活动将组织大家一起骑行游览城市，倡导绿色出行理念。活动包括自行车安全培训、城市骑行路线导览、骑行安全知识分享等。参与者需自备自行车和安全装备。",
            organizer: "绿色出行促进会",
            contact: "bike@greentravel.org",
            imageUrl: "images/activity-bike.jpg"
        }
    ];
    
    // 当前登录用户数据(模拟)
    let userData = JSON.parse(localStorage.getItem('mockUserData') || '{"points": 0, "activities": [], "registeredActivities": []}');
    
    // 从localStorage加载用户创建的活动
    function loadUserCreatedActivities() {
        const savedActivities = localStorage.getItem('userCreatedActivities');
        if (savedActivities) {
            const userActivities = JSON.parse(savedActivities);
            // 将用户活动添加到活动列表中
            userActivities.forEach(activity => {
                // 检查活动是否已存在（避免重复添加）
                if (!activities.some(a => a.id === activity.id)) {
                    activities.push(activity);
                }
            });
            log(`已从localStorage加载${userActivities.length}个用户创建的活动`);
        }
    }
    
    // 保存用户创建的活动到localStorage
    function saveUserCreatedActivities(activity) {
        const savedActivities = localStorage.getItem('userCreatedActivities');
        let userActivities = savedActivities ? JSON.parse(savedActivities) : [];
        
        // 检查活动是否已存在
        if (!userActivities.some(a => a.id === activity.id)) {
            userActivities.push(activity);
            localStorage.setItem('userCreatedActivities', JSON.stringify(userActivities));
            log(`已将活动"${activity.title}"保存至localStorage`);
        }
    }
    
    // 页面加载时加载用户创建的活动
    loadUserCreatedActivities();
    
    // 切换视图功能
    function setupTabSwitching() {
        const tabs = document.querySelectorAll('.tab');
        const activityListView = document.querySelector('.main-content > div > div:nth-child(3)');
        const calendarView = document.querySelector('.main-content > div > div:nth-child(4)');
        
        if (tabs && tabs.length > 0) {
            tabs.forEach((tab, index) => {
                tab.addEventListener('click', function() {
                    // 移除所有tab的active类
                    tabs.forEach(t => t.classList.remove('active'));
                    // 给当前点击的tab添加active类
                    this.classList.add('active');
                    
                    // 根据点击的tab切换视图
                    if (index === 0) { // 列表视图
                        if (activityListView) activityListView.style.display = 'block';
                        if (calendarView) calendarView.style.display = 'none';
                    } else if (index === 1) { // 日历视图
                        if (activityListView) activityListView.style.display = 'none';
                        if (calendarView) calendarView.style.display = 'block';
                    }
                });
            });
        }
    }
    
    // 检查用户是否已经报名了特定活动
    function isUserRegistered(activityId) {
        if (!userData.registeredActivities) return false;
        return userData.registeredActivities.includes(activityId.toString());
    }
    
    // 注册用户到活动
    function registerUserForActivity(activity) {
        if (!userData.registeredActivities) {
            userData.registeredActivities = [];
        }
        
        // 确保活动ID不重复添加
        if (!userData.registeredActivities.includes(activity.id.toString())) {
            userData.registeredActivities.push(activity.id.toString());
            
            // 添加活动记录
            if (!userData.activities) {
                userData.activities = [];
            }
            
            userData.activities.push({
                type: 'registration',
                activityId: activity.id,
                activityTitle: activity.title,
                date: new Date().toISOString(),
                completed: false,
                pointsEarned: false
            });
            
            // 保存用户数据
            localStorage.setItem('mockUserData', JSON.stringify(userData));
            log(`用户已成功报名参加活动: ${activity.title}`);
        }
    }
    
    // 设置活动交互功能
    function setupActivityInteractions() {
        // 绑定报名按钮事件
        const registerButtons = document.querySelectorAll('.register-btn');
        if (registerButtons && registerButtons.length > 0) {
            registerButtons.forEach((button, index) => {
                button.addEventListener('click', function() {
                    // 获取活动ID从卡片上
                    const card = this.closest('.card');
                    if (card) {
                        const activityId = card.getAttribute('data-activity-id');
                        if (activityId) {
                            // 找到对应活动的索引
                            const activityIndex = activities.findIndex(a => a.id.toString() === activityId.toString());
                            if (activityIndex !== -1) {
                                handleRegistration(this, activityIndex);
                                return;
                            }
                        }
                    }
                    // 如果找不到ID，使用索引
                    handleRegistration(this, index);
                });
            });
        }
        
        // 处理精选活动的报名按钮
        const featuredRegisterBtn = document.querySelector('div[style*="background-image"] .btn.btn-primary');
        if (featuredRegisterBtn) {
            featuredRegisterBtn.addEventListener('click', function() {
                // 精选活动通常是ID为1的活动
                const activityIndex = activities.findIndex(a => a.id === 1);
                if (activityIndex !== -1) {
                    handleRegistration(this, activityIndex);
                } else {
                    // 如果找不到，默认使用第一个活动
                    handleRegistration(this, 0);
                }
            });
        }
        
        // 绑定发起活动按钮
        const initiateActivityBtn = document.querySelector('.btn.btn-primary i.fas.fa-plus').parentNode;
        if (initiateActivityBtn) {
            initiateActivityBtn.addEventListener('click', function() {
                log("发起环保活动按钮点击");
                
                // 检查用户是否登录
                if (!isUserLoggedIn()) {
                    if (confirm('发起活动需要先登录，是否前往登录页面？')) {
                        window.location.href = 'login.html';
                    }
                    return;
                }
                
                // 打开创建活动模态框
                const modal = document.getElementById('createActivityModal');
                if (modal) {
                    modal.style.display = 'flex';
                    // 设置模态框标题
                    document.querySelector('#createActivityModal .modal-title').textContent = '发起新的环保活动';
                } else {
                    alert('活动创建功能正在开发中，敬请期待！');
                }
            });
        }
    }
    
    // 设置模态框功能
    function setupModalInteractions() {
        // 模态框关闭按钮
        const closeModalBtn = document.querySelector('.modal-close');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                document.getElementById('createActivityModal').style.display = 'none';
            });
        }
        
        // 点击模态框外部关闭
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('createActivityModal');
            if (modal && event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // 表单提交处理
        const activityForm = document.getElementById('activityForm');
        if (activityForm) {
            activityForm.addEventListener('submit', function(event) {
                event.preventDefault();
                log("提交活动表单");
                
                // 获取表单数据
                const title = document.getElementById('activity-title').value;
                const type = document.getElementById('activity-type').value;
                const format = document.getElementById('activity-format').value;
                const location = document.getElementById('activity-location').value;
                const date = document.getElementById('activity-date').value;
                const time = document.getElementById('activity-time').value;
                const maxParticipants = document.getElementById('activity-max-participants').value;
                const points = document.getElementById('activity-points').value;
                const description = document.getElementById('activity-description').value;
                
                log("表单数据:", { title, type, format, location, date, time });
                
                // 验证表单数据
                if (!title || !type || !format || !date || !time || !description) {
                    alert('请填写所有必填项！');
                    return;
                }
                
                try {
                    // 格式化日期和时间
                    const dateObj = new Date(date);
                    const formattedDate = dateObj.toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    // 处理时间格式
                    const timeParts = time.split(':');
                    const formattedTime = `${timeParts[0]}:${timeParts[1]}`;
                    
                    // 创建新活动对象
                    const newActivity = {
                        id: 'activity-' + Date.now(),
                        title: title,
                        type: type,
                        format: format,
                        location: location || '待定',
                        date: formattedDate,
                        time: formattedTime,
                        maxRegistrations: maxParticipants ? parseInt(maxParticipants) : null,
                        points: points ? parseInt(points) : 50,
                        description: description,
                        registered: 0,
                        creator: userData.username || '环保达人',
                        createdAt: new Date().toISOString()
                    };
                    
                    log("新活动数据:", newActivity);
                    
                    // 将新活动添加到活动列表末尾
                    activities.push(newActivity);
                    
                    // 保存到localStorage
                    saveUserCreatedActivities(newActivity);
                    
                    // 更新用户数据
                    if (!userData.createdActivities) {
                        userData.createdActivities = [];
                    }
                    userData.createdActivities.push(newActivity.id);
                    
                    // 创建活动日志
                    if (!userData.activities) {
                        userData.activities = [];
                    }
                    
                    userData.activities.push({
                        type: 'create',
                        activityId: newActivity.id,
                        activityTitle: newActivity.title,
                        date: new Date().toISOString()
                    });
                    
                    // 保存用户数据
                    localStorage.setItem('mockUserData', JSON.stringify(userData));
                    
                    // 关闭模态框
                    document.getElementById('createActivityModal').style.display = 'none';
                    
                    // 动态创建并添加新活动卡片到页面
                    createAndDisplayNewActivity(newActivity);
                    
                    // 重置表单
                    activityForm.reset();
                    
                    // 提示成功
                    alert('活动创建成功！');
                } catch (error) {
                    log("创建活动出错:", error);
                    alert('创建活动时出现错误，请重试！');
                }
            });
        }
    }
    
    // 创建并显示新活动卡片
    function createAndDisplayNewActivity(activity) {
        try {
            // 获取活动日期中的日期数字
            let dayNum = '1';
            try {
                const dateMatch = activity.date.match(/(\d+)日/);
                if (dateMatch && dateMatch[1]) {
                    dayNum = dateMatch[1];
                }
            } catch (e) {
                log("解析日期出错:", e);
            }
            
            // 获取活动列表容器 - 使用更直接的选择器
            // 查找包含"即将开始的活动"的h2标题
            let activitiesHeading = null;
            const headings = document.querySelectorAll('h2');
            for (let h of headings) {
                if (h.textContent.includes('即将开始的活动')) {
                    activitiesHeading = h;
                    break;
                }
            }
            
            if (activitiesHeading) {
                // 找到标题所在的父容器
                const activitiesContainer = activitiesHeading.closest('div');
                if (activitiesContainer) {
                    log("找到即将开始的活动容器");
                    return createActivityCardIn(activitiesContainer, activity);
                }
            }
            
            // 如果上面的方法找不到，尝试其他方法
            log("找不到即将开始的活动容器，尝试查找任何活动卡片");
            const anyCard = document.querySelector('.card');
            if (anyCard) {
                const cardContainer = anyCard.parentNode;
                log("找到包含活动卡片的容器");
                return createActivityCardIn(cardContainer, activity);
            }
            
            // 最后的尝试 - 查找主内容区域
            log("找不到活动卡片，尝试查找主内容区域");
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                // 查找主内容区域中第一个有内容的div
                const contentDiv = mainContent.querySelector('div > div');
                if (contentDiv) {
                    log("找到主内容区域，将在这里添加活动");
                    return createActivityCardIn(contentDiv, activity);
                }
            }
            
            log("无法找到适合放置活动的容器");
            alert("无法添加新活动到页面，请刷新页面后查看。");
            return false;
        } catch (error) {
            log("创建活动卡片出错:", error);
            alert("创建活动卡片时出现错误，请刷新页面后查看新活动。");
            return false;
        }
    }
    
    // 在指定容器中创建活动卡片
    function createActivityCardIn(container, activity) {
        try {
            // 获取活动日期中的日期数字
            let dayNum = '1';
            try {
                const dateMatch = activity.date.match(/(\d+)日/);
                if (dateMatch && dateMatch[1]) {
                    dayNum = dateMatch[1];
                }
            } catch (e) {
                log("解析日期出错:", e);
            }
            
            // 创建新活动卡片
            const activityCard = document.createElement('div');
            activityCard.className = 'card';
            activityCard.style.marginBottom = '20px';
            activityCard.style.display = 'flex';
            activityCard.style.flexDirection = 'column';
            activityCard.setAttribute('data-activity-id', activity.id);
            
            // 设置卡片内容
            activityCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <div style="display: flex; gap: 15px; margin-bottom: 10px;">
                            <div style="width: 80px; height: 80px; background-color: var(--light-color); border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: var(--primary-color); font-weight: bold;">
                                <div style="font-size: 1.8rem;">${dayNum}</div>
                                <div>月</div>
                            </div>
                            <div>
                                <h3 style="margin-bottom: 5px; font-size: 1.3rem;">${activity.title}</h3>
                                <div style="color: var(--text-light); margin-bottom: 10px;">
                                    <i class="fas fa-map-marker-alt"></i> ${activity.location} | 
                                    <i class="far fa-clock"></i> ${activity.time}
                                </div>
                                <div>
                                    <span style="background-color: var(--light-color); color: var(--primary-color); padding: 3px 8px; border-radius: 5px; font-size: 0.8rem; margin-right: 5px;">
                                        ${activity.type}
                                    </span>
                                    <span style="background-color: var(--light-color); color: var(--primary-color); padding: 3px 8px; border-radius: 5px; font-size: 0.8rem;">
                                        ${activity.format}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p style="color: var(--text-light); margin-bottom: 15px;">
                            ${activity.description}
                        </p>
                    </div>
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: flex-end; gap: 10px; min-width: 200px;">
                        <div style="color: var(--text-light);">
                            <i class="fas fa-users"></i> 已有${activity.registered}人报名 ${activity.maxRegistrations ? `/ 限${activity.maxRegistrations}人` : '/ 不限人数'}
                        </div>
                        <button class="btn btn-primary register-btn">立即报名</button>
                    </div>
                </div>
            `;
            
            // 按时间顺序插入活动卡片
            let inserted = false;
            
            // 如果容器包含"即将开始的活动"标题
            if (container.querySelector('h2') && container.querySelector('h2').textContent.includes('即将开始的活动')) {
                // 获取所有活动卡片
                const cards = container.querySelectorAll('.card');
                
                // 查找"查看更多活动"按钮
                const moreButton = container.querySelector('.btn.btn-secondary');
                const moreButtonContainer = moreButton ? moreButton.parentNode : null;
                
                // 有现有卡片的情况
                if (cards.length > 0) {
                    // 插入到相应的位置，按日期排序
                    let insertBeforeCard = null;
                    
                    // 获取新活动的日期对象
                    const newActivityDate = parseActivityDate(activity.date);
                    
                    for (let i = 0; i < cards.length; i++) {
                        const card = cards[i];
                        const cardId = card.getAttribute('data-activity-id');
                        
                        // 找到这个卡片对应的活动
                        const existingActivity = activities.find(a => a.id.toString() === cardId);
                        
                        if (existingActivity) {
                            const existingDate = parseActivityDate(existingActivity.date);
                            
                            // 如果新活动日期早于当前卡片活动，在此卡片前插入
                            if (newActivityDate && existingDate && newActivityDate < existingDate) {
                                insertBeforeCard = card;
                                break;
                            }
                        }
                    }
                    
                    if (insertBeforeCard) {
                        container.insertBefore(activityCard, insertBeforeCard);
                        inserted = true;
                    }
                }
                
                // 如果没有按日期插入或者没有现有卡片，插入到"查看更多"按钮前
                if (!inserted && moreButtonContainer) {
                    container.insertBefore(activityCard, moreButtonContainer);
                    inserted = true;
                }
            }
            
            // 如果以上方法都未插入，直接追加到容器末尾
            if (!inserted) {
                container.appendChild(activityCard);
            }
            
            // 为新卡片的报名按钮添加事件监听
            const registerBtn = activityCard.querySelector('.register-btn');
            if (registerBtn) {
                registerBtn.addEventListener('click', function() {
                    const activityIndex = activities.findIndex(a => a.id === activity.id);
                    if (activityIndex !== -1) {
                        handleRegistration(this, activityIndex);
                    }
                });
            }
            
            log("成功添加新活动卡片");
            return true;
        } catch (error) {
            log("在指定容器中创建活动卡片出错:", error);
            return false;
        }
    }
    
    // 解析活动日期字符串为Date对象
    function parseActivityDate(dateString) {
        try {
            if (!dateString) return null;
            
            // 处理类似"2025年4月23日"格式的日期
            const match = dateString.match(/(\d+)年(\d+)月(\d+)日/);
            if (match) {
                const year = parseInt(match[1]);
                const month = parseInt(match[2]) - 1; // JS中月份从0开始
                const day = parseInt(match[3]);
                return new Date(year, month, day);
            }
            
            // 处理范围日期，取开始日期
            const rangeMatch = dateString.match(/(\d+)年(\d+)月(\d+)日\s*-\s*(\d+)月(\d+)日/);
            if (rangeMatch) {
                const year = parseInt(rangeMatch[1]);
                const month = parseInt(rangeMatch[2]) - 1;
                const day = parseInt(rangeMatch[3]);
                return new Date(year, month, day);
            }
            
            // 处理范围日期，取开始日期(年月日-年月日格式)
            const fullRangeMatch = dateString.match(/(\d+)年(\d+)月(\d+)日\s*-\s*(\d+)年(\d+)月(\d+)日/);
            if (fullRangeMatch) {
                const year = parseInt(fullRangeMatch[1]);
                const month = parseInt(fullRangeMatch[2]) - 1;
                const day = parseInt(fullRangeMatch[3]);
                return new Date(year, month, day);
            }
            
            // 其他日期格式，尝试直接解析
            return new Date(dateString);
        } catch (e) {
            log("解析日期出错:", e);
            return null;
        }
    }
    
    // 处理活动报名的函数
    function handleRegistration(button, index) {
        // 检查用户是否登录
        if (!isUserLoggedIn()) {
            if (confirm('报名活动需要先登录，是否前往登录页面？')) {
                window.location.href = 'login.html';
            }
            return;
        }
        
        // 获取当前活动数据
        const activity = activities[index];
        
        // 检查用户是否已报名该活动
        if (isUserRegistered(activity.id)) {
            alert(`您已经报名参加"${activity.title}"活动了！\n\n您可以在个人中心查看已报名的活动。`);
            return;
        }
        
        // 检查活动是否已满员
        if (activity.maxRegistrations !== null && activity.registered >= activity.maxRegistrations) {
            alert(`很抱歉，"${activity.title}"活动名额已满！\n\n请关注其他精彩活动。`);
            return;
        }
        
        // 确认报名
        if (confirm(`确认报名参加"${activity.title}"活动吗？`)) {
            // 更新用户数据
            registerUserForActivity(activity);
            
            // 更新UI显示
            const countDisplay = button.previousElementSibling;
            activity.registered++;
            const limitText = activity.maxRegistrations ? `/ 限${activity.maxRegistrations}人` : '/ 不限人数';
            countDisplay.innerHTML = `<i class="fas fa-users"></i> 已有${activity.registered}人报名 ${limitText}`;
            
            // 立即更新当前按钮状态
            button.textContent = '已报名';
            button.disabled = true;
            button.style.backgroundColor = '#888';
            button.style.cursor = 'default';
            
            // 更新所有相同活动ID的按钮状态
            updateAllButtonsWithSameActivityId(activity.id);
            
            // 获取预期积分值（活动完成后可获得的积分）
            let expectedPoints = 0;
            if (activity.title === "社区植树节活动") {
                expectedPoints = 100;
            } else if (activity.title === "二手物品交换集市") {
                expectedPoints = 30;
            } else {
                expectedPoints = activity.points || 50;
            }
            
            alert(`报名成功！\n\n您已成功报名参加"${activity.title}"活动。\n参加完活动后可获得 ${expectedPoints} 积分奖励！\n\n您可以在个人中心查看已报名的活动。`);
        }
    }
    
    // 更新所有相同活动ID的按钮状态
    function updateAllButtonsWithSameActivityId(activityId) {
        // 更新普通卡片中的报名按钮
        const activityCards = document.querySelectorAll(`.card[data-activity-id="${activityId}"]`);
        activityCards.forEach(card => {
            const registerBtn = card.querySelector('.register-btn');
            if (registerBtn) {
                registerBtn.textContent = '已报名';
                registerBtn.disabled = true;
                registerBtn.style.backgroundColor = '#888';
                registerBtn.style.cursor = 'default';
            }
        });
        
        // 如果是精选活动(ID=1)，更新精选活动区域的按钮
        if (activityId === 1 || activityId === '1') {
            const featuredBtn = document.querySelector('div[style*="background-image"] .btn.btn-primary');
            if (featuredBtn) {
                featuredBtn.textContent = '已报名';
                featuredBtn.disabled = true;
                featuredBtn.style.backgroundColor = '#888';
                featuredBtn.style.cursor = 'default';
            }
        }
    }
    
    // 更新存储中的活动数据
    function updateActivityInStorage(activity) {
        if (!activity || !activity.id) return;
        
        // 更新内置活动
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].id === activity.id) {
                activities[i] = { ...activities[i], ...activity };
                break;
            }
        }
        
        // 更新localStorage中的用户创建的活动
        const savedActivities = localStorage.getItem('userCreatedActivities');
        if (savedActivities) {
            let userActivities = JSON.parse(savedActivities);
            
            for (let i = 0; i < userActivities.length; i++) {
                if (userActivities[i].id === activity.id) {
                    userActivities[i] = { ...userActivities[i], ...activity };
                    localStorage.setItem('userCreatedActivities', JSON.stringify(userActivities));
                    break;
                }
            }
        }
    }
    
    // 页面加载时检查用户已报名的活动并更新UI
    function updateRegisteredActivitiesUI() {
        if (!userData.registeredActivities || userData.registeredActivities.length === 0) {
            return;
        }
        
        log("更新已报名活动UI，用户已报名:", userData.registeredActivities);
        
        // 查找所有活动卡片
        const allActivityCards = document.querySelectorAll('.card');
        allActivityCards.forEach(card => {
            const activityId = card.getAttribute('data-activity-id');
            if (!activityId) return;
            
            // 检查此卡片是否为用户已报名的活动
            if (userData.registeredActivities.includes(activityId)) {
                const registerBtn = card.querySelector('.register-btn');
                if (registerBtn) {
                    registerBtn.textContent = '已报名';
                    registerBtn.disabled = true;
                    registerBtn.style.backgroundColor = '#888';
                    registerBtn.style.cursor = 'default';
                }
            }
        });
        
        // 特别处理主图活动
        const featuredRegisterBtn = document.querySelector('div[style*="background-image"] .btn.btn-primary');
        if (featuredRegisterBtn && userData.registeredActivities.includes('1')) {
            featuredRegisterBtn.textContent = '已报名';
            featuredRegisterBtn.disabled = true;
            featuredRegisterBtn.style.backgroundColor = '#888';
            featuredRegisterBtn.style.cursor = 'default';
        }
    }
    
    // 为个人中心页面添加已报名活动数据
    function exportUserDataForProfilePage() {
        // 创建个人中心需要的数据结构
        const profileData = {
            registeredActivities: [],
            completedActivities: [],
            points: userData.points || 0
        };
        
        // 如果用户有报名的活动，填充数据
        if (userData.registeredActivities && userData.registeredActivities.length > 0) {
            // 获取所有活动数据
            const allActivities = [...activities];
            const savedActivities = localStorage.getItem('userCreatedActivities');
            if (savedActivities) {
                const userCreatedActivities = JSON.parse(savedActivities);
                allActivities.push(...userCreatedActivities);
            }
            
            // 找出用户报名的所有活动详情
            userData.registeredActivities.forEach(activityId => {
                const activity = allActivities.find(a => a.id == activityId);
                if (activity) {
                    // 查找活动记录以获取报名时间和完成状态
                    let registrationDate = '';
                    let completed = false;
                    let pointsEarned = false;
                    
                    if (userData.activities) {
                        const record = userData.activities.find(r => 
                            r.type === 'registration' && r.activityId == activityId
                        );
                        
                        if (record) {
                            registrationDate = record.date;
                            completed = record.completed || false;
                            pointsEarned = record.pointsEarned || false;
                        }
                    }
                    
                    const activityData = {
                        id: activity.id,
                        title: activity.title,
                        date: activity.date,
                        time: activity.time || '全天',
                        location: activity.location,
                        type: activity.type,
                        format: activity.format,
                        registrationDate: registrationDate,
                        completed: completed,
                        pointsEarned: pointsEarned,
                        points: activity.points || 50
                    };
                    
                    if (completed) {
                        profileData.completedActivities.push(activityData);
                    } else {
                        profileData.registeredActivities.push(activityData);
                    }
                }
            });
        }
        
        // 保存数据到localStorage以供个人中心页面使用
        localStorage.setItem('profileActivitiesData', JSON.stringify(profileData));
        log("为个人中心页面导出数据:", profileData);
    }
    
    // 初始化函数
    function initialize() {
        setupTabSwitching();
        setupActivityInteractions();
        setupModalInteractions();
        updateRegisteredActivitiesUI();
        exportUserDataForProfilePage();
        // 添加日历功能初始化
        setupCalendarFunctions();
        // 添加地图视图初始化
        setupMapFunctions();
    }
    
    // 执行初始化
    initialize();

    // 日历功能实现
    function setupCalendarFunctions() {
        console.log("设置日历功能");
        
        // 获取日历相关元素
        const calendarGrid = document.getElementById('calendar-grid');
        const yearSelect = document.getElementById('calendar-year');
        const monthSelect = document.getElementById('calendar-month');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        const currentMonthBtn = document.getElementById('current-month');
        const selectedDateTitle = document.getElementById('selected-date-title');
        const dayActivitiesContainer = document.getElementById('day-activities-container');
        const noActivityMessage = document.getElementById('no-activity-message');
        const exportDayActivityBtn = document.getElementById('export-day-activity');
        const createActivityLinkEmpty = document.getElementById('create-activity-link-empty');
        
        // 如果日历相关元素不存在，则直接返回
        if (!calendarGrid || !yearSelect || !monthSelect) {
            console.log("未找到日历相关元素，跳过日历初始化");
            return;
        }
        
        // 当前选中的日期
        let selectedDate = new Date();
        
        // 监听年份和月份选择变化
        yearSelect.addEventListener('change', renderCalendar);
        monthSelect.addEventListener('change', renderCalendar);
        
        // 上一个月和下一个月按钮
        prevMonthBtn.addEventListener('click', () => {
            const currentMonth = parseInt(monthSelect.value);
            if (currentMonth === 0) {
                monthSelect.value = "11";
                yearSelect.value = (parseInt(yearSelect.value) - 1).toString();
            } else {
                monthSelect.value = (currentMonth - 1).toString();
            }
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', () => {
            const currentMonth = parseInt(monthSelect.value);
            if (currentMonth === 11) {
                monthSelect.value = "0";
                yearSelect.value = (parseInt(yearSelect.value) + 1).toString();
            } else {
                monthSelect.value = (currentMonth + 1).toString();
            }
            renderCalendar();
        });
        
        // 返回今天按钮
        currentMonthBtn.addEventListener('click', () => {
            const today = new Date();
            yearSelect.value = today.getFullYear().toString();
            monthSelect.value = today.getMonth().toString();
            selectedDate = today;
            renderCalendar();
            showActivitiesForDate(today);
        });
        
        // 创建活动链接点击事件
        if (document.getElementById('create-activity-link')) {
            document.getElementById('create-activity-link').addEventListener('click', (e) => {
                e.preventDefault();
                openCreateModal();
            });
        }
        
        if (createActivityLinkEmpty) {
            createActivityLinkEmpty.addEventListener('click', (e) => {
                e.preventDefault();
                openCreateModal();
            });
        }
        
        // 导出当天活动
        if (exportDayActivityBtn) {
            exportDayActivityBtn.addEventListener('click', exportDayActivities);
        }
        
        // 渲染日历
        function renderCalendar() {
            if (!calendarGrid) return;
            
            calendarGrid.innerHTML = '';
            
            const year = parseInt(yearSelect.value);
            const month = parseInt(monthSelect.value);
            
            // 获取当月第一天和最后一天
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            
            // 获取当月第一天是星期几（0-6，0表示周日）
            const firstDayOfWeek = firstDay.getDay();
            
            // 创建上个月的日期单元格
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            for (let i = 0; i < firstDayOfWeek; i++) {
                const prevMonthDay = prevMonthLastDay - firstDayOfWeek + i + 1;
                const prevMonthDate = new Date(year, month - 1, prevMonthDay);
                createDateCell(prevMonthDate, true);
            }
            
            // 创建当月的日期单元格
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const currentDate = new Date(year, month, i);
                createDateCell(currentDate, false);
            }
            
            // 创建下个月的日期单元格
            const cellsCount = calendarGrid.children.length;
            const remainingCells = 42 - cellsCount; // 6行7列 = 42个单元格
            for (let i = 1; i <= remainingCells; i++) {
                const nextMonthDate = new Date(year, month + 1, i);
                createDateCell(nextMonthDate, true);
            }
            
            // 如果有选中的日期，显示该日期的活动
            showActivitiesForDate(selectedDate);
        }
        
        // 创建日期单元格
        function createDateCell(date, isOtherMonth) {
            if (!calendarGrid) return;
            
            const cell = document.createElement('div');
            cell.className = `date-cell card p-2 ${isOtherMonth ? 'other-month' : ''}`;
            
            // 检查是否为今天
            const today = new Date();
            if (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            ) {
                cell.classList.add('today');
            }
            
            // 检查是否为选中日期
            if (
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()
            ) {
                cell.classList.add('selected');
            }
            
            // 日期标题
            const dateHeader = document.createElement('div');
            dateHeader.className = 'd-flex justify-content-between align-items-center mb-2';
            
            const dateNum = document.createElement('span');
            dateNum.textContent = date.getDate();
            dateNum.style.fontWeight = 'bold';
            
            dateHeader.appendChild(dateNum);
            cell.appendChild(dateHeader);
            
            // 检查该日期是否有活动
            const activitiesForDate = getActivitiesForDate(date);
            
            if (activitiesForDate.length > 0) {
                cell.classList.add('has-activity');
                
                // 最多显示2个活动标签
                const maxDisplayTags = 2;
                for (let i = 0; i < Math.min(activitiesForDate.length, maxDisplayTags); i++) {
                    const activity = activitiesForDate[i];
                    const activityTag = document.createElement('div');
                    activityTag.className = 'activity-tag badge bg-primary mb-1 d-block text-truncate';
                    activityTag.style.fontSize = '0.8rem';
                    activityTag.textContent = activity.title;
                    cell.appendChild(activityTag);
                }
                
                // 如果有更多活动，显示+n
                if (activitiesForDate.length > maxDisplayTags) {
                    const moreTag = document.createElement('div');
                    moreTag.className = 'activity-tag badge bg-secondary mb-1 d-block';
                    moreTag.style.fontSize = '0.8rem';
                    moreTag.textContent = `+${activitiesForDate.length - maxDisplayTags}`;
                    cell.appendChild(moreTag);
                }
            }
            
            // 点击日期单元格
            cell.addEventListener('click', () => {
                // 移除之前选中的日期样式
                const selectedCells = calendarGrid.querySelectorAll('.date-cell.selected');
                selectedCells.forEach(selectedCell => {
                    selectedCell.classList.remove('selected');
                });
                
                // 添加当前选中的日期样式
                cell.classList.add('selected');
                
                // 更新选中的日期
            selectedDate = date;
            
            // 显示该日期的活动
            showActivitiesForDate(date);
        });
        
            calendarGrid.appendChild(cell);
        }
        
        // 获取指定日期的活动列表
        function getActivitiesForDate(date) {
            if (!activities) return [];
            
            return activities.filter(activity => {
                const activityDate = parseActivityDate(activity.date);
                return (
                    activityDate.getDate() === date.getDate() &&
                    activityDate.getMonth() === date.getMonth() &&
                    activityDate.getFullYear() === date.getFullYear()
                );
            });
        }
        
        // 显示指定日期的活动
        function showActivitiesForDate(date) {
            if (!dayActivitiesContainer || !selectedDateTitle || !noActivityMessage) return;
            
            // 更新选中日期标题
            const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            selectedDateTitle.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${weekdays[date.getDay()]}) 活动`;
            
            // 获取该日期的活动
            const activitiesForDate = getActivitiesForDate(date);
            
            // 清空活动容器
            dayActivitiesContainer.innerHTML = '';
            
            if (activitiesForDate.length > 0) {
                // 显示活动列表
                dayActivitiesContainer.style.display = 'block';
                noActivityMessage.style.display = 'none';
                
                // 创建活动卡片
                activitiesForDate.forEach(activity => {
                    const activityCard = document.createElement('div');
                    activityCard.className = 'activity-detail-card';
                    
                    activityCard.innerHTML = `
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="mb-0">${activity.title}</h5>
                            <span class="badge ${activity.format === '线上' ? 'bg-info' : 'bg-success'}">${activity.format}</span>
                        </div>
                        <div class="mb-2">
                            <i class="fas fa-tag me-1 text-muted"></i>
                            <span class="badge bg-secondary">${activity.type}</span>
                            ${activity.category ? `<span class="badge bg-primary ms-1">${activity.category}</span>` : ''}
                        </div>
                        <div class="d-flex justify-content-between text-muted mb-2">
                            <div><i class="fas fa-map-marker-alt me-1"></i> ${activity.location}</div>
                            <div><i class="fas fa-clock me-1"></i> ${activity.time || '全天'}</div>
                        </div>
                        <div class="d-flex justify-content-between text-muted mb-3">
                            <div><i class="fas fa-users me-1"></i> ${activity.currentParticipants}/${activity.maxParticipants} 人</div>
                            <div><i class="fas fa-star me-1 text-warning"></i> ${activity.points} 积分</div>
                        </div>
                        <p class="text-muted small mb-3">${activity.description}</p>
                        <div class="d-flex justify-content-between">
                            <div>
                                <span class="text-muted small">联系人：${activity.organizer || '环保社区'}</span>
                                ${activity.contact ? `<span class="text-muted small ms-3">电话：${activity.contact}</span>` : ''}
                            </div>
                            <div>
                                <button class="btn btn-sm btn-outline-primary register-btn" data-id="${activity.id}">
                                    <i class="fas fa-user-plus"></i> 报名参加
                                </button>
                            </div>
                        </div>
                    `;
                    
                    // 添加报名事件监听
                    const registerBtn = activityCard.querySelector('.register-btn');
                    if (registerBtn) {
                        registerBtn.addEventListener('click', function() {
                            registerForActivity(activity.id);
                        });
                    }
                    
                    dayActivitiesContainer.appendChild(activityCard);
                });
            } else {
                // 显示无活动消息
                dayActivitiesContainer.style.display = 'none';
                noActivityMessage.style.display = 'block';
            }
        }
        
        // 导出当天活动
        function exportDayActivities() {
            const activitiesForDate = getActivitiesForDate(selectedDate);
            if (activitiesForDate.length === 0) {
                alert('当前日期没有活动可导出！');
                return;
            }
            
            const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            const dateStr = `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日 (${weekdays[selectedDate.getDay()]})`;
            
            let exportContent = `绿色足迹 - ${dateStr}活动列表\n\n`;
            
            activitiesForDate.forEach((activity, index) => {
                exportContent += `${index + 1}. ${activity.title}\n`;
                exportContent += `   - 类型: ${activity.type} (${activity.format})\n`;
                exportContent += `   - 时间: ${activity.time || '全天'}\n`;
                exportContent += `   - 地点: ${activity.location}\n`;
                exportContent += `   - 人数: ${activity.currentParticipants}/${activity.maxParticipants}\n`;
                exportContent += `   - 积分: ${activity.points}\n`;
                exportContent += `   - 描述: ${activity.description}\n\n`;
            });
            
            // 创建下载链接
            const blob = new Blob([exportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `绿色足迹-${selectedDate.getFullYear()}${selectedDate.getMonth() + 1}${selectedDate.getDate()}-活动.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        // 初始渲染
        renderCalendar();
    }

    // 格式化日期字符串 (YYYY-MM-DD)
    function formatDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 设置地图视图功能
    function setupMapFunctions() {
        const mapTab = document.querySelector('.tab[data-view="map-view"]');
        if (!mapTab) return;

        // 切换到地图视图时触发
        mapTab.addEventListener('click', function() {
            initializeMap();
        });
        
        // 定位按钮功能
        const locationButton = document.querySelector('.btn .fa-location-arrow')?.closest('button');
        if (locationButton) {
            locationButton.addEventListener('click', function() {
                getUserLocation();
            });
        }
        
        // 筛选活动按钮
        const filterButton = document.querySelector('.btn .fa-filter')?.closest('button');
        if (filterButton) {
            filterButton.addEventListener('click', function() {
                showActivityFilters();
            });
        }
        
        // 距离排序按钮
        const sortButton = document.querySelector('.btn .fa-sort-amount-down')?.closest('button');
        if (sortButton) {
            sortButton.addEventListener('click', function() {
                sortActivitiesByDistance();
            });
        }
        
        // 报名参加按钮事件
        const registerButtons = document.querySelectorAll('#map-view .btn.btn-primary');
        registerButtons.forEach(button => {
            button.addEventListener('click', function() {
                const activityTitle = this.closest('.card').querySelector('h4').textContent;
                const activity = findActivityByTitle(activityTitle);
                if (activity) {
                    handleRegistration(this, activity.id);
                }
            });
        });
    }

    // 初始化地图
    function initializeMap() {
        // 这里可以集成第三方地图API，如高德地图、百度地图等
        log('地图视图已加载');
        
        // 模拟地图加载
        const mapContainer = document.querySelector('#map-view [style*="position: relative"]');
        if (mapContainer) {
            // 显示加载动画
            mapContainer.innerHTML += `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,0.8); padding: 20px; border-radius: 8px; text-align: center;">
                    <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 10px;"></i>
                    <div>地图加载中...</div>
                </div>
            `;
            
            // 模拟2秒后地图加载完成
            setTimeout(() => {
                mapContainer.querySelector('div[style*="position: absolute; top: 50%; left: 50%"]')?.remove();
                log('地图加载完成');
                
                // 此处可以添加真实地图API的初始化代码
                // 例如高德地图：
                /*
                var map = new AMap.Map('container', {
                    zoom: 11,
                    center: [121.4737, 31.2304]
                });
                */
            }, 2000);
        }
        
        // 加载附近活动列表
        loadNearbyActivities();
    }

        // 获取用户位置
    function getUserLocation() {
        if (navigator.geolocation) {
            const locationButton = document.querySelector('.btn .fa-location-arrow')?.closest('button');
            if (locationButton) {
                locationButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                locationButton.disabled = true;
            }
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                // 成功获取位置
                    log(`获取到用户位置：${position.coords.latitude}, ${position.coords.longitude}`);
                    
                    // 刷新地图和附近活动
                    loadNearbyActivities(position.coords);
                    
                    if (locationButton) {
                        locationButton.innerHTML = '<i class="fas fa-location-arrow"></i>';
                        locationButton.disabled = false;
                    }
                    
                    // 显示成功提示
                    showNotification('已更新为您附近的活动');
                },
                (error) => {
                    // 获取位置失败
                    log(`获取位置失败：${error.message}`);
                    
                    if (locationButton) {
                        locationButton.innerHTML = '<i class="fas fa-location-arrow"></i>';
                        locationButton.disabled = false;
                    }
                    
                    // 显示错误提示
                    showNotification('无法获取您的位置，请检查浏览器权限设置', 'error');
                }
            );
        } else {
            showNotification('您的浏览器不支持位置功能', 'error');
        }
    }

    // 加载附近活动
    function loadNearbyActivities(coords) {
        // 默认位置(上海市中心)
        const defaultCoords = {
            latitude: 31.2304,
            longitude: 121.4737
        };
        
        const userCoords = coords || defaultCoords;
        
        // 获取所有线下活动
        const offlineActivities = window.activities.filter(activity => 
            activity.format === '线下活动' || activity.format === '线下'
        );
        
        // 为每个活动随机生成距离（真实情况下应该根据经纬度计算）
        const activitiesWithDistance = offlineActivities.map(activity => {
            return {
                ...activity,
                // 生成0.5-10公里的随机距离
                distance: Math.round((Math.random() * 9.5 + 0.5) * 10) / 10
            };
        });
        
        // 按距离排序
        activitiesWithDistance.sort((a, b) => a.distance - b.distance);
        
        // 更新附近活动列表
        const nearbyContainer = document.querySelector('#map-view h3')?.nextElementSibling?.parentElement;
        if (nearbyContainer) {
            // 清空现有活动
            const existingCards = nearbyContainer.querySelectorAll('.card');
            existingCards.forEach(card => card.remove());
            
            // 添加附近活动
            activitiesWithDistance.slice(0, 5).forEach(activity => {
                const date = parseActivityDate(activity.date);
                
                // 创建活动卡片
                const activityCard = document.createElement('div');
                activityCard.className = 'card';
                activityCard.style = 'margin-bottom: 10px; padding: 15px;';
                activityCard.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 50px; height: 50px; background-color: var(--light-color); border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: var(--primary-color); font-weight: bold; margin-right: 15px;">
                                <div style="font-size: 1.2rem;">${date.getDate()}</div>
                                <div style="font-size: 0.7rem;">${date.getMonth() + 1}月</div>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 5px;">${activity.title}</h4>
                                <div style="color: var(--text-light); font-size: 0.9rem;">
                                    <i class="fas fa-map-marker-alt"></i> ${activity.location} · <span style="color: var(--primary-color);">${activity.distance}公里</span>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary register-btn" data-activity-id="${activity.id}" style="min-width: 100px;">
                            ${isUserRegistered(activity.id) ? '已报名' : '报名参加'}
                        </button>
                    </div>
                `;
                
                nearbyContainer.appendChild(activityCard);
                
                // 添加报名点击事件
                const registerBtn = activityCard.querySelector('.register-btn');
                if (registerBtn) {
                    registerBtn.addEventListener('click', function() {
                        handleRegistration(this, activity.id);
                    });
                }
            });
            
            // 添加"查看更多"按钮
            if (activitiesWithDistance.length > 5) {
                const showMoreButton = document.createElement('div');
                showMoreButton.style = 'text-align: center; margin-top: 20px;';
                showMoreButton.innerHTML = `
                    <button class="btn btn-secondary">查看更多附近活动</button>
                `;
                nearbyContainer.appendChild(showMoreButton);
                
                // 添加查看更多点击事件
                showMoreButton.querySelector('button').addEventListener('click', function() {
                    loadMoreNearbyActivities(activitiesWithDistance, nearbyContainer);
                });
            }
        }
    }

    // 加载更多附近活动
    function loadMoreNearbyActivities(activitiesWithDistance, container) {
        const existingCards = container.querySelectorAll('.card');
        const currentCount = existingCards.length;
        
        // 添加更多活动
        activitiesWithDistance.slice(currentCount, currentCount + 5).forEach(activity => {
            const date = parseActivityDate(activity.date);
            
            // 创建活动卡片
            const activityCard = document.createElement('div');
            activityCard.className = 'card';
            activityCard.style = 'margin-bottom: 10px; padding: 15px;';
            activityCard.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center;">
                        <div style="width: 50px; height: 50px; background-color: var(--light-color); border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: var(--primary-color); font-weight: bold; margin-right: 15px;">
                            <div style="font-size: 1.2rem;">${date.getDate()}</div>
                            <div style="font-size: 0.7rem;">${date.getMonth() + 1}月</div>
                        </div>
                        <div>
                            <h4 style="margin-bottom: 5px;">${activity.title}</h4>
                            <div style="color: var(--text-light); font-size: 0.9rem;">
                                <i class="fas fa-map-marker-alt"></i> ${activity.location} · <span style="color: var(--primary-color);">${activity.distance}公里</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary register-btn" data-activity-id="${activity.id}" style="min-width: 100px;">
                        ${isUserRegistered(activity.id) ? '已报名' : '报名参加'}
                    </button>
                </div>
            `;
            
            // 添加到"查看更多"按钮之前
            const showMoreButton = container.querySelector('div[style*="text-align: center"]');
            container.insertBefore(activityCard, showMoreButton);
            
            // 添加报名点击事件
            const registerBtn = activityCard.querySelector('.register-btn');
            if (registerBtn) {
                registerBtn.addEventListener('click', function() {
                    handleRegistration(this, activity.id);
                });
            }
        });
        
        // 如果已经显示了所有活动，隐藏"查看更多"按钮
        if (activitiesWithDistance.length <= container.querySelectorAll('.card').length) {
            container.querySelector('div[style*="text-align: center"]')?.remove();
        }
    }

    // 显示活动筛选器
    function showActivityFilters() {
        // 创建筛选模态框
        const filterModal = document.createElement('div');
        filterModal.className = 'modal';
        filterModal.style.display = 'flex';
        filterModal.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h3 class="modal-title">筛选地图活动</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div style="margin-bottom: 20px;">
                    <div class="form-group">
                        <label>活动类型</label>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                            <label style="display: flex; align-items: center; gap: 5px;">
                                <input type="checkbox" value="垃圾分类" checked> 垃圾分类
                            </label>
                            <label style="display: flex; align-items: center; gap: 5px;">
                                <input type="checkbox" value="植树造林" checked> 植树造林
                            </label>
                            <label style="display: flex; align-items: center; gap: 5px;">
                                <input type="checkbox" value="低碳出行" checked> 低碳出行
                            </label>
                            <label style="display: flex; align-items: center; gap: 5px;">
                                <input type="checkbox" value="资源回收" checked> 资源回收
                            </label>
                            <label style="display: flex; align-items: center; gap: 5px;">
                                <input type="checkbox" value="环保宣传" checked> 环保宣传
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>距离范围</label>
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                            <input type="range" min="1" max="50" value="10" id="distance-range" style="flex: 1;">
                            <span id="distance-value">10公里</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>活动日期</label>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <input type="date" class="form-input" style="flex: 1;">
                            <span style="line-height: 40px;">至</span>
                            <input type="date" class="form-input" style="flex: 1;">
                        </div>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary modal-close">取消</button>
                    <button type="button" class="btn btn-primary">应用筛选</button>
                </div>
            </div>
        `;
        
        // 添加到body
        document.body.appendChild(filterModal);
        
        // 添加距离滑块事件
        const distanceRange = filterModal.querySelector('#distance-range');
        const distanceValue = filterModal.querySelector('#distance-value');
        if (distanceRange && distanceValue) {
            distanceRange.addEventListener('input', function() {
                distanceValue.textContent = `${this.value}公里`;
            });
        }
        
        // 关闭按钮事件
        const closeButtons = filterModal.querySelectorAll('.modal-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterModal.remove();
            });
        });
        
        // 应用筛选按钮事件
        const applyButton = filterModal.querySelector('.btn.btn-primary');
        if (applyButton) {
            applyButton.addEventListener('click', function() {
                // 收集筛选条件
                const selectedTypes = Array.from(filterModal.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(checkbox => checkbox.value);
                const maxDistance = parseInt(distanceRange.value);
                const dateInputs = filterModal.querySelectorAll('input[type="date"]');
                const startDate = dateInputs[0].value ? new Date(dateInputs[0].value) : null;
                const endDate = dateInputs[1].value ? new Date(dateInputs[1].value) : null;
                
                // 应用筛选
                applyMapFilters(selectedTypes, maxDistance, startDate, endDate);
                
                // 关闭模态框
                filterModal.remove();
            });
        }
    }

    // 应用地图筛选
    function applyMapFilters(types, maxDistance, startDate, endDate) {
        // 获取所有线下活动
        const offlineActivities = window.activities.filter(activity => 
            activity.format === '线下活动' || activity.format === '线下'
        );
        
        // 应用筛选条件
        const filteredActivities = offlineActivities.filter(activity => {
            // 筛选类型
            if (types.length > 0 && !types.includes(activity.type)) {
                return false;
            }
            
            // 随机生成距离（真实情况下应该根据经纬度计算）
            const distance = Math.round((Math.random() * 20) * 10) / 10;
            
            // 筛选距离
            if (distance > maxDistance) {
                return false;
            }
            
            // 筛选日期
            const activityDate = parseActivityDate(activity.date);
            if (startDate && activityDate < startDate) {
                return false;
            }
            if (endDate && activityDate > endDate) {
                return false;
            }
            
            return true;
        }).map(activity => {
            return {
                ...activity,
                distance: Math.round((Math.random() * 9.5 + 0.5) * 10) / 10
            };
        });
        
        // 按距离排序
        filteredActivities.sort((a, b) => a.distance - b.distance);
        
        // 更新附近活动列表
        const nearbyContainer = document.querySelector('#map-view h3')?.nextElementSibling?.parentElement;
        if (nearbyContainer) {
            // 清空现有活动
            const existingCards = nearbyContainer.querySelectorAll('.card');
            existingCards.forEach(card => card.remove());
            
            if (filteredActivities.length === 0) {
                // 无匹配活动
                const noResultMsg = document.createElement('div');
                noResultMsg.style = 'text-align: center; padding: 30px 0; color: var(--text-light);';
                noResultMsg.innerHTML = `
                    <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 10px;"></i>
                    <p>没有找到符合条件的活动</p>
                    <button class="btn btn-secondary reset-filter-btn">重置筛选条件</button>
                `;
                nearbyContainer.appendChild(noResultMsg);
                
                // 添加重置筛选按钮事件
                noResultMsg.querySelector('.reset-filter-btn').addEventListener('click', function() {
                    loadNearbyActivities();
                });
            } else {
                // 添加筛选结果
                filteredActivities.slice(0, 5).forEach(activity => {
                    const date = parseActivityDate(activity.date);
                    
                    // 创建活动卡片
                    const activityCard = document.createElement('div');
                    activityCard.className = 'card';
                    activityCard.style = 'margin-bottom: 10px; padding: 15px;';
                    activityCard.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div style="display: flex; align-items: center;">
                                <div style="width: 50px; height: 50px; background-color: var(--light-color); border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: var(--primary-color); font-weight: bold; margin-right: 15px;">
                                    <div style="font-size: 1.2rem;">${date.getDate()}</div>
                                    <div style="font-size: 0.7rem;">${date.getMonth() + 1}月</div>
                                </div>
                                <div>
                                    <h4 style="margin-bottom: 5px;">${activity.title}</h4>
                                    <div style="color: var(--text-light); font-size: 0.9rem;">
                                        <i class="fas fa-map-marker-alt"></i> ${activity.location} · <span style="color: var(--primary-color);">${activity.distance}公里</span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary register-btn" data-activity-id="${activity.id}" style="min-width: 100px;">
                                ${isUserRegistered(activity.id) ? '已报名' : '报名参加'}
                            </button>
                        </div>
                    `;
                    
                    nearbyContainer.appendChild(activityCard);
                    
                    // 添加报名点击事件
                    const registerBtn = activityCard.querySelector('.register-btn');
                    if (registerBtn) {
                        registerBtn.addEventListener('click', function() {
                            handleRegistration(this, activity.id);
                        });
                    }
                });
                
                // 添加"查看更多"按钮
                if (filteredActivities.length > 5) {
                    const showMoreButton = document.createElement('div');
                    showMoreButton.style = 'text-align: center; margin-top: 20px;';
                    showMoreButton.innerHTML = `
                        <button class="btn btn-secondary">查看更多附近活动</button>
                    `;
                    nearbyContainer.appendChild(showMoreButton);
                    
                    // 添加查看更多点击事件
                    showMoreButton.querySelector('button').addEventListener('click', function() {
                        loadMoreNearbyActivities(filteredActivities, nearbyContainer);
                    });
                }
            }
        }
        
        // 显示筛选结果提示
        showNotification(`已筛选出 ${filteredActivities.length} 个符合条件的活动`);
    }

    // 按距离排序活动
    function sortActivitiesByDistance() {
        // 获取附近活动列表容器
        const nearbyContainer = document.querySelector('#map-view h3')?.nextElementSibling?.parentElement;
        if (!nearbyContainer) return;
        
        // 获取所有活动卡片
        const activityCards = Array.from(nearbyContainer.querySelectorAll('.card'));
        if (activityCards.length === 0) return;
        
        // 获取排序按钮
        const sortButton = document.querySelector('.btn .fa-sort-amount-down')?.closest('button');
        const isDescending = sortButton?.innerHTML.includes('fa-sort-amount-down');
        
        // 收集活动信息并排序
        const activitiesWithDistance = activityCards.map(card => {
            const distanceText = card.querySelector('span[style*="color: var(--primary-color)"]')?.textContent || '0公里';
            const distance = parseFloat(distanceText.replace('公里', ''));
            return {
                card: card,
                distance: distance
            };
        });
        
        // 排序活动
        if (isDescending) {
            // 从远到近
            activitiesWithDistance.sort((a, b) => b.distance - a.distance);
            if (sortButton) {
                sortButton.innerHTML = '<i class="fas fa-sort-amount-up"></i> 距离排序';
            }
            } else {
            // 从近到远
            activitiesWithDistance.sort((a, b) => a.distance - b.distance);
            if (sortButton) {
                sortButton.innerHTML = '<i class="fas fa-sort-amount-down"></i> 距离排序';
            }
        }
        
        // 更新DOM顺序
        activitiesWithDistance.forEach(item => {
            nearbyContainer.appendChild(item.card);
        });
        
        // 将"查看更多"按钮移到最后
        const showMoreButton = nearbyContainer.querySelector('div[style*="text-align: center"]');
        if (showMoreButton) {
            nearbyContainer.appendChild(showMoreButton);
        }
        
        // 显示排序提示
        showNotification(`已按距离${isDescending ? '从远到近' : '从近到远'}排序`);
    }

    // 查找活动通过标题
    function findActivityByTitle(title) {
        return window.activities.find(activity => activity.title === title);
    }

    // 显示通知
    function showNotification(message, type = 'success') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.style = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: ${type === 'success' ? 'var(--primary-color)' : 'var(--error-color)'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
            max-width: 300px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <div>${message}</div>
            </div>
        `;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // 添加到body
        document.body.appendChild(notification);
        
        // 3秒后移除
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}); 