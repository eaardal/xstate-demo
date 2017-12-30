export const GET_CHARACTER_START = "GET_CHARACTER_START";
export const GET_CHARACTER_SUCCESS = "GET_CHARACTER_SUCCESS";
export const GET_CHARACTER_FAIL = "GET_CHARACTER_FAIL";

export const getCharacterStart = () => ({
  type: GET_CHARACTER_START
});

export const getCharacterSuccess = char => ({
  type: GET_CHARACTER_SUCCESS,
  char
});

export const getCharacterFail = error => ({
  type: GET_CHARACTER_FAIL,
  error
});

export const getNextCharacter = () => async (dispatch, getState) => {
  dispatch(getCharacterStart());
  try {
    const id = getState().character.characterId + 1;
    const data = await fetch(
      `https://swapi.co/api/people/${id}/?format=json`
    ).then(res => res.json());
    dispatch(getCharacterSuccess(data));
  } catch (error) {
    dispatch(getCharacterFail(error));
  }
};
