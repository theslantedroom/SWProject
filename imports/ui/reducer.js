const reducer = (state, action) => {

  if (action.type === 'PROFILE_EDIT') {

    return { ...state, profileEditView: true }
  }
  if (action.type === 'PROFILE_VIEW') {

    return { ...state, profileEditView: false }
  }

  throw new Error('no matching action type')
}

export default reducer
