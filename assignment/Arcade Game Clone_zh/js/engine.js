/* Engine.js
* 这个文件提供了游戏循环玩耍的功能（更新敌人和渲染）
 * 在屏幕上画出出事的游戏面板，然后调用玩家和敌人对象的 update / render 函数（在 app.js 中定义的）
 *
 * 一个游戏引擎的工作过程就是不停的绘制整个游戏屏幕，和小时候你们做的 flipbook 有点像。当
 * 玩家在屏幕上移动的时候，看上去就是图片在移动或者被重绘。但这都是表面现象。实际上是整个屏幕
 * 被重绘导致这样的动画产生的假象

 * 这个引擎是可以通过 Engine 变量公开访问的，而且它也让 canvas context (ctx) 对象也可以
 * 公开访问，以此使编写app.js的时候更加容易
 */

var Engine = (function(global) {
    /* 实现定义我们会在这个作用于用到的变量
     * 创建 canvas 元素，拿到对应的 2D 上下文
     * 设置 canvas 元素的高/宽 然后添加到dom中
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        canvas2 = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        ctx2 = canvas2.getContext('2d'),
        sidePanel = doc.getElementById("sidePanel"),
        coverAnimationStarted = true,
        animationStarted,
        isFinished,
        isReset = false,
        isRestarted = false,
        isFreeze = false,
        isIgnored = false,
        isSuccess = false,
        coverAudio,
        wudiAudio = new Audio("sounds/wudi.mp3"),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;

    canvas2.width = 101;
    canvas2.height = 606;

    // doc.body.appendChild(canvas);
    doc.getElementById("gameZone").appendChild(canvas);
    doc.getElementById("sidePanel").appendChild(canvas2);

    // canvas.setAttribute("id", "gameCanvas");
    function showSidePanel(visible) {
       if (visible) {
            sidePanel.classList.remove("hide");
            sidePanel.classList.add("showInline");
       } else {
            sidePanel.classList.add("hide");
            sidePanel.classList.remove("showInline");
       }
    }


    function showFinish() {
        console.log("show finish");
        pageType = PAGE_FINISH;

        // Hide side panel
        showSidePanel(false);

        // Stop game zone paint
        animationStarted = false;

        // Draw background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#a7e172";
        ctx.fillRect(0, 0, canvas.width, canvas.height - 40); // spare some room for bottom

        // Draw title
        ctx.fillStyle="black";
        ctx.font = "60px Comic Sans MS";
        ctx.fillText("Score", X_TITLE, Y_TITLE);

        // Draw player's role
        ctx.drawImage(Resources.get(player.role), X_ROLE, Y_ROLE);

        // Draw summary
        ctx.font = "40px Comic Sans MS";
        ctx.fillStyle="red";
        if (isSuccess) {
            ctx.fillText("YOU WIN !!!", X_ROLE + 252, Y_ROLE + 121);
        } else {
            ctx.fillText("YOU LOSE !!!", X_ROLE + 252, Y_ROLE + 121);
        }

        // Draw scores
        // ctx.font = "40px Comic Sans MS";
        ctx.fillStyle="black";
        var index = 0;
        RewardTypes.types.forEach(function(type) {
            var row = index % NUM_ROW_REWARDS;
            var col = Math.floor(index / NUM_ROW_REWARDS);
            var x = col * WIDTH_BLOCK * 2 + 70; // it's a experience value, same as below
            var y = row * 60 + 180;
            ctx.drawImage(Resources.get(type.icon), x, y, WIDTH_REWARD_ICON, HEIGHT_REWARD_ICON);
            ctx.fillText("X " + rewardPanel.getValueById(type.id), x + 110, y + 58, WIDTH_REWARD_TEXT, HEIGHT_REWARD_TEXT);
            index++;
        });

        showRestartButton();
        showBottom();
    }

    var finishUIRestartButtonRect = {
        x: (canvas.width - 100) / 2,
        y: canvas.height * 2 / 3,
        width: 100,
        height: 50
    };

    function showRestartButton() {
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ctx.fillRect(finishUIRestartButtonRect.x, finishUIRestartButtonRect.y, finishUIRestartButtonRect.width, finishUIRestartButtonRect.height);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "15px Comic Sans MS";
        ctx.fillText("Restart Game", finishUIRestartButtonRect.x + 50, finishUIRestartButtonRect.y + 30);

        canvas.addEventListener("click", finishUIRestartButtonOnClick, false);     
    }

    function isRestartButtonOnFinishUI(evt) {
        var rect = canvas.getBoundingClientRect();
        var leftBound = rect.x + finishUIRestartButtonRect.x;
        var rightBound = leftBound + finishUIRestartButtonRect.width;
        var topBound = rect.y + finishUIRestartButtonRect.y;
        var bottomBound = topBound + finishUIRestartButtonRect.height;
        return (evt.x >= leftBound && evt.x <= rightBound && evt.y >= topBound && evt.y <= bottomBound)    
    }

    function finishUIRestartButtonOnClick(evt) {
        if (isRestartButtonOnFinishUI(evt)) {
            console.log("restart game");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // isRestarted = true;
            initGame();
            startCover();

            canvas.removeEventListener("click", finishUIRestartButtonOnClick);  
        }
    }

    function startCover() {
        console.log("start cover");

        pageType = PAGE_COVER;

        playCoverMusic();
        // Resources.unregister(startCover); // why???

        coverAnimationStarted = true;

        showSidePanel(false);

        // Draw title
        drawCoverTitle();

        // Draw role
        drawRolePanel();

        // TODO
        // drawLife();

        // Draw button
        showCoverButton();

        showBottom();
    }

    function drawCoverTitle() {
        ctx.fillStyle = "red";
        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText("Cross the road", canvas.width / 2, canvas.height / 6);
    }

    var coverButtonRect = {
        x: (canvas.width - 100) / 2,
        y: canvas.height * 2 / 3,
        width: 100,
        height: 50
    };

    function showCoverButton() {
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ctx.fillRect(coverButtonRect.x, coverButtonRect.y, coverButtonRect.width, coverButtonRect.height);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "15px Comic Sans MS";
        ctx.fillText("Start Game", coverButtonRect.x + 50, coverButtonRect.y + 30);

        canvas.addEventListener("click", coverButtonOnClick, false);     
    }

    function isCoverStartButton(evt) {
        var rect = canvas.getBoundingClientRect();
        var leftBound = rect.x + coverButtonRect.x;
        var rightBound = leftBound + coverButtonRect.width;
        var topBound = rect.y + coverButtonRect.y;
        var bottomBound = topBound + coverButtonRect.height;
        return (evt.x >= leftBound && evt.x <= rightBound && evt.y >= topBound && evt.y <= bottomBound);
    }

    function coverButtonOnClick(evt) {
        if (isCoverStartButton(evt)) {
            console.log("start game");
            // start game
            player = new Player(rolePanel.roles[rolePanel.selectedIndex]);
            init();
            
            canvas.removeEventListener("click", coverButtonOnClick);
            stopCoverMusic();
        }
    }

    function drawRolePanel() {
        rolePanel.render();
        if (coverAnimationStarted) {
            win.requestAnimationFrame(drawRolePanel);
        }
    }

    /* 这个函数是整个游戏的主入口，负责适当的调用 update / render 函数 */
    function main() {
        /* 如果你想要更平滑的动画过度就需要获取时间间隙。因为每个人的电脑处理指令的
         * 速度是不一样的，我们需要一个对每个人都一样的常数（而不管他们的电脑有多快）
         * 就问你屌不屌！
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* 调用我们的 update / render 函数， 传递事件间隙给 update 函数因为这样
         * 可以使动画更加顺畅。
         */
        update(dt);
        render();

        /* 设置我们的 lastTime 变量，它会被用来决定 main 函数下次被调用的事件。 */
        lastTime = now;

        /* 在浏览准备好调用重绘下一个帧的时候，用浏览器的 requestAnimationFrame 函数
         * 来调用这个函数
         */
        if (animationStarted) {
            win.requestAnimationFrame(main);
        }
    }

    /* 这个函数调用一些初始化工作，特别是设置游戏必须的 lastTime 变量，这些工作只用
     * 做一次就够了
     */
    function init() {
        reset();
        lastTime = Date.now();

        showSidePanel(true);
        initHeadPanel();
        main();
        showBottom();
    }

    function initHeadPanel() {
        headPanel.onTeardown(onTeardown);
        canvas.addEventListener("click", resetButtonOnClick, false); 
    }

    function onTeardown() {
        console.log("onTeardown");
        isFinished = true;
        console.log(rewardPanel.getRewardsCount);
        if (rewardPanel.getRewardsCount() >= MIN_SECCESS_REWARDS) {
            isSuccess = true;
            playSuccessSound();
        } else {
            isSuccess = false;
            playDieSound();
        }
    }

    function isResetButton(evt) {
        var canvasRect = canvas.getBoundingClientRect();
        var btnRect = headPanel.getResetBtnRect();
        var leftBound = canvasRect.x + btnRect.x;
        var rightBound = leftBound + btnRect.width;
        var topBound = canvasRect.y + btnRect.y;
        var bottomBound = topBound + btnRect.height;
        return (evt.x >= leftBound && evt.x <= rightBound && evt.y >= topBound && evt.y <= bottomBound);      
    }

    function resetButtonOnClick(evt) {
        if (isResetButton(evt)) {
            console.log("reset game");
            animationStarted = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // isRestarted = true;
            isReset = true;
            initGame();
            startCover();

            canvas.removeEventListener("click", resetButtonOnClick); 
        }    
    }

    /* 这个函数被 main 函数（我们的游戏主循环）调用，它本身调用所有的需要更新游戏角色
     * 数据的函数，取决于你怎样实现碰撞检测（意思是如何检测两个角色占据了同一个位置，
     * 比如你的角色死的时候），你可能需要在这里调用一个额外的函数。现在我们已经把这里
     * 注释了，你可以在这里实现，也可以在 app.js 对应的角色类里面实现。
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        updateSidePanel();
        updateHeadPanel();
    }

    function updateHeadPanel() {
        headPanel.update();
    }

    // Check pickup
    function updateSidePanel() {
        var playerCol = Math.floor(player.x / WIDTH_BLOCK);
        var playerRow = Math.floor(player.y / HEIGHT_BLOCK);
        var playerPos = playerRow * NUM_COL_BLOCKS + playerCol;
        var index = 0;
        allRewards.forEach(function(reward) {
            if (remainRewards.includes(reward) && reward.pos === playerPos) {
                console.log("pickedRewardsPerRound: " + pickedRewardsPerRound)
                pickedRewardsPerRound++;
                playPickupSound();
                remainRewards.splice(remainRewards.indexOf(reward), 1);
                rewardPanel.update(reward.typeId, rewardPanel.getValueById(reward.typeId) + 1);
                if (reward.typeId === ID_ROCK) {
                    isFreeze = true;
                    freezeDuration += MAX_FREEZE_TIME;
                    playWudiSound();
                } else if (reward.typeId === ID_KEY) {
                    isIgnored = true;
                    ignoreDuration += MAX_IGNORE_TIME;
                    playWudiSound();
                }
            }
            index++;
        });

        if (pickedRewardsPerRound === allRewards.length) {
            createRewards(currentStep);
            pickedRewardsPerRound = 0;
        }
    }

    function checkCollisions() {
        if (isIgnored) {
            if (ignoreDuration > 0) {
                ignoreDuration--;
            } else {
                isIgnored = false;
                stopWudiSound();
            }
        }

        var playerRect = new Rect(player.x, player.y, WIDTH_PLAYER, HEIGHT_PLAYER - 50);
        var isCollision = false;
        allEnemies.forEach(function(enemy) {
            enemyRect = new Rect(enemy.x, enemy.y + 50, WIDTH_BLOCK - 20, HEIGHT_BLOCK - 50);
            if (isOverlaped(playerRect, enemyRect)) {
                isCollision = true;
            }
        });
        // Fall into water
        if (!isCollision && playerRect.y < HEIGHT_BLOCK) {
            isCollision = true;
            if (isIgnored) {
                player.reset();
            }
        }


        if (isCollision && !isIgnored) {
            playAhoSound();
            player.reset();
            var life = rewardPanel.getValueById(ID_LIFE);
            if (life > 0) {
                rewardPanel.update(ID_LIFE, life - 1);
            } else {
                // TODO: finish
                // showFinish();
                isFinished = true;
                isSuccess = false;
                playDieSound();
            }
        }
    }

    function isOverlaped(rect1, rect2) {
        /*
            ---------------             ----------------
           |    |   |      |           |                |
           |    |   |      |            ----------------
           |    |   |      |           |                |
            ---------------      or     ---------------- 
                                       |                |
                                        ----------------
        */

        // rect1 left bound or right bound in rect2's range
        var condx1 = (rect1.x + rect1.width >= rect2.x && rect1.x + rect1.width <= rect2.x + rect2.width) || (rect1.x >= rect2.x && rect1.x <= rect2.x + rect2.width);
        var condx2 = (rect2.x + rect2.width >= rect1.x && rect2.x + rect2.width <= rect1.x + rect1.width) || (rect2.x >= rect1.x && rect2.x <= rect1.x + rect1.width);

        var condy1 = (rect1.y + rect1.height >= rect2.y && rect1.y + rect1.height <= rect2.y + rect2.height) || (rect1.y >= rect2.y && rect1.y <= rect2.y + rect2.height);
        var condy2 = (rect2.y + rect2.height >= rect1.y && rect2.y + rect2.height <= rect1.y + rect1.height) || (rect2.y >= rect1.y && rect2.y <= rect1.y + rect1.height);

        // Y is not accuracy
        return ((condx1 || condx2) && (condy1 || condy2));
    }

    /* 这个函数会遍历在 app.js 定义的存放所有敌人实例的数组，并且调用他们的 update()
     * 函数，然后，它会调用玩家对象的 update 方法，最后这个函数被 update 函数调用。
     * 这些更新函数应该只聚焦于更新和对象相关的数据/属性。把重绘的工作交给 render 函数。
     */
    // var freezeTimeSaved = false;
    function updateEntities(dt) {
        player.update();

        if (isFreeze) {
            time = 0;
            if (freezeDuration > 0) {
                freezeDuration--;
            } else {
                isFreeze = false;
                stopWudiSound();
            }
        } else {
            time = dt;
        }
        allEnemies.forEach(function(enemy) {
            enemy.update(time/*dt*/);
        });
        var index = 0;
        allRewardSteps.forEach(function(step) {
            var reward;
            for (var i = 0; i < allRewards.length; i++) {
                if (allRewards[i].showStep === step) {
                    reward = allRewards[i];
                    break;
                }
            }
            if (reward != null && currentStep === step && !remainRewards.includes(reward)) {
                playRewardAppearSound();
                remainRewards.push(reward);
                console.log(remainRewards);
            }
            index++;
        });
    }

    /* 这个函数做了一些游戏的初始渲染，然后调用 renderEntities 函数。记住，这个函数
     * 在每个游戏的时间间隙都会被调用一次（或者说游戏引擎的每个循环），因为这就是游戏
     * 怎么工作的，他们就像是那种每一页上都画着不同画儿的书，快速翻动的时候就会出现是
     * 动画的幻觉，但是实际上，他们只是不停的在重绘整个屏幕。
     */
    function render() {
        if (isFinished) {
            showFinish();
            return;
        }
        if (isReset) {
            isReset = false;
            return;
        }
        renderHeadPanel();
        renderSidePanel();
        /* 这个数组保存着游戏关卡的特有的行对应的图片相对路径。 */
        var rowImages = [
                'images/water-block.png',   // 这一行是河。
                'images/stone-block.png',   // 第一行石头
                'images/stone-block.png',   // 第二行石头
                'images/stone-block.png',   // 第三行石头
                'images/grass-block.png',   // 第一行草地
                'images/grass-block.png'    // 第二行草地
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* 便利我们上面定义的行和列，用 rowImages 数组，在各自的各个位置绘制正确的图片 */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* 这个 canvas 上下文的 drawImage 函数需要三个参数，第一个是需要绘制的图片
                 * 第二个和第三个分别是起始点的x和y坐标。我们用我们事先写好的资源管理工具来获取
                 * 我们需要的图片，这样我们可以享受缓存图片的好处，因为我们会反复的用到这些图片
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* New Added function */
    function renderHeadPanel() {
        ctx.clearRect(0, 0, canvas.width, 90);
        headPanel.render();
    }

    function renderSidePanel() {
        rewardPanel.render();
    }

    /* 这个函数会在每个时间间隙被 render 函数调用。他的目的是分别调用你在 enemy 和 player
     * 对象中定义的 render 方法。
     */
    function renderEntities() {
        /* 遍历在 allEnemies 数组中存放的作于对象然后调用你事先定义的 render 函数 */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
        remainRewards.forEach(function(reward) {
            if (reward != null) {
                reward.render();
            }
        });
    }

    /* 这个函数现在没干任何事，但是这会是一个好地方让你来处理游戏重置的逻辑。可能是一个
     * 从新开始游戏的按钮，也可以是一个游戏结束的画面，或者其它类似的设计。它只会被 init()
     * 函数调用一次。
     */
    function reset() {
        // 空操作
        currentStep = 0;
        rewardPanel.reset();
        headPanel.reset();
        pageType = PAGE_GAME;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        coverAnimationStarted = false;
        isFinished = false;
        animationStarted = true;
        pickedRewardsPerRound = 0;
    }

    function playCoverMusic() {
        if (coverAudio == null) {
            coverAudio = doc.getElementById("coverAudio");
        }
        coverAudio.play();
    }

    function stopCoverMusic() {
        if (coverAudio != null) {
            console.log("stop music");
            coverAudio.pause();
            coverAudio.currentTime = 0;
        }
    }

    function playAhoSound() {
        var audio = new Audio("sounds/aho.wav");
        audio.play();
    }

    function playRewardAppearSound() {
        var audio = new Audio("sounds/rewardAppear.mp3");
        audio.play();
    }

    function playPickupSound() {
        var audio = new Audio("sounds/pickup.wav");
        audio.play();
    }

    function playDieSound() {
        var audio = new Audio("sounds/die.wav");
        audio.play();
    }

    function playSuccessSound() {
        var audio = new Audio("sounds/success.mp3");
        audio.play();       
    }

    function playWudiSound() {
        wudiAudio.play();   
    }

    function stopWudiSound() {
        wudiAudio.pause();
        wudiAudio.currentTime = 0;
    }

    function showBottom() {
        ctx.fillStyle = "black";
        ctx.font = "15px Comic Sans MS";
        ctx.fillText("Copyright © Produced By FlyingOst", 252, canvas.height - 5, canvas.width, 10);
    }

    /* 把 canvas 上下文对象绑定在 global 全局变量上（在浏览器运行的时候就是 window
     * 对象。从而开发者就可以在他们的app.js文件里面更容易的使用它。
     */
    global.ctx = ctx;
    global.ctx2 = ctx2;

    console.log("load cover resource");
    /* 紧接着我们来加载我们知道的需要来绘制我们游戏关卡的图片。然后把 init 方法设置为回调函数。
     * 那么党这些图片都已经加载完毕的时候游戏就会开始。
     */
    Resources.load([
        // Resource that cover needed
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Star.png',
        'images/Selector.png',
        'images/Heart.png',

        // Resources that needed by game zone
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/Key.png',
        'images/Rock.png',
        'images/GemBlue.png',
        'images/GemGreen.png',
        'images/GemOrange.png'
    ]);
    Resources.onReady(startCover);

    canvas.addEventListener('mousemove', doMouseMove,false); 

    function doMouseMove(evt) {
        if (pageType === PAGE_COVER) {
            if (isCoverStartButton(evt)) {
                canvas.style.cursor = "pointer";
            } else {
                canvas.style.cursor = "default";
            }
        } else if (pageType === PAGE_GAME) {
            if (isResetButton(evt)) {
                canvas.style.cursor = "pointer";
            } else {
                canvas.style.cursor = "default";
            }
        } else if (pageType === PAGE_FINISH) {
            if (isRestartButtonOnFinishUI(evt)) {
                canvas.style.cursor = "pointer";
            } else {
                canvas.style.cursor = "default";
            }
        }
    }
})(this);
