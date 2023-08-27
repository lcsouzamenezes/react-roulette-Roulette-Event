export interface WheelConfig {
  canvasId: string;
  numSegments: number;
  outerRadius: number;
  textFontSize: number;
  responsive: boolean;
  lineWidth: number;
  drawMode: string;
  segments: WheelSegment[];
  animation: WheelAnimation;
}

export interface WheelSegment {
  fillStyle: string;
  strokeStyle: string;
  text: string;
  textFillStyle: string;
}

export interface WheelAnimation {
  type: string;
  duration: number;
  spins: number;
  easing: string;
  stopAngle?: number;
  direction: string;
  repeat: number;
  yoyo?: boolean;
}

export interface Spin {
  spinning: boolean;
  stopping: boolean;
}

export interface WinnigSegment {
  text: string;
}
