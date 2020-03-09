import axios from 'axios'

let isState
let userReducer

async function getAuth() {
    const localToken = localStorage.getItem("token") || null



    let response = await axios({
        url: '/api/checkauth',
        method: 'POST',
        timeout: 70000,
        headers: { 'Authorization': `Bearer ${localToken}` },
    })

    let isAuth = response.data.msg



    isState = {
        token: localToken,
        isAuth
    }
}

getAuth()

 userReducer = (state = isState, action) => {
    if (action.type === "CHANGENAME") {
        return {
            ...state,
            name: action.payload
        }
    }
    return state
}

export default userReducer