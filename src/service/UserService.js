import axios from 'axios'
import { registerRoute, loginRoute, usersRoute } from '../utils/APIRoutes'


export async function createUser(param) {
    const { data } = await axios.post(registerRoute, param)
    return data
}

export async function authenticateUser(param) {
    const { data } = await axios.post(loginRoute, param)
    return data
}

export async function getAllUsers() {
    const { data } = await axios.get(usersRoute)
    return data
}