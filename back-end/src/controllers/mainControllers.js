const fs = require('fs');

const path = require('path');

const controller = {
    index: (req, res) => res.render('redirect'),
    ageDate: (req, res) => {
        res.render('ageDate');
    },
    processAgeDate:  (req, res) => {
        const day = req.body.day;
        const month = req.body.month;
        const year = req.body.year;
        const currentDate = new Date();
        const currentYear = parseInt(currentDate.getFullYear());
        const currentMonth = parseInt(currentDate.getMonth()) + 1;
        const currentDay = parseInt(currentDate.getDate());
       let date = currentYear - year ;  
        if(currentMonth< month){
            date = date - 1;
        } else if (currentMonth == month) {
            if (currentDay < day){
                date = date - 1;
            }
        } 
        if (date > 17){
            res.redirect('/home')
        } else {
            res.redirect('/redirectMinors')
        }
    },
    redirectMinors: (req, res) => {
        res.render('redirectMinors')
    },
    home: (req, res) => res.render('home'),
    cart: (req, res) => res.render('carrito')
}
module.exports = controller;