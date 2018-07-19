import axios from "axios";

export default {
  //*************** PRODUCT *****************/
  // Gets all products
  getProducts: function () {
    return axios.get("/api/products");
  },
  // Gets the products with the given id
  getProduct: function (id) {
    return axios.get("/api/products/" + id);
  },
  // Updates the product with the given id
  updateProduct: function (id, body) {
    // return axios.put("/api/products/" + id);
    return axios.put("/api/products/" + id, body);
  },
  // Deletes the product with the given id
  deleteProduct: function (id, body) {
    console.log('body in delete product', body)
    return axios.delete("/api/products/" + id, {data: body});
  },
  // Saves a product to the database
  saveProduct: function (productData) {
    return axios.post("/api/products", productData);
  },


  //*************** NOTE *****************/

  // Gets the notes with the given id
  getNote: function (memberId, productId) {
    //console.log("API.js" + ids)
    debugger;
    return axios.get("/api/notes/" + memberId + "/" + productId);


    //return axios.get(`/api/notes?memberid=${memberId}&productId=${productId}`);
    // return axios.get('api/notes/', {
    //   params: {
    //     memberId: memberId,
    //     productId: productId
    //   }
    // });
    //return axios.get('api/notes/' + memberId);
  },
  // Updates the notes with the given id
  updateNote: function (id, body) {
    // return axios.put("/api/notes/" + id, noteData);
    return axios.put("/api/notes/" + id, body);
  },
  // Deletes the note with the given id
  deleteNote: function (id) {
    return axios.delete("/api/notes/" + id);
  },
  // Saves a note to the database
  saveNote: function (noteData) {
    console.log("API.js" + noteData)
    return axios.post("/api/notes", noteData);
  },

  //*************** MEMBER *************************/
  // Gets the member with the given id
  getMember: function (id) {
    return axios.get("/api/members/" + id);
  },
  // Deletes the member with the given id
  deleteMember: function (id) {
    return axios.delete("/api/members/" + id);
  },
  // Update the member with the given id
  updateMember: function (id, body) {
    return axios.put("/api/members/" + id, body);
  },
  // // Update the member with the given id and product
  // findOneAndUpdateMember: function (id, body) {
  //   return axios.put("/api/members/" + id, body);
  // },
  // Saves a member to the database
  saveMember: function (memberData) {
    return axios.post("/api/members", memberData);
  },
  // Gets the member with the given Auth0 id
  authMember: function (authData) {
    return axios.post("/api/members/auth", authData);
  },

  //*************** SESSION *************************/
  // Gets the member with the given email/pass
  signIn: function (loginData) {
    return axios.post("/api/account/signin", loginData);
  },
  // Signs out the member with the given id
  signOut: function (logoutData) {
    return axios.post("/api/account/signout", logoutData);
  },
  // Signs out the member with the given id
  verify: function (verifyData) {
    return axios.post("/api/account/verify", verifyData);
  }
};