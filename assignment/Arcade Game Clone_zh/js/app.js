/********************************************
 *                                          *
 *                  Enemy                   *
 *                                          *
 ********************************************/
// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.orig = x;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + dt * this.speed;
    if (this.x >= WIDTH_GAME_ZONE_CANVAS) {
        this.x = this.orig;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/********************************************
 *                                          *
 *                  Player                  *
 *                                          *
 ********************************************/
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(role) {
    this.role = role;
    this.reset();
}

Player.prototype.update = function() {
}

Player.prototype.reset = function() {
    var origRect = getRectByBlockPos(POS_DEFAULT_PLAYER);
    this.x = origRect.x;
    this.y = origRect.y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.role), this.x, this.y, WIDTH_PLAYER, HEIGHT_PLAYER);
}

Player.prototype.playMoveSound = function() {
    var audio = new Audio('sounds/move.wav');
    audio.play();
}

Player.prototype.handleInput = function(key) {
    if (key === "up") {
        // if player go to the first row, that is water block, means fall into water, should consume one life
        if (this.y > HEIGHT_BLOCK) {
            this.y -= HEIGHT_BLOCK;
            currentStep++;
        }
        this.playMoveSound();
    } else if (key === "down") {
        // The invsisible part should be ignored, and the invisible part height is 50px
        if (this.y < HEIGHT_GAME_ZONE_CANVAS - HEIGHT_PIC - 50) {
            this.y += HEIGHT_BLOCK;
            currentStep++;
        }
        this.playMoveSound();
    } else if (key === "left") {
        // Keep in mind the player's width is less than the one of block
        if (this.x > (WIDTH_BLOCK - WIDTH_PLAYER) / 2) {
            this.x -= WIDTH_BLOCK;
            currentStep++;
        }
        this.playMoveSound();
    } else if (key === "right") {
        // Although the player's width is smaller, it's OK to just use width of block
        if (this.x < WIDTH_GAME_ZONE_CANVAS - WIDTH_BLOCK) {
            this.x += WIDTH_BLOCK;
            currentStep++;
        }
        this.playMoveSound();
    }
}

/********************************************
 *                                          *
 *                RolePanel                 *
 *                                          *
 ********************************************/
var RolePanel = function(roles) {
    this.roles = roles;
    this.selectedIndex = 0;
};

RolePanel.prototype.update = function(index) {
    this.selectedIndex = index;
}

RolePanel.prototype.render = function() {
    var index = 0;
    var selectedIndex = this.selectedIndex;
    ctx.clearRect(X_ROLE_PANEL, Y_ROLE_PANEL + 30, WIDTH_ROLE_PANEL, 300);
    this.roles.forEach(function(role) {
        // console.log(role);
        var x = index * WIDTH_PIC;
        var y = Y_ROLE_PANEL + 50; // 50 is height of transparent part
        var starX = x + (WIDTH_PIC - WIDTH_STAR) / 2;
        var starY = Y_ROLE_PANEL + HEIGHT_PLAYER - 10; // 10 is the bias
        ctx.drawImage(Resources.get(role), x, Y_ROLE_PANEL);
        if (selectedIndex === index) {
            ctx.drawImage(Resources.get("images/Selector.png"), x, y);
        } else {
            ctx.drawImage(Resources.get("images/Star.png"), starX, starY, WIDTH_STAR, HEIGHT_STAR);
        }
        index++;
    });

    // TODO: draw life should be moved out of here later
    var iconX = WIDTH_GAME_ZONE_CANVAS / 2 - (WIDTH_COVER_LIFE_ICON + WIDTH_COVER_LIFE_NUM) / 2;
    var iconY = Y_ROLE_PANEL + HEIGHT_PIC + HEIGHT_STAR;
    var numX = iconX + WIDTH_COVER_LIFE_ICON + 20;
    var numY = iconY + 35; // depend on the font size, here the font size is 20px
    ctx.drawImage(Resources.get("images/Heart.png"), iconX/*222*/, iconY/*350*/, WIDTH_COVER_LIFE_ICON, HEIGHT_COVER_LIFE_ICON);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "20px Comic Sans MS";
    ctx.fillText("X " + VALUE_DEFAULT_LIFE, numX, numY, WIDTH_COVER_LIFE_NUM, HEIGHT_COVER_LIFE_NUM);
}

RolePanel.prototype.handleInput = function(key) {
    if (key === "left") {
        if (this.selectedIndex === 0) {
            this.selectedIndex = this.roles.length - 1;
        } else {
            this.selectedIndex--;
        }
    } else if (key === "right") {
        if (this.selectedIndex === this.roles.length - 1) {
            this.selectedIndex = 0;
        } else {
            this.selectedIndex++;
        }
    }
}


/********************************************
 *                                          *
 *                HeadPanel                 *
 *                                          *
 ********************************************/
var HeadPanel = function() {
    this.reset();
    this.resetButtonRect = new Rect(404, 20, 100, 25);
};

HeadPanel.prototype.update = function(key, value) {
    if (gameMode === GAME_MODE_NORMAL) {     
        this.time++;
    } else {
        // Speed Mode
        if (this.time > 0) {
            this.time--;
        } else {
            // finish
            var callbacks = this.teardownCallbacks;
            callbacks.forEach(function(func) {
                func();
                callbacks.splice(callbacks.indexOf(func), 1);
            });
        }
    }
}

HeadPanel.prototype.reset = function() {
    if (gameMode === GAME_MODE_SPEED) {
        this.time = MAX_GAME_TIME;
        this.teardownCallbacks = [];
    } else {
        this.time = 0;
    }
}

HeadPanel.prototype.onTeardown = function(func) {
    this.teardownCallbacks.push(func);
}

HeadPanel.prototype.getResetBtnRect = function() {
    return this.resetButtonRect;
}

HeadPanel.prototype.render = function() {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "25px Comic Sans MS";

    var time = formatTime(Math.floor(this.time / 60));
    var timeText = `Time: ${time}`;
    // console.log("time: " + timeText);
    ctx.fillText(`Time: ${time}`, 100, 40);
    // ctx.fillText(formatTime(Math.floor(this.time / 60)), 70, 60);
    
    ctx.strokeRect(this.resetButtonRect.x, this.resetButtonRect.y, this.resetButtonRect.width, this.resetButtonRect.height);
    ctx.fillText("Reset", this.resetButtonRect.x + 50, this.resetButtonRect.y + 20);

}

function PreFixInterge(num,n){  
  return (Array(n).join(0)+num).slice(-n);  
}  

function formatTime(time) {
    var hour = PreFixInterge(Math.floor(time / 3600), 2);
    var minute = PreFixInterge(Math.floor(time % 3600 / 60), 2);
    var second = PreFixInterge(Math.floor(time % 60), 2);
    var formatedValue = `${hour}:${minute}:${second}`;
    return formatedValue;
}

/********************************************
 *                                          *
 *                 Side Panel               *
 *                                          *
 ********************************************/
var SidePanel = function() {
    this.reset();
};

SidePanel.prototype.getValueById = function(id) {
    var value;
    console.log("getValueById " +id);
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
            value = this.items[i].value;
            break;
        }
    }
    return value;
}

SidePanel.prototype.getRewardsCount = function() {
    var totalCount = 0;
    this.items.forEach(function(item) {
        totalCount += item.value;
    });

    return totalCount;
}

SidePanel.prototype.reset = function() {
    this.items = [
        {
            'id': ID_LIFE,
            'value': VALUE_DEFAULT_LIFE
        },
        {
            'id': ID_KEY,
            'value': VALUE_DEFAULT_KEY
        },
        {
            'id': ID_ROCK,
            'value': VALUE_DEFAULT_ROCK
        },
        {
            'id': ID_GEM_BLUE,
            'value': VALUE_DEFAULT_GEM_BLUE
        },
        {
            'id': ID_GEM_GREEN,
            'value': VALUE_DEFAULT_GEM_GREEN
        },
        {
            'id': ID_GEM_ORANGE,
            'value': VALUE_DEFAULT_GEM_ORANGE
        }
    ];
}

SidePanel.prototype.update = function(id, value) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
            this.items[i].value = value;
            break;
        }
    }
}

SidePanel.prototype.render = function() {
    for (var i = 0; i < this.items.length; i++) {
        ctx2.drawImage(Resources.get("images/grass-block.png"), X_SIDE_PANEL, Y_SIDE_PANEL + i * HEIGHT_BLOCK);
        var iconX = X_SIDE_PANEL + (WIDTH_SIDE_PANEL - WIDTH_COVER_LIFE_ICON) / 2;
        var iconY = Y_SIDE_PANEL + i * HEIGHT_BLOCK + 35; // 35 is a bias
        ctx2.drawImage(Resources.get(RewardTypes.getIconById(this.items[i].id)), iconX, iconY, WIDTH_SIDE_PANEL_ICON, HEIGHT_SIDE_PANEL_ICON);

        ctx2.fillStyle = "black";
        ctx2.font = "25px Comic Sans MS";
        ctx2.textAlign = "center";
        ctx2.fillText("X " + this.items[i].value, iconX + 20, iconY + HEIGHT_SIDE_PANEL_ICON + 20, WIDTH_SIDE_PANEL_ICON, HEIGHT_SIDE_PANEL_ICON);
    }
}

/********************************************
 *                                          *
 *                  Reward                  *
 *                                          *
 ********************************************/
var Reward = function(step) {
    this.typeId = getRandomInt(ID_TYPE_BASE, MAX_TYPES);
    // except water block, and count from 0
    this.pos = getRandomInt(NUM_COL_ROCK_BLOCKS, NUM_ROW_ROCK_BLOCKS * NUM_COL_ROCK_BLOCKS + NUM_COL_ROCK_BLOCKS - 1);
    this.showStep = step;
};


Reward.prototype.render = function() {
    var row = Math.floor(this.pos / NUM_COL_ROCK_BLOCKS);
    var col = this.pos % NUM_COL_ROCK_BLOCKS;
    var icon = RewardTypes.getIconById(this.typeId);
    if (icon != null) {
        var x = col * WIDTH_BLOCK + (WIDTH_BLOCK - WIDTH_REWARD) / 2;
        var y = row * HEIGHT_BLOCK + 20;
        ctx.drawImage(Resources.get(icon), x, y, WIDTH_REWARD, HEIGHT_REWARD);
    }
}

/********************************************
 *                                          *
 *                Game Logic                *
 *                                          *
 ********************************************/
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var pageType = PAGE_COVER;

var rewardPanel = new SidePanel();
var headPanel = new HeadPanel();
var rolePanel = new RolePanel(ROLES);

var player;
var allEnemies = []; 

/*rewards*/
var allRewardSteps = [];
var allRewards = [];
var remainRewards = [];  // should reset when restart game
var pickedRewardsPerRound = 0;
var RewardTypes;
var rewardTimes; // how many reward will be generated one time, it's a random number

var currentStep = 0; // should reset when restart game
var enemyCountPerRow = 0;

var freezeDuration = 0;
var ignoreDuration = 0;

var gameMode = GAME_MODE_SPEED;

var getReward = function(step) {
    var reward = new Reward(step);
    var shouldRecreate = false;
    allRewards.forEach(function(item) {
        if (reward.pos === item.pos) {
            shouldRecreate = true;
            // break; // no break for forEach
        }
    });

    if (shouldRecreate) {
        reward = getReward(step);
    }

    return reward;
}

var createEnemies = function() {
    allEnemies = [];
    // a simple popular
    for (var i = 0; i < NUM_ROW_ROCK_BLOCKS; i++) {
        for (var j = 0; j < ENEMY_COUNT_PER_ROW[i]; j++) {
            var enemyX = Math.random() * WIDTH_BLOCK * j - WIDTH_BLOCK;
            var enemyY = (i + 1) * HEIGHT_BLOCK - 20;
            var enemySpeed = Math.random() * WIDTH_BLOCK * 2 + ENEMY_SPEED_BASE_PER_ROW[i];
            allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
        }
    } 
}

var initGame = function() {
    createEnemies();

    // Move into engine
    // player = new Player();
    
    initRewardTypes();
    createRewards(0);
    remainRewards = [];
}

// When restart the game the RewardTypes will be undefined, so we have to reassign it again. But why????
var initRewardTypes = function() {
    RewardTypes = {
        'types':[
            {
                'id': ID_LIFE,
                'icon': 'images/Heart.png'
            },
            {
                'id': ID_KEY,
                'icon': 'images/Key.png'
            },
            {
                'id': ID_ROCK,
                'icon': 'images/Rock.png'
            },
            {
                'id': ID_GEM_BLUE,
                'icon': 'images/GemBlue.png'
            },
            {
                'id': ID_GEM_GREEN,
                'icon': 'images/GemGreen.png'
            },
            {
                'id': ID_GEM_ORANGE,
                'icon': 'images/GemOrange.png'
            }
        ],

        'getIconById': function(id) {
            var icon;
            for (var i = 0; i < this.types.length; i++) {
                if (this.types[i].id === id) {
                    icon = this.types[i].icon;
                    break;
                }
            }
            return icon;
        }

    };
}

var createRewards = function(baseStep) {
    allRewardSteps = [];
    allRewards = [];

    rewardTimes = getRandomInt(MIN_REWARDS_PER_ROUND, MAX_REWARDS_PER_ROUND);
    for (var i = 0; i < rewardTimes; i++) {
        var step = getRandomInt(baseStep + 2, baseStep + 30);
        allRewardSteps.push(step);
        allRewards.push(getReward(step));
    }
    allRewardSteps = allRewardSteps.sort(sortNumber);
    console.log(allRewardSteps);
}

initGame();


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (pageType === PAGE_GAME) {
        player.handleInput(allowedKeys[e.keyCode]);
    } else if (pageType === PAGE_FINISH) {
        // do nothing
    } else {
        // pagetType = PAGE_COVER
        rolePanel.handleInput(allowedKeys[e.keyCode]);
    }
});
