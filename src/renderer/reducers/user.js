import * as types from '../constants/ActionTypes'
import { combineReducers } from 'redux'

const initialState = null

export default (state = initialState, action) => {
	switch (action.type) {
		case types.DISCONNECT_AUTH:
			return initialState
		case types.RECEIVE_USER:
			return action.user
		default:
			return state
	}
}
