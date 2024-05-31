const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const CustomersModel = require('./models/customer')

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`)

const intro = async () => {
await mongoose.connect(process.env.MONGODB_URI);

console.log('====================================================')
console.log('Welcome to CRM')
console.log('--------------')
console.log('What would you like to do?')
console.log('--------------------------')
console.log('1. Create a customer      |')
console.log('2. View all customers     |')
console.log('3. Update a customer      |')
console.log('4. Delete a customer      |')
console.log('5. quit                   |')
console.log('--------------------------')


const numberPrompt = parseInt(prompt('Number of action to run: '));

console.log(numberPrompt);

if (numberPrompt === 1) {
    const namePrompt = prompt("What is the customer's name? ")
    console.log('-')
    const agePrompt = parseInt(prompt(`What is ${namePrompt}'s age? `))
    console.log('-')
    const cust = await CustomersModel.create({
        name: `${namePrompt}`,
        age: `${agePrompt}`
    })
    console.log(`Customer: "${namePrompt}, ${agePrompt}" Created`)
    console.log('====================================================')

    intro()

    } else if (numberPrompt === 2) {
        await getAllCustomers()
        intro()

    } else if (numberPrompt === 3) {
        await getAllCustomers()
        const idPrompt = prompt(`Enter the ID of customer to update: `)
        console.log('-')
        const nameUpdatePrompt = prompt('Enter new name for customer: ')
        console.log('-')
        const ageUpdatePrompt = parseInt(prompt('Enter new age for customer: '))
        console.log('-')
        const cust = await CustomersModel.findByIdAndUpdate(
            idPrompt,
            {name: nameUpdatePrompt, age: ageUpdatePrompt},
            {new: true}
        )
        console.log(`Customer: "${nameUpdatePrompt}, ${ageUpdatePrompt}" Updated`)
        console.log('====================================================')
        intro()

    } else if (numberPrompt === 4) {
        await getAllCustomers()
        const idDeletePrompt = prompt(`Enter the ID of customer to delete: `)
        console.log('-')
        const cust = await CustomersModel.findOneAndDelete({_id: idDeletePrompt})
        console.log('Customer deleted.')
        console.log('====================================================')
        intro()

    } else if (numberPrompt === 5) {
        await mongoose.disconnect();
        console.log('====================================================')
        console.log('Thank you for using CRM!');
        console.log('Now exiting...');
        console.log('====================================================')
        process.exit();
    }



}

async function getAllCustomers() {
    const allCustomers = await CustomersModel.find({});
    console.log('====================================================')
    // console.log(allCustomers)
    allCustomers.map((customer) => {
        return console.log(`
        id: ${customer._id} \n
        Name: ${customer.name} \n
        Age: ${customer.age}
        `)
    })
    console.log('====================================================')

}

intro()

