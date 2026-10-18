let tank = document.getElementById("tank");

class Fish {
    constructor(id, lane) {
        this.pic = document.getElementById(id);
        this.width = 56;
        this.height = 66;
        this.normalSpeed = 1;
        this.speed = this.normalSpeed;
        this.direction = 1;
        this.speedReset;

        // choose a image
        let imageNumber = Math.floor(Math.random() * 5) + 1;
        this.pic.src = "src/fish" + imageNumber + ".png";

        this.x = Math.random() * (tank.clientWidth - this.width);
        // keep all fish visible and seperate the rows
        this.y = lane * 70 + Math.random() * (70 - this.height);
        if (Math.random() < 0.5) {
            this.direction = -1;
        }
        this.showPosition();

        this.pic.addEventListener("click", () => this.speedUp());
        this.pic.addEventListener("keydown", (event) => {
            if (event.key == "Enter" || event.key == " ") {
                event.preventDefault();
                this.speedUp();
            }
        });

        setInterval(() => this.move(), 20);
        this.scheduleDirectionCheck();
    }

    showPosition() {
        this.pic.style.left = this.x + "px";
        this.pic.style.top = this.y + "px";
        this.pic.style.transform = "scaleX(" + this.direction + ")";
    }

    move() {
        this.x += this.speed * this.direction;
        this.keepInside();
        this.showPosition();
    }

    keepInside() {
        let rightEdge = tank.clientWidth - this.width;
        // clamp 
        if (this.x >= rightEdge) {
            this.x = rightEdge;
            this.direction = -1;
        } else if (this.x <= 0) {
            this.x = 0;
            this.direction = 1;
        }
    }

    scheduleDirectionCheck() {
        // timer for each fish
        let delay = 2000 + Math.floor(Math.random() * 6001);
        setTimeout(() => {
            if (Math.random() < 0.5) {
                this.direction *= -1;
            }
            this.scheduleDirectionCheck();
        }, delay);
    }

    speedUp() {
        // speed up the fish for 3 seconds
        this.speed = this.normalSpeed * 3;
        clearTimeout(this.speedReset);
        this.speedReset = setTimeout(() => {
            this.speed = this.normalSpeed;
        }, 3000);
    }
}

let fish1 = new Fish("fish1", 0);
let fish2 = new Fish("fish2", 1);
let fish3 = new Fish("fish3", 2);
let fish4 = new Fish("fish4", 3);
let fish5 = new Fish("fish5", 4);
let fish6 = new Fish("fish6", 5);
let fish7 = new Fish("fish7", 6);