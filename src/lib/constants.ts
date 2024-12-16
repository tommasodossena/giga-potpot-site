// Loader Animation
export const LOADER_ANIMATION = {
  ROTATION_DURATION: 1.5,
  SCALE_DURATION: 2,
  CLIP_PATH_DURATION: 1.5,
} as const;

// Pot Animation
export const POT = {
  MOUSE_DISTANCE: 400,
  WAIT_TIME: 500,
  FALL_DELAY: 200,
  ROTATIONS: [90, -90],
  SIZES: [100, 125, 150, 175, 200],
  VARIANTS: 6,
} as const;

// Animation Easings
export const EASINGS = {
  ROTATION: "power4.inOut",
  SCALE: "power4.inOut",
  CLIP_PATH: "power4.inOut",
  POT_IN: "back.out(1.75)",
  POT_OUT: "power2.in",
} as const;
