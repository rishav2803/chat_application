import axios from 'axios'
import { messageRoute, postMessagess, recentContacts } from '../utils/APIRoutes'


export async function getAllMessage(sender, receiver) {
    const { data } = await axios.get(`${messageRoute}/${sender}/to/${receiver}`);
    return data;
}

export async function postMessage(messageParam) {
    const { data } = await axios.post(postMessagess, messageParam);
    return data;
}

export async function getRecentContacts(sender) {
    const { data } = await axios.get(`${recentContacts}/${sender}/contacts`);
    return data;
}

