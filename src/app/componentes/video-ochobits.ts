import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { Icono } from './icono';

/**
 * Imagen en pixel art que se convierte en video mientras el cursor está encima.
 * En pantallas táctiles se activa y desactiva con un toque.
 */
@Component({
  selector: 'app-video-ochobits',
  imports: [Icono],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure>
      <div
        class="marco"
        (mouseenter)="reproducir()"
        (mouseleave)="detener()"
        (click)="alternar($event)"
      >
        <img
          src="img/dexxa-8bits.jpg"
          width="300"
          height="300"
          alt="Ilustración en pixel art de José María con su notebook y el cartel «¡El desarrollador te desafía!»"
        />
        @if (activo()) {
          <video
            #video
            src="video/dexxa-8bits.mp4"
            autoplay
            loop
            playsinline
            [muted]="!sonido()"
            (canplay)="asegurarReproduccion()"
            aria-label="Video en 8 bits: el desarrollador te desafía"
          ></video>
          <button
            type="button"
            class="sonido"
            (click)="alternarSonido($event)"
            [attr.aria-label]="sonido() ? 'Silenciar' : 'Activar sonido'"
          >
            <app-icono [nombre]="sonido() ? 'sonido' : 'silencio'" />
          </button>
        }
      </div>
      <figcaption class="mono">
        {{ activo() ? '▶ el desarrollador te desafía' : 'pasá el cursor por la imagen' }}
      </figcaption>
    </figure>
  `,
  styles: `
    figure {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .marco {
      position: relative;
      aspect-ratio: 1;
      border: 1px solid var(--borde);
      border-radius: 8px;
      overflow: hidden;
      background: var(--pixel);
      cursor: pointer;
    }
    img,
    video {
      width: 100%;
      height: 100%;
      display: block;
      image-rendering: pixelated;
    }
    img {
      object-fit: cover;
    }
    video {
      position: absolute;
      inset: 0;
      object-fit: contain;
      background: var(--pixel);
    }
    .sonido {
      position: absolute;
      right: 8px;
      bottom: 8px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid #34435f;
      background: rgba(11, 18, 32, 0.85);
      color: #e6eaf2;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    figcaption {
      font-size: 12px;
      color: var(--texto-4);
      text-align: center;
    }
  `,
})
export class VideoOchobits {
  protected readonly activo = signal(false);
  protected readonly sonido = signal(false);
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');

  reproducir() {
    this.activo.set(true);
  }

  detener() {
    this.activo.set(false);
    this.sonido.set(false);
  }

  alternar(e: Event) {
    if ((e.target as HTMLElement).closest('button')) return;
    this.activo() ? this.detener() : this.reproducir();
  }

  alternarSonido(e: Event) {
    e.stopPropagation();
    this.sonido.update((s) => !s);
    const v = this.video()?.nativeElement;
    if (v) {
      v.muted = !this.sonido();
      v.play().catch(() => {});
    }
  }

  /** Los navegadores solo reproducen solos los videos silenciados. */
  asegurarReproduccion() {
    const v = this.video()?.nativeElement;
    if (!v) return;
    v.muted = !this.sonido();
    v.play().catch(() => {});
  }
}
