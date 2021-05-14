const reducer = (state, action) => {

  if (action.type === 'PROFILE_EDIT') {
    console.log('edit r');

    return { ...state, profileEditView: action.payload }
  }
  if (action.type === 'PROFILE_VIEW') {
    console.log('view r');

    return { ...state, profileEditView: action.payload }
  }

  throw new Error('no matching action type')
}

export default reducer
