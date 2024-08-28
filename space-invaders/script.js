class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {

        // horizontal movement
        if(this.game.keys.indexOf('ArrowLeft') > -1)
            this.x -= this.speed;
        if(this.game.keys.indexOf('ArrowRight') > -1)
            this.x += this.speed;

        // horizontal boundries
        if(this.x < 0) this.x = 0;
        else if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    }
    shoot() {
        const projectile = this.game.getProjectile();
        if(projectile) projectile.start(this.x + this.width * 0.5, this.y);
    }
}

class Projecttile {
    constructor() {
        this.width = 8;
        this.height = 40;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;
    }

    draw(context) {
        if(!this.free) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update(){
        if(!this.free) {
            this.y -= this.speed;
            if(this.y < 0 - this.height) this.reset();
        }
    }
    
    start(x, y){
        this.x = x - this.width * 0.5;
        this.y =y;
        this.free = false;
    }
    
    reset(){
        this.free = true;
    }
}

class Enemy {
    constructor(game) {
        this.game = game;
        this.width;
        this.height;
        this.x;
        this.y;
    }

    draw(context){
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    update() {

    }
}

class Wave {
    constructor(game) {
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.x;
        this.y;
    }

    render(context) {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.keys = [];
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);

        this.ProjecttilePool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();
        console.log(this.ProjecttilePool);

        this.columns = 5;
        this.rows = 3;
        this.enemySize = 60;

        this.waves = []
        this.waves.push(new Wave(this));

        // event listener
        window.addEventListener('keydown', (e) => {
           
           if(this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
           console.log(this.keys);

           if(e.key === 'z') this.player.shoot();

        });

        window.addEventListener('keyup', (e) => {
            const index = this.keys.indexOf(e.key);
            if(index > -1) this.keys.splice(index, 1);
            console.log(this.keys);
        });

    }
    render(context){
        this.player.draw(context);
        this.player.update();
        this.ProjecttilePool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });
        this.waves.forEach(wave => {
            wave.render(context);
        });
    }

    // create projectiles object pool
    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; ++i) {
            this.ProjecttilePool.push(new Projecttile());
        }
    }
    // get free projectile object from the pool
    getProjectile(){
        for(let i = 0; i < this.ProjecttilePool.length; ++i) {
            if(this.ProjecttilePool[i].free)
                return this.ProjecttilePool[i];
        }
    }


}

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;

    const game = new Game(canvas);
    
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        window.requestAnimationFrame(animate);
    }

    animate();
})