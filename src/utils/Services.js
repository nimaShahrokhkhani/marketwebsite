import axios from "./axios";
import history from "../history";

export default class Services {

    static signIn(requestData) {
        return axios.post(`/login` , {
            username: requestData.username,
            password: requestData.password,
        })
    }

    static getProductsList(requestData) {
        return axios.get(`/products/list` , requestData)
    }

    static async insertProduct(requestData) {
        return axios.post(`/products/insert` , requestData)
    }

    static getCompaniesList(requestData) {
        return axios.get(`/companies/list` , requestData)
    }

    static async insertCompany(requestData) {
        return axios.post(`/companies/insert` , requestData)
    }

    static getUsersList(requestData) {
        return axios.get(`/users/list` , requestData)
    }

    static async insertUser(requestData) {
        return axios.post(`/users/insert` , requestData)
    }
}
