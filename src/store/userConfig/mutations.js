/*
export function someMutation (state) {
}
*/

export const setVertical = (state, vertical) => {
  state.vertical = vertical
  return state.vertical
}

export const setTransitionPrev = (state, transition) => {
  return state.transitionPrev
}

export const setTransitionNext = (state, transition) => {
  state.transitionPrev = state.transitionNext
  if (state.vertical === 'false') {
    if (transition === 'right') {
      state.transitionPrev = 'left'
    } else {
      state.transitionPrev = 'right'
    }
  } else {
    if (transition === 'up') {
      state.transitionPrev = 'down'
    } else {
      state.transitionPrev = 'up'
    }
  }
  state.transitionNext = transition
  return state.transitionNext
}
