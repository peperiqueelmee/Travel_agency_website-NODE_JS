import { Testimonial } from '../models/Testimoniales.js'

const saveTestimonial = async (req, res) => {

    //Validate
    const { name, email, message } = req.body;

    const errors = [];

    if (name.trim() == '') {
        errors.push({ message: 'El nombre esta vacio' });
    }

    if (email.trim() == '') {
        errors.push({ message: 'El email esta vacio' });
    }

    if (message.trim() == '') {
        errors.push({ message: 'El mensaje esta vacio' });
    }

    if (errors.length > 0) {

        //Query Testimonials
        const testimonials = await Testimonial.findAll({ limit: 3 });

        //Show view with errors
        res.render('testimonials', {
            page: 'Testimoniales',
            errors,
            name,
            email,
            message,
            testimonials
        })
    } else {

        //Save to Data Base
        try {
            await Testimonial.create({
                name,
                email,
                message
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}


export {
    saveTestimonial
}