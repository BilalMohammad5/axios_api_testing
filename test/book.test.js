const axios = require('axios');
const {expect} = require('chai');
const envVariables = require('../env.json');
const bookVariables = require('../books.json');
const fs = require('fs');
const {finished} = require('stream');

// import {parse, stringify} from 'flatted';

describe("book_store_features", async () => {

    it("access_bookstore_app", async () => {
        const response = await axios.get('https://demoqa.com/BookStore/v1/Books', { // calling get all books
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data)
        console.log(response);
        expect(response.books[0].isbn).equals(bookVariables.books[0].isbn); //validating that response json has proper data. same step can be implemented for all the fields inside JSON
    })

    it("add_one_book_to_users_collection", async () => {
        const response = await axios.put(`https://demoqa.com/BookStore/v1/Books/${bookVariables.books.isbn}`, { // adding book and user details

        
            "userId": envVariables.userid,
            "isbn": bookVariables.books[0].isbn
          

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariables.token
                }


            }).then(res => res.data)
            console.log('adding book for user' + envVariables.userid + "with token" + envVariables.token),
            console.log(response.data);
            // expect(response.status).equals(201);

        })
        it("access_user_profile_and_validate_added_book", async () => {
            const response = await axios.get(`https://demoqa.com/Account/v1/User/${envVariables.userid}`, 
            { // fetching user details


                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariables.token
                }
            }).then(res => res.data)
            console.log(response.data);
            expect(response.status).equals(200); // asserting that response code is 200

            expect(response.books[0].isbn[0]).equals(bookVariables.books[0].isbn); //validating that added book is present in a response json

        })


        it("delete_all_books", async () => {
            const response = await axios.delete(`https://demoqa.com/Account/v1/User/${envVariables.userid}`, { // deleting all books from user
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': envVariables.token
                }
            }).then(res => res.data)
            console.log(response.data);
            expect(response.status).equals(200); // asserting if the response code is 200
        })


    });
