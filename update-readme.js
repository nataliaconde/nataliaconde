const fs = require('fs');
const Handlebars = require("handlebars");
const axios = require("axios");

const formatMonth = (month) => {
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
    return date
}

const readFile = async() => {
    let input = {}
    const { data } = await axios.get("https://type.fit/api/quotes");
    const randomNumber = Math.floor(Math.random() * data.length);
    const selectedQuote = data[randomNumber];
    input.selectedQuote = selectedQuote;
    input.lastUpdate = formatMonth();
    console.log(input)
    const file = fs.readFileSync('README.template.hbs', 'utf-8');
    const template = Handlebars.compile(file);
    const source = template(input);
    await fs.writeFileSync('README.md', source);
}

readFile();