import {
  Component, ElementRef, ViewChild,
  OnDestroy, AfterViewInit, Output, EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';

const FIXED_DT = 1 / 60;
const W = 800;
const H = 300;
const GROUND_Y = 235;  
const DINO_X = 80;
const DINO_W = 40;
const DINO_H = 52;
const GRAVITY = 2600;
const JUMP_V = -880;
const BASE_SPEED = 420;
const MAX_SPEED = 950;
const SPEED_RAMP = 18;

type ObstacleType = 'cactus' | 'triple' | 'ufo';
interface Obstacle { type: ObstacleType; x: number; w: number; h: number; y?: number; }

@Component({
  selector: 'app-dino-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dino-game.html',
  styleUrl: './dino-game.css'
})
export class DinoGame implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() close = new EventEmitter<void>();

  gameState: 'idle' | 'playing' | 'over' = 'idle';
  score = 0;
  highScore = 0;

  private ctx!: CanvasRenderingContext2D;
  private rafId = 0;
  private lastTs = 0;
  private accum = 0;

  private dinoBottom = GROUND_Y;
  private velY = 0;
  private onGround = true;
  private legFrame = 0;
  private legTimer = 0;

  private obstacles: Obstacle[] = [];
  private spawnTimer = 0;
  private spawnInterval = 1.6;
  private speed = BASE_SPEED;
  private distAccum = 0;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = W;
    canvas.height = H;
    this.ctx = canvas.getContext('2d')!;
    this.drawFrame();
    window.addEventListener('keydown', this.onKey);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('keydown', this.onKey);
  }

  private onKey = (e: KeyboardEvent): void => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      this.handleAction();
    }
  };

  handleAction(): void {
    if (this.gameState === 'idle' || this.gameState === 'over') {
      this.startGame();
    } else if (this.gameState === 'playing' && this.onGround) {
      this.velY = JUMP_V;
      this.onGround = false;
    }
  }

  private startGame(): void {
    this.dinoBottom = GROUND_Y;
    this.velY = 0;
    this.onGround = true;
    this.obstacles = [];
    this.spawnTimer = 0;
    this.spawnInterval = 1.6;
    this.speed = BASE_SPEED;
    this.score = 0;
    this.distAccum = 0;
    this.legFrame = 0;
    this.legTimer = 0;
    this.gameState = 'playing';
    this.lastTs = 0;
    this.accum = 0;
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(this.loop);
  }

  private loop = (ts: number): void => {
    if (this.lastTs === 0) this.lastTs = ts;
    this.accum += Math.min((ts - this.lastTs) / 1000, 0.1);
    this.lastTs = ts;

    while (this.accum >= FIXED_DT) {
      this.tick(FIXED_DT);
      this.accum -= FIXED_DT;
    }

    this.drawFrame();

    if (this.gameState === 'playing') {
      this.rafId = requestAnimationFrame(this.loop);
    }
  };

  private tick(dt: number): void {
    this.speed = Math.min(this.speed + SPEED_RAMP * dt, MAX_SPEED);
    this.distAccum += this.speed * dt;
    this.score = Math.floor(this.distAccum / 10);

    // Physics
    if (!this.onGround) {
      this.velY += GRAVITY * dt;
      this.dinoBottom += this.velY * dt;
      if (this.dinoBottom >= GROUND_Y) {
        this.dinoBottom = GROUND_Y;
        this.velY = 0;
        this.onGround = true;
      }
    }

    // Leg animation
    if (this.onGround) {
      this.legTimer += dt;
      if (this.legTimer >= 0.15) {
        this.legFrame = 1 - this.legFrame;
        this.legTimer = 0;
      }
    }

    // Spawn
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer = 0;
      this.spawnInterval = Math.max(0.8, 1.6 - ((this.speed - BASE_SPEED) / MAX_SPEED) * 0.8)
        + Math.random() * 0.5;
      this.spawnObstacle();
    }

    // Move obstacles & cull
    for (const obs of this.obstacles) obs.x -= this.speed * dt;
    this.obstacles = this.obstacles.filter(o => o.x + o.w > -10);

    // Collision (shrunk hitbox by 4px on each side)
    const dx = DINO_X + 4;
    const dy = this.dinoBottom - DINO_H + 4;
    const dw = DINO_W - 8;
    const dh = DINO_H - 8;

    for (const obs of this.obstacles) {
      const ox = obs.x + 4;
      const ow = obs.w - 8;
      const oh = obs.h - 8;
      const oy = obs.type === 'ufo' ? obs.y! + 4 : GROUND_Y - obs.h + 4;
      if (dx < ox + ow && dx + dw > ox && dy < oy + oh && dy + dh > oy) {
        this.endGame();
        return;
      }
    }
  }

  private spawnObstacle(): void {
    const r = Math.random();
    if (r < 0.28) {
      this.obstacles.push({ type: 'cactus', x: W, w: 20, h: 48 });
    } else if (r < 0.50) {
      this.obstacles.push({ type: 'cactus', x: W, w: 20, h: 64 });
    } else if (r < 0.64) {
      this.obstacles.push({ type: 'cactus', x: W, w: 32, h: 48 });
    } else if (r < 0.76) {
      this.obstacles.push({ type: 'cactus', x: W, w: 32, h: 64 });
    } else if (r < 0.88) {
      this.obstacles.push({ type: 'triple', x: W, w: 74, h: 48 });
    } else {
      // UFO unlocks after score 100
      if (this.score > 100) {
        this.obstacles.push({ type: 'ufo', x: W, w: 60, h: 40, y: GROUND_Y - 80 });
      } else {
        this.obstacles.push({ type: 'cactus', x: W, w: 20, h: 48 });
      }
    }
  }

  private endGame(): void {
    this.gameState = 'over';
    if (this.score > this.highScore) this.highScore = this.score;
    cancelAnimationFrame(this.rafId);
    this.drawFrame();
  }

  private drawFrame(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);

    // Sky
    ctx.fillStyle = '#f7f7f7';
    ctx.fillRect(0, 0, W, H);

    // Ground line
    ctx.fillStyle = '#535353';
    ctx.fillRect(0, GROUND_Y + 2, W, 3);

    // Scrolling ground pebbles
    ctx.fillStyle = '#b0b0b0';
    const offset = this.distAccum % 80;
    for (let x = -offset; x < W; x += 80) {
      ctx.fillRect(x + 5,  GROUND_Y + 7, 10, 3);
      ctx.fillRect(x + 40, GROUND_Y + 9, 6,  2);
    }

    // Obstacles
    for (const obs of this.obstacles) {
      if (obs.type === 'ufo') {
        this.drawUFO(ctx, obs);
      } else if (obs.type === 'triple') {
        this.drawTripleCactus(ctx, obs.x, obs.h);
      } else {
        this.drawCactus(ctx, obs.x, obs.w, obs.h);
      }
    }

    // Dino
    this.drawDino(ctx, DINO_X, this.dinoBottom, !this.onGround);

    // Score HUD
    ctx.fillStyle = '#535353';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `HI ${String(this.highScore).padStart(5, '0')}  ${String(this.score).padStart(5, '0')}`,
      W - 16, 28
    );
    ctx.textAlign = 'left';

    // Overlays
    if (this.gameState === 'idle') {
      this.drawOverlay(ctx, 'DINO RUN', 'Press SPACE or tap Jump to start');
    } else if (this.gameState === 'over') {
      this.drawOverlay(ctx, 'GAME OVER', 'Press SPACE or tap Jump to restart');
    }
  }

  private drawOverlay(ctx: CanvasRenderingContext2D, title: string, sub: string): void {
    ctx.fillStyle = 'rgba(0,0,0,0.07)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#535353';
    ctx.font = 'bold 30px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(title, W / 2, H / 2 - 14);
    ctx.font = '15px monospace';
    ctx.fillText(sub, W / 2, H / 2 + 18);
    ctx.textAlign = 'left';
  }

  private drawDino(ctx: CanvasRenderingContext2D, x: number, bottom: number, jumping: boolean): void {
    ctx.fillStyle = '#535353';

    // Tail
    ctx.fillRect(x - 14, bottom - 36, 18, 10);
    ctx.fillRect(x - 20, bottom - 29, 10, 8);

    // Body
    ctx.fillRect(x, bottom - 44, 36, 24);

    // Neck connection
    ctx.fillRect(x + 14, bottom - 50, 14, 8);

    // Head
    ctx.fillRect(x + 14, bottom - 64, 26, 18);

    // Snout
    ctx.fillRect(x + 34, bottom - 52, 6, 5);

    // Eye white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 27, bottom - 60, 8, 8);

    // Pupil
    ctx.fillStyle = '#535353';
    ctx.fillRect(x + 30, bottom - 57, 4, 4);

    // Legs
    if (jumping) {
      ctx.fillRect(x + 6,  bottom - 20, 10, 20);
      ctx.fillRect(x + 20, bottom - 20, 10, 20);
    } else if (this.legFrame === 0) {
      ctx.fillRect(x + 6,  bottom - 20, 10, 20);
      ctx.fillRect(x + 20, bottom - 20, 10, 13);
    } else {
      ctx.fillRect(x + 6,  bottom - 20, 10, 13);
      ctx.fillRect(x + 20, bottom - 20, 10, 20);
    }
  }

  private drawCactus(ctx: CanvasRenderingContext2D, x: number, w: number, h: number): void {
    ctx.fillStyle = '#535353';
    const armW   = Math.floor(w * 0.28);
    const trunkX = x + armW;
    const trunkW = w - armW * 2;

    // Trunk
    ctx.fillRect(trunkX, GROUND_Y - h, trunkW, h);

    // Left arm
    const armTop = GROUND_Y - Math.floor(h * 0.65);
    const armLen = Math.floor(h * 0.22);
    ctx.fillRect(x, armTop, armW, armLen);
    ctx.fillRect(x, armTop - Math.floor(h * 0.22), armW, Math.floor(h * 0.22));

    // Right arm
    ctx.fillRect(trunkX + trunkW, armTop, armW, armLen);
    ctx.fillRect(trunkX + trunkW, armTop - Math.floor(h * 0.22), armW, Math.floor(h * 0.22));
  }
  private drawTripleCactus(ctx: CanvasRenderingContext2D, x: number, h: number): void {
    for (const off of [0, 27, 54]) {
      this.drawCactus(ctx, x + off, 20, h);
    }
  }

  private drawUFO(ctx: CanvasRenderingContext2D, obs: Obstacle): void {
    const { x, w, h } = obs;
    const y = obs.y!;
    const cx = x + w / 2;
    const dishY = y + h * 0.68;
    const dishRx = w * 0.5;
    const dishRy = h * 0.22;

    // Dish body
    ctx.fillStyle = '#535353';
    ctx.beginPath();
    ctx.ellipse(cx, dishY, dishRx, dishRy, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dome (upper half-ellipse sitting on top of dish)
    ctx.fillStyle = '#6d6d6d';
    ctx.beginPath();
    ctx.ellipse(cx, dishY - 1, w * 0.27, h * 0.54, 0, Math.PI, 0, true);
    ctx.fill();

    // Lights row on bottom of dish
    ctx.fillStyle = '#dfdfdf';
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.arc(cx + i * w * 0.2, dishY + dishRy * 0.6, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}