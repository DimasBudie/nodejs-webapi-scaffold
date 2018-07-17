const test = require("tape");
const service = require("../app/service/userService");

test("getByLogin should throw exception if username invalid", (t) => {
    try {
        service.getByLogin("", "any-password");
    } catch (error) {
        t.assert(error, "username is mandatory");
        t.end();
    }
});

test("getByLogin should throw exception if password invalid", (t) => {
    try {
        service.getByLogin("any-username", "");
    } catch (error) {
        t.assert(error, "password is mandatory");
        t.end();
    }
});

test("getByLogin should throw exception if username not found", (t) => {
    try {
        service.getByLogin("any-invalid-username", "any-password");
    } catch (error) {
        t.assert(error, "Invalid credentials");
        t.end();
    }
});

test("getByLogin should return auth-user if username and password is valid", (t) => {
    let result = service.getByLogin("admin", "admin");
    t.assert(result.name == "admin", "name checked")
    t.assert(result.username == "admin@app.com", "username checked");
    t.end();
});

test("getByUsername should throw exception if username invalid", (t) => {
    try {
        service.getByUsername("");
    } catch (error) {
        t.assert(error == "username is mandatory");
        t.end();
    }
});

test("getByUsername should return auth-user if username valid", (t)=>{
    let result = service.getByUsername("admin");
    t.assert(result.name == "admin", "name checked");
    t.assert(result.username == "admin@app.com", "username checked");
    t.end();
});