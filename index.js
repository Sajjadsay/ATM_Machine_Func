import inquirer from "inquirer";
import { options } from './names.js';
const userfunc = () => {
    const uname = options;
    let randn = Math.floor(Math.random() * 15);
    return uname[randn];
};
const createUser = () => {
    let users = [];
    for (let i = 1; i <= 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: userfunc(),
            accountnumber: Math.floor(1000000 * Math.random() * 1000000),
            balance: 100000 * i
        };
        users.push(user);
    }
    return users;
};
const atmmachine = async (users) => {
    const response = await inquirer.prompt({
        type: "number",
        message: "Please enter your PIN",
        name: "pin"
    });
    const user = users.find(user => user.pin === response.pin);
    if (user) {
        console.log("Welcome ", user.name);
        atmfunc(user);
    }
    else {
        console.log("Invalid PIN");
    }
};
const atmfunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        choices: ["Withdraw", "Balance", "Exit"],
        message: "Please select your choice"
    });
    if (ans.select === "Withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            name: "amountwithdraw",
            message: "Please enter your amount :"
        });
        if (amount.amountwithdraw > user.balance) {
            console.log("Insufficient balance.");
            console.log("Current balance :", user.balance);
        }
        else if (amount.amountwithdraw > 25000) {
            console.log("You cannot withdraw more than 'Twenty five thaousands'");
        }
        else {
            user.balance = user.balance - amount.amountwithdraw;
            console.log("Withdraw amount :", amount.amountwithdraw);
            console.log("Current balance :", user.balance);
        }
    }
    if (ans.select === "Balance") {
        console.log("Current balance :", user.balance);
    }
    if (ans.select === "Exit") {
        console.log("Thanks for using our service.");
    }
};
let users = createUser();
// atmmachine(users);
console.log(users);
