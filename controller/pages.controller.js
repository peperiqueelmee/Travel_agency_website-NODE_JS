import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const indexPage = async (req, res) => {
    //consult 3 travels and 3 testimonials
    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 3
    }));

    try {
        const result = await Promise.all(promiseDB);

        res.render('index', {
            page: 'Inicio',
            clase: 'home',
            travels: result[0],
            testimonials: result[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const usPage = (req, res) => {

    res.render('us', {
        page: 'Nosotros'
    });
}

const travelsPage = async (req, res) => {
    //Query BD
    const travels = await Viaje.findAll();

    res.render('travels', {
        page: 'Proximos Viajes',
        travels
    });
}

const testimonialsPage = async (req, res) => {

    try {

        const testimonials = await Testimonial.findAll({
            order: [
                ['id', 'DESC']
            ],
            limit: 3
        });

        res.render('testimonials', {
            page: 'Testimoniales',
            testimonials
        });

    } catch (error) {
        console.log(error)
    }
}


//Show travel for slug
const detailPageTravel = async (req, res) => {

    const { slug } = req.params;

    try {
        const travel = await Viaje.findOne({ where: { slug } });

        res.render('travel', {
            page: 'Información Viaje',
            travel
        })
    } catch (error) {
        console.log(error);
    }
}

const pageNotFound = (req, res) => {

    res.render('page_not_foud', {
        page: 'Pagina no encontrada'
    });
}


export {
    indexPage,
    usPage,
    travelsPage,
    testimonialsPage,
    detailPageTravel,
    pageNotFound,
}