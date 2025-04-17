/**
 * The main game class that handles the game loop and rendering.
 */
export class Game {
  /**
   * The time of the last update in milliseconds.
   */
  private lastFrameTime = 0;

  /**
   * The WebGL2 rendering context.
   */
  private gl: WebGL2RenderingContext;

  /**
   * Create and start the game.
   */
  constructor() {
    const canvas = document.getElementById('lunasCanvas') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('Canvas element with id "lunasCanvas" not found');
    }

    this.gl = this.getGLContext(canvas);

    // Start the game loop.
    requestAnimationFrame(() => {
      this.lastFrameTime = performance.now();
      this.loop();
    });
  }

  /**
   * The main game loop that updates and draws the game.
   * This method is called every frame.
   */
  private loop(): void {
    const now = performance.now();
    const timePassed = now - this.lastFrameTime;
    this.lastFrameTime = now;

    const dt = timePassed / 1000; // Convert to seconds
    this.update(dt);
    this.draw();

    requestAnimationFrame(() => this.loop());
  }

  /**
   * Update the game state.
   * @param _dt The time passed since the last frame in seconds.
   */
  private update(_dt: number): void {
    // Update game logic here
  }

  /**
   * Draw the game.
   */
  private draw(): void {
    // For now we will just clear the screen with a color.
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    // Draw the game here.
  }

  /**
   * Get the WebGL2 rendering context from the canvas.
   * If WebGL2 is not supported, it falls back to WebGL.
   * @param canvas The canvas element to get the context from.
   * @returns The WebGL2 rendering context.
   */
  private getGLContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
    let gl = canvas.getContext('webgl2') as WebGL2RenderingContext;

    // WebGL2 is not supported, try WebGL.
    if (!gl) {
      gl = canvas.getContext('webgl') as WebGL2RenderingContext;
      if (!gl) {
        throw new Error('Unable to initialize WebGL context.');
      }
    }

    return gl;
  }
}
