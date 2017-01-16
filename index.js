import SimpleEventer from 'simple-eventer';
import viewport from 'viewport';

let defaults = {
  segments: [
    {
      name: 'mobile',
      min: 0,
      max: 750,
      base: {
        width: 750,
        fontSize: 10
      },
      factor: 0.6
    },
    {
      name: 'desktop',
      min: 751,
      max: Number.MAX_SAFE_INTEGER,
      base: {
        width: 1920,
        fontSize: 10
      },
      factor: 0.5
    }
  ]
};

export default class Scaler extends SimpleEventer {
  constructor(options) {
    super();

    if (Scaler.singletonInstance) {
      return Scaler.singletonInstance;
    }

    Scaler.singletonInstance = this;

    this.settings = Object.assign({}, defaults, options);

    this.viewport = null;
    this.segment = null;
    this.fontSize = null;

    this.init();
  }

  init() {
    window.addEventListener('resize', this.rescale.bind(this));
    this.rescale();
  }

  rescale() {
    this.updateViewport();
    this.updateSegment();
    this.updateFontSize();
    this.fire('changed');
  }

  updateViewport() {
    this.viewport = viewport();
  }

  updateSegment() {
    for(let i = 0, sLen = this.settings.segments.length; i < sLen; i++) {
      let segment = this.settings.segments[i];

      if(this.viewport.width <= segment.max && this.viewport.width >= segment.min) {
        if(this.segment !== segment) {
          this.segment = segment;
          this.fire('changed.segment');
        }
        return;
      }
    }

    this.segment = null;
  }

  updateFontSize() {
    if(this.segment) {
      this.fontSize =
        (
          (
            (
              this.segment.base.fontSize * this.viewport.width / this.segment.base.width
            )
            - this.segment.base.fontSize
          )
          * this.segment.factor
        )
        + this.segment.base.fontSize;
      window.document.documentElement.style.fontSize = this.fontSize + 'px';
    } else {
      window.document.documentElement.style.fontSize = 'auto';
    }
  }
}
