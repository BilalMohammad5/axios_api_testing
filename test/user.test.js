const axios = require('axios');
const {expect} = require('chai');

const envVariables = require('../env.json');
const fs = require('fs');

describe("user_related_transactions", async () => {

    it("create_new_user", async () => {
        const response = await axios.post('https://demoqa.com/Account/v1/User', { // new user details

            "userName": "test+" + Math.random().toString(36).substring(2,5),
            "password": envVariables.password

        }, {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(res => res.data)
        console.log(response);
        envVariables.userid =  response.userID ;
        envVariables.username = response.username;
        fs.writeFileSync('./env.json', JSON.stringify(envVariables));
        // writing username and password  to environment file
        console.log("writing user data to environment file");
    })

    // generate auth token

    it("generate_token", async () => {
        const response = await axios.post('https://demoqa.com/Account/v1/GenerateToken', {
            "userName": envVariables.username,
            "password": envVariables.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data)
        console.log(response);

        envVariables.token = response.token; // get and set the token to environment token variable
        fs.writeFileSync('./env.json', JSON.stringify(envVariables)); // write the token to the environment.json file

    })

    // delete user
    it("delete_user_account", async () => {
        const response = await axios.delete(`https://demoqa.com/Account/v1/User/${envVariables.userid}`, { // user detail

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(res => res.data)
        console.log(response);
        expect(response.status).equals(200); // asserting if the response code is 200

    })


})
