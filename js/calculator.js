/**
 * calculator.js - 碳排放计算器功能实现
 * 该文件负责处理碳排放计算器的所有交互和计算逻辑
 */

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化计算器功能
    initCalculator();
});

/**
 * 初始化计算器的所有功能
 */
function initCalculator() {
    // 切换选项卡功能
    setupTabSwitching();
    
    // 初始化所有滑块的数值显示
    initSliders();
    
    // 绑定计算按钮事件
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateEmissions);
    }
    
    // 绑定重置按钮事件
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCalculator);
    }
    
    // 绑定重新计算按钮事件
    const recalculateBtn = document.getElementById('recalculate-btn');
    if (recalculateBtn) {
        recalculateBtn.addEventListener('click', function() {
            // 隐藏结果区域，显示输入表单
            document.querySelector('.results-section').style.display = 'none';
            document.querySelector('.category-tabs').style.display = 'flex';
            document.querySelectorAll('.category-content').forEach(tab => {
                if (tab.classList.contains('active')) {
                    tab.style.display = 'block';
                }
            });
            document.querySelector('.action-buttons').style.display = 'flex';
            
            // 更新进度步骤
            updateSteps(1);
        });
    }
    
    // 绑定分享和导出按钮事件
    setupActionButtons();
}

/**
 * 设置选项卡切换功能
 */
function setupTabSwitching() {
    // 获取所有分类标签
    const tabs = document.querySelectorAll('.category-tabs .tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 获取目标内容ID
            const targetId = this.getAttribute('data-category');
            if (!targetId) return; // 如果没有data-category属性则跳过
            
            // 移除所有标签的活动状态
            tabs.forEach(t => {
                t.classList.remove('active');
            });
            
            // 隐藏所有内容
            const contents = document.querySelectorAll('.category-content');
            contents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // 设置当前标签为活动状态
            this.classList.add('active');
            
            // 显示对应内容
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
            }
        });
    });
}

/**
 * 初始化所有滑块的数值显示
 */
function initSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling;
        if (valueDisplay && valueDisplay.classList.contains('slider-value')) {
            // 设置初始值
            valueDisplay.textContent = slider.value + getSliderUnit(slider.id);
            
            // 添加事件监听器
            slider.addEventListener('input', function() {
                valueDisplay.textContent = this.value + getSliderUnit(this.id);
            });
        }
    });
}

/**
 * 获取滑块的单位
 * @param {string} sliderId - 滑块的ID
 * @returns {string} 对应的单位
 */
function getSliderUnit(sliderId) {
    const units = {
        'electricity-usage': ' kWh/月',
        'gas-usage': ' m³/月',
        'water-usage': ' m³/月',
        'car-usage': ' km/周',
        'public-transport': ' 次/周',
        'flight': ' km/年',
        'food-waste': ' kg/周',
        'local-food': ' %',
        'new-clothes': ' 件/年',
        'electronics': ' 件/年'
    };
    
    return units[sliderId] || '';
}

/**
 * 更新步骤指示器
 * @param {number} stepNumber - 当前步骤编号(1-4)
 */
function updateSteps(stepNumber) {
    const steps = document.querySelectorAll('.calculator-steps .step');
    
    steps.forEach((step, index) => {
        if (index + 1 <= stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

/**
 * 计算碳排放量
 */
function calculateEmissions() {
    // 更新步骤指示器
    updateSteps(2);
    
    // 获取家庭能源输入值
    const electricityUsage = parseFloat(document.getElementById('electricity-usage').value) || 0;
    const gasUsage = parseFloat(document.getElementById('gas-usage').value) || 0;
    const waterUsage = parseFloat(document.getElementById('water-usage').value) || 0;
    const renewableEnergy = document.getElementById('renewable-energy').checked;
    const energyEfficient = document.getElementById('energy-efficient').checked;
    
    // 获取交通出行输入值
    const carUsage = parseFloat(document.getElementById('car-usage').value) || 0;
    const publicTransport = parseFloat(document.getElementById('public-transport').value) || 0;
    const flight = parseFloat(document.getElementById('flight').value) || 0;
    const electricVehicle = document.getElementById('electric-vehicle').checked;
    const carpooling = document.getElementById('carpooling').checked;
    
    // 获取饮食习惯输入值
    let meatConsumption = 0;
    if (document.getElementById('meat-daily').checked) meatConsumption = 7;
    else if (document.getElementById('meat-weekly').checked) meatConsumption = 3;
    else if (document.getElementById('meat-monthly').checked) meatConsumption = 0.5;
    
    const foodWaste = parseFloat(document.getElementById('food-waste').value) || 0;
    const localFood = parseFloat(document.getElementById('local-food').value) || 0;
    const organicFood = document.getElementById('organic-food').checked;
    
    // 获取消费习惯输入值
    const newClothes = parseFloat(document.getElementById('new-clothes').value) || 0;
    const electronics = parseFloat(document.getElementById('electronics').value) || 0;
    
    let recyclingValue = 0;
    if (document.getElementById('recycling-always').checked) recyclingValue = 80;
    else if (document.getElementById('recycling-sometimes').checked) recyclingValue = 40;
    else if (document.getElementById('recycling-never').checked) recyclingValue = 0;
    
    const secondHand = document.getElementById('second-hand').checked;
    
    // 计算各类别的碳排放量
    const homeEnergyEmissions = calculateHomeEnergyEmissions(electricityUsage, gasUsage, waterUsage, renewableEnergy, energyEfficient);
    const transportEmissions = calculateTransportEmissions(carUsage, publicTransport, flight, electricVehicle, carpooling);
    const foodEmissions = calculateFoodEmissions(meatConsumption, 0, foodWaste, localFood, organicFood);
    const consumptionEmissions = calculateConsumptionEmissions(newClothes, electronics, recyclingValue, secondHand);
    
    // 计算总排放量
    const totalEmissions = homeEnergyEmissions + transportEmissions + foodEmissions + consumptionEmissions;
    
    // 更新结果显示
    updateResults(totalEmissions, homeEnergyEmissions, transportEmissions, foodEmissions, consumptionEmissions);
    
    // 显示结果区域，隐藏输入表单
    document.querySelector('.results-section').style.display = 'block';
    document.querySelector('.calculator-container').style.display = 'none';
    document.querySelector('.category-tabs').style.display = 'none';
    
    // 更新步骤指示器
    updateSteps(3);
    
    // 滚动到结果区域
    document.querySelector('.results-section').scrollIntoView({ behavior: 'smooth' });
    
    return false; // 防止表单提交
}

/**
 * 计算家庭能源碳排放量
 */
function calculateHomeEnergyEmissions(electricity, gas, water, renewable, efficient) {
    // 电力排放系数 (kgCO2/kWh)
    let electricityFactor = 0.5;  // 中国平均电网排放系数
    
    // 如果使用可再生能源，降低排放系数
    if (renewable) {
        electricityFactor *= 0.6;  // 减少40%的电力排放
    }
    
    // 如果使用节能电器，降低用电量
    let electricityUsage = electricity;
    if (efficient) {
        electricityUsage *= 0.8;  // 减少20%的电力使用
    }
    
    // 计算电力排放 (kg CO2)
    const electricityEmissions = electricityUsage * electricityFactor * 12;  // 年排放量
    
    // 天然气排放系数 (kgCO2/m³)
    const gasFactor = 2.0;
    
    // 计算天然气排放 (kg CO2)
    const gasEmissions = gas * gasFactor * 12;  // 年排放量
    
    // 水的排放系数 (kgCO2/m³)
    const waterFactor = 0.3;
    
    // 计算水的排放 (kg CO2)
    const waterEmissions = water * waterFactor * 12;  // 年排放量
    
    // 返回总的家庭能源排放量 (转换为吨)
    return (electricityEmissions + gasEmissions + waterEmissions) / 1000;
}

/**
 * 计算交通碳排放量
 */
function calculateTransportEmissions(driving, publicTransport, flights, electricVehicle, carpool) {
    // 驾驶排放系数 (kgCO2/km)
    let drivingFactor = 0.2;  // 普通汽油车
    
    // 如果使用电动车，降低排放系数
    if (electricVehicle) {
        drivingFactor = 0.07;  // 电动车排放因子更低
    }
    
    // 如果拼车，降低排放
    if (carpool) {
        drivingFactor *= 0.6;  // 拼车减少40%的排放
    }
    
    // 计算驾驶排放 (kg CO2)
    const drivingEmissions = driving * drivingFactor * 52;  // 年排放量
    
    // 公共交通排放系数 (kgCO2/次)
    const publicTransportFactor = 1.5;
    
    // 计算公共交通排放 (kg CO2)
    const publicTransportEmissions = publicTransport * publicTransportFactor * 52;  // 年排放量
    
    // 飞行排放系数 (kgCO2/km)
    const flightFactor = 0.1;  // 航班排放系数
    
    // 计算飞行排放 (kg CO2)
    const flightEmissions = flights * flightFactor;  // 年排放量
    
    // 返回总的交通排放量 (转换为吨)
    return (drivingEmissions + publicTransportEmissions + flightEmissions) / 1000;
}

/**
 * 计算食物碳排放量
 */
function calculateFoodEmissions(meat, dairy, waste, local, organic) {
    // 肉类消费排放系数 (kgCO2/次)
    const meatFactor = 5.0;
    
    // 计算肉类排放 (kg CO2)
    const meatEmissions = meat * meatFactor * 52;  // 年排放量
    
    // 乳制品消费排放系数 (kgCO2/次)
    const dairyFactor = 2.0;
    
    // 计算乳制品排放 (kg CO2)
    const dairyEmissions = dairy * dairyFactor * 52;  // 年排放量
    
    // 基础食物排放 (kg CO2) - 除肉类和乳制品外的食物
    let baseFoodEmissions = 500;  // 年排放量
    
    // 食物浪费增加的排放
    const wasteEmissions = baseFoodEmissions * (waste / 5);
    
    // 当地食物减少的排放 (运输减少)
    const localFoodReduction = (meatEmissions + dairyEmissions + baseFoodEmissions) * (local / 100) * 0.1;
    
    // 有机食物减少的排放
    let organicReduction = 0;
    if (organic) {
        organicReduction = (meatEmissions + dairyEmissions + baseFoodEmissions) * 0.05;  // 减少5%的排放
    }
    
    // 返回总的食物排放量 (转换为吨)
    return (meatEmissions + dairyEmissions + baseFoodEmissions + wasteEmissions - localFoodReduction - organicReduction) / 1000;
}

/**
 * 计算消费碳排放量
 */
function calculateConsumptionEmissions(clothing, electronics, recycling, secondHand) {
    // 服装购买排放系数 (kgCO2/件)
    let clothingFactor = 20;
    
    // 如果购买二手商品，降低服装排放
    if (secondHand) {
        clothingFactor *= 0.3;  // 二手服装减少70%的排放
    }
    
    // 计算服装排放 (kg CO2)
    const clothingEmissions = clothing * clothingFactor;  // 年排放量
    
    // 电子产品购买排放系数 (kgCO2/件)
    const electronicsFactor = 100;
    
    // 计算电子产品排放 (kg CO2)
    const electronicsEmissions = electronics * electronicsFactor;  // 年排放量
    
    // 基础消费排放 (kg CO2) - 其他消费品
    const baseConsumptionEmissions = 500;  // 年排放量
    
    // 回收减少的排放
    const recyclingReduction = (clothingEmissions + electronicsEmissions + baseConsumptionEmissions) * (recycling / 100) * 0.2;
    
    // 返回总的消费排放量 (转换为吨)
    return (clothingEmissions + electronicsEmissions + baseConsumptionEmissions - recyclingReduction) / 1000;
}

/**
 * 更新结果显示
 */
function updateResults(total, homeEnergy, transport, food, consumption) {
    // 更新总排放量
    document.getElementById('total-emission-value').textContent = total.toFixed(2);
    
    // 计算与中国平均水平的比较 (假设中国人均年碳排放约为5吨)
    const averageEmission = 5;
    const percentage = ((total - averageEmission) / averageEmission * 100).toFixed(0);
    
    const percentageElement = document.getElementById('percentage-value');
    if (percentageElement) {
        if (total > averageEmission) {
            percentageElement.textContent = `高于中国平均水平 ${Math.abs(percentage)}%`;
            percentageElement.style.color = '#e53935';
        } else {
            percentageElement.textContent = `低于中国平均水平 ${Math.abs(percentage)}%`;
            percentageElement.style.color = '#43a047';
        }
    }
    
    // 更新排放分布图表
    updateEmissionChart(homeEnergy, transport, food, consumption);
    
    // 更新等效指标
    updateEquivalentMetrics(total);
    
    // 生成减排建议
    generateReductionSuggestions(homeEnergy, transport, food, consumption);
    
    // 更新步骤指示器，进入第4步
    updateSteps(4);
}

/**
 * 更新排放分布图表
 */
function updateEmissionChart(homeEnergy, transport, food, consumption) {
    const ctx = document.getElementById('emission-chart');
    
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    // 如果已存在图表，销毁它
    if (window.emissionChart) {
        window.emissionChart.destroy();
    }
    
    window.emissionChart = new Chart(context, {
        type: 'doughnut',
        data: {
            labels: ['家庭能源', '交通出行', '饮食习惯', '消费习惯'],
            datasets: [{
                data: [homeEnergy, transport, food, consumption],
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#FF9800',
                    '#9C27B0'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

/**
 * 更新等效指标
 */
function updateEquivalentMetrics(totalEmissions) {
    // 更新植树数量 (一棵树每年大约吸收21kg二氧化碳)
    const treesNeeded = Math.round(totalEmissions * 1000 / 21);
    const treesElement = document.getElementById('trees-value');
    if (treesElement) {
        treesElement.textContent = treesNeeded;
    }
    
    // 更新等效驾驶距离 (普通汽车每公里排放约0.2kg二氧化碳)
    const drivingDistance = Math.round(totalEmissions * 1000 / 0.2);
    const drivingElement = document.getElementById('driving-value');
    if (drivingElement) {
        drivingElement.textContent = drivingDistance;
    }
    
    // 更新等效家庭用电量 (假设中国平均电网排放系数为0.5kg/kWh)
    const electricityUsage = Math.round(totalEmissions * 1000 / 0.5);
    const energyElement = document.getElementById('energy-value');
    if (energyElement) {
        energyElement.textContent = electricityUsage;
    }
}

/**
 * 生成减排建议
 */
function generateReductionSuggestions(homeEnergy, transport, food, consumption) {
    const suggestionsList = document.getElementById('suggestions-list');
    if (!suggestionsList) return;
    
    suggestionsList.innerHTML = '';  // 清空现有建议
    
    const suggestions = [];
    
    // 根据各类别排放量添加相应建议
    if (homeEnergy > 1.5) {
        suggestions.push('安装太阳能板或购买绿色电力，减少非可再生能源的使用');
        suggestions.push('更换LED灯泡和高能效电器，可以减少20-30%的家庭能源消耗');
        suggestions.push('冬季将暖气温度调低1-2度，夏季将空调温度调高1-2度');
    }
    
    if (transport > 2) {
        suggestions.push('尽可能使用公共交通工具代替私家车出行');
        suggestions.push('考虑购买电动汽车或混合动力汽车');
        suggestions.push('减少飞行次数，尤其是长途飞行');
        suggestions.push('采用拼车服务减少单人驾驶的次数');
    }
    
    if (food > 1.8) {
        suggestions.push('减少肉类特别是牛肉的摄入，尝试素食一周一次');
        suggestions.push('购买当地生产的季节性食品，减少运输产生的排放');
        suggestions.push('减少食物浪费，合理规划餐食');
        suggestions.push('选择有机食品，减少与农药和化肥生产相关的排放');
    }
    
    if (consumption > 1.2) {
        suggestions.push('延长电子产品的使用寿命，减少不必要的更换');
        suggestions.push('购买二手商品或参与物品共享');
        suggestions.push('提高回收率，确保废弃物得到适当处理');
        suggestions.push('选择环保、耐用的产品，避免一次性消费品');
    }
    
    // 如果没有特定建议，添加一些通用建议
    if (suggestions.length === 0) {
        suggestions.push('继续保持低碳生活方式，您的碳足迹已经很低了');
        suggestions.push('与朋友和家人分享您的低碳生活经验');
        suggestions.push('参与社区环保活动，扩大您的影响力');
    }
    
    // 将建议添加到列表中
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
}

/**
 * 设置行动按钮事件
 */
function setupActionButtons() {
    // 分享结果按钮
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const totalEmission = document.getElementById('total-emission-value').textContent;
            const shareText = `我使用低碳生活平台的碳排放计算器计算了我的年度碳足迹，结果是${totalEmission}吨二氧化碳当量。你也来试试吧！`;
            
            // 如果有Web Share API，使用它
            if (navigator.share) {
                navigator.share({
                    title: '我的碳足迹计算结果',
                    text: shareText,
                    url: window.location.href
                }).catch(err => {
                    alert('分享失败，请手动分享。');
                });
            } else {
                // 否则复制到剪贴板
                const tempInput = document.createElement('textarea');
                tempInput.value = shareText;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                alert('结果已复制到剪贴板，您可以粘贴到社交媒体分享。');
            }
        });
    }
    
    // 导出PDF按钮
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('PDF导出功能正在开发中，敬请期待！');
            // 实际项目中可以使用jsPDF等库实现PDF导出
        });
    }
}

/**
 * 重置计算器
 */
function resetCalculator() {
    // 重置所有滑块
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        slider.value = slider.min;
        const valueDisplay = slider.nextElementSibling;
        if (valueDisplay && valueDisplay.classList.contains('slider-value')) {
            valueDisplay.textContent = slider.min + getSliderUnit(slider.id);
        }
    });
    
    // 重置所有复选框
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // 重置所有单选框
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        if (radio.id === 'meat-weekly' || radio.id === 'recycling-sometimes') {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });
    
    // 重置步骤指示器
    updateSteps(1);
} 