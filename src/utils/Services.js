import axios from "./axios";
import history from "../history";

export default class Services {

    static baseUrl = 'http://localhost:3500/';

    static getProductImageDownloadUrl(fileName){
      return this.baseUrl + `products/download?fileName=` + fileName;
    }

    static getProductCategoryImageDownloadUrl(fileName){
      return this.baseUrl + `productCategory/download?fileName=` + fileName;
    }

    static getHighlightImageDownloadUrl(fileName){
      return this.baseUrl + `highlight/download?fileName=` + fileName;
    }

    static uploadHighlightImage(requestData){
        return axios.post(`/highlight/uploadImage`, requestData)
    }

    static signIn(requestData) {
        return axios.post(`/login`, {
            username: requestData.username,
            password: requestData.password,
        })
    }

    static getProductsList(requestData) {
        return axios.get(`/products/list`, {
            params: requestData
        })
    }

    static getProductsNewCollectionList(requestData) {
        return axios.get(`/products/newCollection`, {
            params: requestData
        })
    }

    static async insertProduct(requestData) {
        return axios.post(`/products/insert`, requestData)
    }

    static async deleteProduct(requestData) {
        return axios.post(`/products/delete`, requestData)
    }

    static async editProduct(requestData) {
        return axios.post(`/products/edit`, requestData)
    }

    static getHighlightList(requestData) {
        return axios.get(`/highlight/list`, {
            params: requestData
        })
    }

    static async insertHighlight(requestData) {
        return axios.post(`/highlight/insert`, requestData)
    }

    static async deleteHighlight(requestData) {
        return axios.post(`/highlight/delete`, requestData)
    }

    static async editHighlight(requestData) {
        return axios.post(`/highlight/edit`, requestData)
    }

    static getProductCategoryList(requestData) {
        return axios.get(`/productCategory/list`, requestData)
    }

    static async insertProductCategory(requestData) {
        return axios.post(`/productCategory/insert`, requestData)
    }

    static async editProductCategory(requestData) {
        return axios.post(`/productCategory/edit`, requestData)
    }

    static async deleteProductCategory(requestData) {
        return axios.post(`/productCategory/delete`, requestData)
    }

    static getCompaniesList(requestData) {
        return axios.get(`/companies/list`, requestData)
    }

    static async insertCompany(requestData) {
        return axios.post(`/companies/insert`, requestData)
    }

    static getUsersList(requestData) {
        return axios.get(`/users/list`, requestData)
    }

    static async insertUser(requestData) {
        return axios.post(`/users/insert`, requestData)
    }

    static async insertUser(requestData) {
        return axios.get(`/products/download`, requestData)
    }
}
