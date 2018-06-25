import axios from "axios";

export default {
    // Gets all members
    getMembers: function () {
        return axios.get("/api/members");
    },
    // Gets the member with the given id
    getMember: function (id) {
        return axios.get("/api/members/" + id);
    },
    // Deletes the member with the given id
    deleteMember: function (id) {
        return axios.delete("/api/members/" + id);
    },
    // Saves a member to the database
    saveMember: function (bookData) {
        return axios.post("/api/members", bookData);
    },

    // Gets all products
    getProducts: function () {
        return axios.get("/api/products");
    },
    // Gets the product with the given id
    getProduct: function (id) {
        return axios.get("/api/products/" + id);
    },
    // Deletes the product with the given id
    deleteProduct: function (id) {
        return axios.delete("/api/products/" + id);
    },
    // Saves a product to the database
    saveProduct: function (bookData) {
        return axios.post("/api/products", bookData);
    }
};