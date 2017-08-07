export const SMALL_MODE_TOGGLE = 'SMALL_MODE_TOGGLE';

export function smallModeToggle(on: boolean) {
  return {
    type: SMALL_MODE_TOGGLE,
    on: on
  };
}
