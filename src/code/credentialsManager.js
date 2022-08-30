import axiosInstance from "./http"

import { TOKEN_NAME } from "./constance";
import { USER_NICKNAME } from "./constance";

export default class CredentialsManager{
    
    token = null;
    nickname = null;

    setCredentials(token, nickname){
            this.token = token;
            localStorage.setItem(TOKEN_NAME, token);
            axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
            this.nickname = nickname;
            localStorage.setItem(USER_NICKNAME, nickname);
    }

    removeCredentials(){
        this.token = null;
        this.nickname = null;
        localStorage.removeItem(TOKEN_NAME);
        localStorage.removeItem(USER_NICKNAME);
        delete axiosInstance.defaults.headers["Authorization"];

    }

    findCredentialsData(){
        const token = localStorage.getItem(TOKEN_NAME);
        const nickname = localStorage.getItem(USER_NICKNAME);
        if (token != null && nickname) {
            this.setCredentials(token, nickname);
        }
    }

    getToken(){
        return this.token;
    }

    getNickname(){
        return this.nickname;
    }

    isUserCredentialsData(){
        return this.token != null && this.nickname != null;
    }

}