import { SMALL_MODE_TOGGLE } from '../actions/smallMode';

type smallModeActionType = {
  +type: string,
  +on: boolean
};

export default function smallMode(state: boolean = false, action: any) {
  switch (action.type) {
    case SMALL_MODE_TOGGLE:
      return action.on;
    default:
      return state;
  }
}
