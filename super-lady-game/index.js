const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// pencere genisliği ve yüksekligi
canvas.width = 1024;
canvas.height = 576;

const gravity = 1.5; // yer cekiminin degeri

// oyuncu sinifi
class Player {
  constructor() {
    this.speed = 5; // oyuncunun hizi
    this.position = {
      // oyuncunun baslangic konumu
      x: 100,
      y: 100,
    };
    this.velocity = {
      // baslangicta oyuncu hareketsiz yani hizi ( velocity) 0 olacak sekilde ayarlandi.
      x: 0,
      y: 0,
    };

    this.width = 60;
    this.height = 128;

    this.image = createImage("./img/idle.png"); // coklu animasyon sayfasinin resmi (sprite sheet) isaret ediliyor

    this.frames = 0; // 0. animasyon karesinden baslanarak animasyonun olusturulacagi ifade ediliyor

    this.sprites = {
      stand: {
        // oyuncunun duragan haldeki animasyon resimleri
        //createImage() metodu yardimiyla isaret ediliyor
        right: createImage("./img/idle.png"),
        left: createImage("./img/idle.png"),
      },
      run: {
        // oyuncu kosarkenki animasyon resimleri
        //createImage() metodu yardimiyla isaret ediliyor
        right: createImage("./img/run_right.png"),
        left: createImage("./img/run_left.png"),
      },
    };

    this.currentSprite = this.sprites.stand.right; // oyuncunun baslangic durumunda kullanilacak
    // animasyonlu resim (sprite sheet) isaret ediliyor
  }

  // draw() metodu sprite sheetdeki her bir karenin ne kadar kipilacagini ve piksellerini ayarlamayi saglar
  draw() {
    c.drawImage(
      this.currentSprite,
      128 * this.frames,
      0,
      128,
      128,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  // oyuncunun hareketlerinin animasyonlu resime (sprite sheete) gore duzgun animasyonlu bir sekilde calismasi icin kare sayilari denemeler sonucunda ayarlandi.
  update() {
    this.frames++;

    // sag yon tusuna basilmadiginda oyuncu duracak sekilde tasarlandi.
    if (
      this.frames > 4 &&
      (this.currentSprite === this.sprites.stand.right ||
        this.currentSprite === this.sprites.stand.left)
    ) {
      this.frames = 0;
    } else if (
      this.frames >= 5 &&
      this.currentSprite === this.sprites.run.right
    ) {
      this.frames = 0;
    }
    // sag yon tusuna basilmadiginda oyuncu duracak sekilde tasarlandi.
    else if (this.frames >= 5 && this.currentSprite === this.sprites.run.left) {
      this.frames = 0;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}

// platform sinifi
class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = platformImage;
    this.width = platformImage.width;
    this.height = platformImage.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// oyuncunun engelleri asmasina yardimci olacak smallPlatformun olusturulacagi sinif
class SmallPlatform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = smallplatformImage;
    this.width = smallplatformImage.width;
    this.height = smallplatformImage.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// oyuna eklenen kaktus nesnelerinin siniflari
class Cactus {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = cactus_obs;
    this.width = cactus_obs.width;
    this.height = cactus_obs.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// oyuna eklenen zehirli mantar nesnelerinin siniflari
class PoisonMushroom {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = poisonmushroom_obs;
    this.width = poisonmushroom_obs.width;
    this.height = poisonmushroom_obs.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// oyuna eklenen mantar nesnelerinin siniflari
class Mushroom {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = mushroom_obs;
    this.width = mushroom_obs.width;
    this.height = mushroom_obs.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// oyuna eklenen arka plan ve agac nesnelerinin siniflari
class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// resimlerin eklenmesini saglayan fonksiyon
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

// oyunda kullanilacak resim, objeler, arkaplan gibi pek cok kavramin eklenecegi nesne dizileri
let platformImage = createImage("./img/platform.png");
let smallplatformImage = createImage("./img/platformsmall.png");
let cactus_obs = createImage("./img/cactus.png");
let poisonmushroom_obs = createImage("./img/poisonmushroom.png");
let mushroom_obs = createImage("./img/mushroom.png");
let player = new Player();
let platforms = [];
let smallplatforms = [];
let cactuses = [];
let poisonmushrooms = [];
let mushrooms = [];
let genericObjects = [];
let lastKey = [];

let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

// oyun bittiginde tekrar baslamasini saglayacak fonksiyon
function init() {
  document.getElementById("gamewelcome").innerHTML = "OYUNA HOSGELDİNİZ";
  document.getElementById("gamerules").innerHTML =
    "Sağ: D | Sol: A | Yukarı: W";
  player = new Player();

  cactuses = [
    new Cactus({
      x: 400,
      y: 342.6,
      cactus_obs,
    }),

    new Cactus({
      x: cactus_obs.width + 700,
      y: 342.6,
      cactus_obs,
    }),

    new Cactus({
      x: cactus_obs.width + 1700,
      y: 342.6,
      image: cactus_obs,
    }),

    new Cactus({
      x: cactus_obs.width + 2500,
      y: 342.6,
      image: cactus_obs,
    }),

    new Cactus({
      x: 4300,
      y: 342.6,
      image: cactus_obs,
    }),
  ];

  poisonmushrooms = [
    new PoisonMushroom({
      x: 210,
      y: 440,
      poisonmushroom_obs,
    }),

    new PoisonMushroom({
      x: poisonmushroom_obs.width + 1600,
      y: 440,
      poisonmushroom_obs,
    }),

    new PoisonMushroom({
      x: poisonmushroom_obs.width + 3000,
      y: 440,
      image: poisonmushroom_obs,
    }),
  ];

  mushrooms = [
    new Mushroom({
      x: 1100,
      y: 442,
      mushroom_obs,
    }),

    new Mushroom({
      x: mushroom_obs.width + 2000,
      y: 442,
      mushroom_obs,
    }),

    new Mushroom({
      x: mushroom_obs.width + 2500,
      y: 442,
      image: mushroom_obs,
    }),

    new Mushroom({
      x: mushroom_obs.width + 3500,
      y: 442,
      image: mushroom_obs,
    }),

    new Mushroom({
      x: mushroom_obs.width + 4500,
      y: 442,
      image: mushroom_obs,
    }),
  ];

  platforms = [
    new Platform({
      x: -1,
      y: 480,
      image: platformImage,
    }),

    new Platform({ x: platformImage.width - 3, y: 480, platformImage }),

    new Platform({ x: platformImage.width * 2 + 100, y: 480, platformImage }),

    new Platform({ x: platformImage.width * 3 + 300, y: 480, platformImage }),

    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 480,
      platformImage,
    }),

    new Platform({
      x: platformImage.width * 5 + 700 - 2,
      y: 480,
      platformImage,
    }),
  ];

  smallplatforms = [
    new SmallPlatform({
      x: 1300,
      y: 360,
      image: smallplatformImage,
    }),
    new SmallPlatform({
      x: 1300 + smallplatformImage.width,
      y: 360,
      image: smallplatformImage,
    }),

    new SmallPlatform({
      x: 2100,
      y: 370,
      smallplatformImage,
    }),

    new SmallPlatform({
      x: 2100 + smallplatformImage.width,
      y: 370,
      smallplatformImage,
    }),

    new SmallPlatform({
      x: 3687,
      y: 410,
      smallplatformImage,
    }),

    new SmallPlatform({
      x: 3800,
      y: 370,
      smallplatformImage,
    }),

    new SmallPlatform({
      x: 3800 + smallplatformImage.width,
      y: 330,
      smallplatformImage,
    }),
  ];

  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage("./img/background.png"),
    }),

    new GenericObject({
      x: -1,
      y: -1,
      image: createImage("./img/trees.png"),
    }),
  ];

  scrollOffset = 0;
}

// nesnelerin oyun sayfasinda gosterecek fonksiyon
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObjects) => {
    genericObjects.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });

  smallplatforms.forEach((smallplatform) => {
    smallplatform.draw();
  });

  cactuses.forEach((cactus) => {
    cactus.draw();
  });

  poisonmushrooms.forEach((poisonmushroom) => {
    poisonmushroom.draw();
  });

  mushrooms.forEach((mushroom) => {
    mushroom.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += player.speed;

      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });

      smallplatforms.forEach((smallplatform) => {
        smallplatform.position.x -= player.speed;
      });

      cactuses.forEach((cactus) => {
        cactus.position.x -= player.speed;
      });

      poisonmushrooms.forEach((poisonmushroom) => {
        poisonmushroom.position.x -= player.speed;
      });

      mushrooms.forEach((mushroom) => {
        mushroom.position.x -= player.speed;
      });

      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;

      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });

      smallplatforms.forEach((smallplatform) => {
        smallplatform.position.x += player.speed;
      });

      cactuses.forEach((cactus) => {
        cactus.position.x += player.speed;
      });

      poisonmushrooms.forEach((poisonmushroom) => {
        poisonmushroom.position.x += player.speed;
      });

      mushrooms.forEach((mushroom) => {
        mushroom.position.x += player.speed;
      });

      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }

  // oyuncunun platformda durmasini saglayan kod
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // oyuncunun kucuk platformda durmasini saglayan kod
  smallplatforms.forEach((smallplatform) => {
    if (
      player.position.y + player.height <= smallplatform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        smallplatform.position.y &&
      player.position.x + player.width >= smallplatform.position.x &&
      player.position.x <= smallplatform.position.x + smallplatform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // hareketler arasi gecis uyumlulugu
  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.frames = 0;
    player.currentSprite = player.sprites.run.right;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.frames = 0;
    player.currentSprite = player.sprites.run.left;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.frames = 0;
    player.currentSprite = player.sprites.stand.left;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.frames = 0;
    player.currentSprite = player.sprites.stand.right;
  }

  // oyun kazanma sarti
  if (scrollOffset > platformImage.width * 5 + 300 - 2) {
    console.log("KAZANDINIZ");
    document.getElementById("gameend").innerHTML = "TEBRİKLER KAZANDINIZ!";
  }

  // oyun kaybetme sarti
  if (player.position.y >= canvas.height) {
    console.log("KAYBETTİNİZ");
    document.getElementById("gameend").innerHTML = "KAYBETTİNİZ";
    init();
  }
}

init();
animate();

// oyun oynamayi karakterlerin tanimlanmasi (a: sol, d: sag, w: yukari, s: asagi)
// tuslarin basildigi durum
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      lastKey = "left";
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = true;
      lastKey = "right";
      break;

    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
});

// tuslarin basilmadigi durum
addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;

    case 87:
      console.log("up");
      break;
  }
  console.log(keys.right.pressed);
});
