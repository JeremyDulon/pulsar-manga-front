/*
export function someGetter (state) {
}
*/

export const getTransitionNext = (state) => {
  return state.transitionNext
}

export const getTransitionPrev = (state) => {
  return state.transitionPrev
}

export const getVertical = (state) => {
  return state.vertical
}
