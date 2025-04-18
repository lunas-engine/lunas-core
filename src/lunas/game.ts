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
   * All added callbacks
   */
  private callbacks: { [T in keyof GameCallback]: GameCallback[T][] } = {
    update: [],
    draw: [],
    onFocus: [],
    onBlur: [],
    onResize: [],
  };

  /**
   * Create and start the game.
   */
  constructor() {
    const canvas = document.getElementById('lunasCanvas') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('Canvas element with id "lunasCanvas" not found');
    }

    this.gl = this.getGLContext(canvas);

    canvas.focus();

    canvas.addEventListener('focus', () => this.onFocus());
    canvas.addEventListener('blur', () => this.onBlur());
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.onResize(width, height);
    });

    // Start the game loop.
    requestAnimationFrame((t: number) => {
      this.lastFrameTime = t;
      this.loop(t);
    });
  }

  /**
   * Add a callback to the game.
   * @param type - The type of the callback to add.
   * @param callback - The callback function to add.
   */
  addCallback<T extends keyof GameCallback>(type: T, callback: GameCallback[T]): void {
    this.callbacks[type].push(callback);
  }

  /**
   * Remove a callback from the game.
   * @param type - The type of the callback to remove.
   * @param callback - The callback function to remove.
   */
  removeCallback<T extends keyof GameCallback>(type: T, callback: GameCallback[T]): void {
    const index = this.callbacks[type].indexOf(callback);
    if (index !== -1) {
      this.callbacks[type].splice(index, 1);
    }
  }

  /**
   * Called when the canvas gains focus.
   */
  onFocus(): void {
    for (const callback of this.callbacks.onFocus) {
      callback();
    }
  }

  /**
   * Called when the canvas loses focus.
   */
  onBlur(): void {
    for (const callback of this.callbacks.onBlur) {
      callback();
    }
  }

  /**
   * Called when the browser window is resized.
   * @param width - The new width of the window.
   * @param height - The new height of the window.
   */
  onResize(width: number, height: number): void {
    for (const callback of this.callbacks.onResize) {
      callback(width, height);
    }
  }

  /**
   * The main game loop that updates and draws the game.
   * This method is called every frame.
   */
  private loop(t: number): void {
    const now = t;
    const timePassed = now - this.lastFrameTime;
    this.lastFrameTime = now;

    const dt = timePassed / 1000; // Convert to seconds
    this.update(dt);
    this.draw();

    requestAnimationFrame((t) => this.loop(t));
  }

  /**
   * Update the game state.
   * @param dt - The time passed since the last frame in seconds.
   */
  private update(dt: number): void {
    for (const callback of this.callbacks.update) {
      callback(dt);
    }
  }

  /**
   * Draw the game.
   */
  private draw(): void {
    // For now we will just clear the screen with a color.
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    for (const callback of this.callbacks.draw) {
      callback();
    }
  }

  /**
   * Get the WebGL2 rendering context from the canvas.
   * If WebGL2 is not supported, it falls back to WebGL.
   * @param canvas - The canvas element to get the context from.
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

/**
 * The callback types available for the game.
 */
type GameCallback = {
  update: (dt: number) => void;
  draw: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onResize: (width: number, height: number) => void;
};
