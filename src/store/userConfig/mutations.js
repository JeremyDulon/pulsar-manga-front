/*
export function someMutation (state) {
}
*/

export const setVertical = (state, vertical) => {
  state.vertical = vertical
  setVerticalTransition(state)
  return state.vertical
}

export const setTransitionPrev = (state, transition) => {
  return state.transitionPrev
}

export const setTransitionNext = (state, transition) => {
  state.transitionPrev = state.transitionNext
  state.transitionNext = transition
  setTransition(state)
  return state.transitionNext
}

function setTransition (state) {
  if (state.vertical === 'false') {
    if (state.transitionNext === 'right') {
      state.transitionPrev = 'left'
    } else {
      state.transitionPrev = 'right'
    }
  } else {
    if (state.transitionNext === 'up') {
      state.transitionPrev = 'down'
    } else {
      state.transitionPrev = 'up'
    }
  }
}

function setVerticalTransition (state) {
  console.log(state.vertical)
  if (state.vertical === 'false') {
    state.transitionNext = 'left'
    state.transitionPrev = 'right'
  } else {
    state.transitionNext = 'down'
    state.transitionPrev = 'up'
  }
}
