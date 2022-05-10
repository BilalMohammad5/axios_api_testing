const axios = require('axios');
const {expect} = require('chai');

describe("book_store_features", async () => {
    it("access_bookstore_app", async () => {
        const response = await axios.get('https://demoqa.com/BookStore/v1/Books', { // calling get all books
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        expect(response.status).equals(200); // asserting if the response code is 200
    })

    it("add_book_to_users_collection", async () => {
        const response = await axios.post('https://demoqa.com/BookStore/v1/Books', { // adding book and user details
            "userId": "e1031f14-86e9-408b-b621-283ab0bc63fc",
            "collectionOfIsbns": [
                {
                    "isbn": "9781449365035"
                }
            ],
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3R1c2VyIiwicGFzc3dvcmQiOiJJbmRpQDIwMjAiLCJpYXQiOjE2NTIxNjA4OTF9.ssLUhObZr1i-nPiZTcqKIT4ai-AEfQPIBO1AJ-VCKhM'
            }
        });
        console.log(response.data);
        expect(response.status).equals(200); // asserting if the response code is 200
        expect(response.id).equals(101)

    })
    it("access_user_profile_and_validate_added_book", async () => {
        const response = await axios.get('https://demoqa.com/Account/v1/User/e1031f14-86e9-408b-b621-283ab0bc63fc', { // fetching user details


            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3R1c2VyIiwicGFzc3dvcmQiOiJJbmRpQDIwMjAiLCJpYXQiOjE2NTIxNjA4OTF9.ssLUhObZr1i-nPiZTcqKIT4ai-AEfQPIBO1AJ-VCKhM'
            }
        });
        console.log(response.data);
        expect(response.status).equals(200); // asserting if the response code is 200
        expect(response.isbn).equals(101) // should contain 
    })


    it("delete_all_books", async () => {
        const response = await axios.delete('https://demoqa.com/BookStore/v1/Books?UserId/e1031f14-86e9-408b-b621-283ab0bc63fc', { // deleting all books from user
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3R1c2VyIiwicGFzc3dvcmQiOiJJbmRpQDIwMjAiLCJpYXQiOjE2NTIxNjA4OTF9.ssLUhObZr1i-nPiZTcqKIT4ai-AEfQPIBO1AJ-VCKhM'
            }
        });
        console.log(response.data);
        expect(response.status).equals(200); // asserting if the response code is 200
    })


});
