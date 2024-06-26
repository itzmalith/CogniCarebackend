const asyncHanlder = require('express-async-handler')
const User = require('../models/user.model')
const i18n = require("i18n");
const logger = require('../utils/log4jsutil.js');
const AppError = require('../utils/app.error');
const Appointment = require('../models/appoinment.model.js');

// @desc    Get appointments by user ID
// @route   GET /api/v1/appointments/:userId
// @access  Public
 
const getAppointmentsByUserId = async (req, res) => {
    logger.trace("[appointmentController] :: getAppointmentsByUserId() : Start");

    const userId = req.params.id;

    try {
        const appointments = await Appointment.find({ userId: userId });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for the user' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        logger.error("[appointmentController] :: getAppointmentsByUserId() : Error", error);
        res.status(500).json({ message: 'Internal server error' });
    }

    logger.trace("[appointmentController] :: getAppointmentsByUserId() : End");
};

module.exports = getAppointmentsByUserId;


// @desc    Create a new appointment
// @route   POST /api/v1/appointments
// @access  Public
const createAppointment = asyncHanlder(async (req, res) => {
    logger.trace("[appointmentController] :: createAppointment() : Start");
    const { userId, doctor, petName, ownerName, aptNotes, aptDate } = req.body;

    if (!userId) {
        logger.error("[appointmentController] :: createAppointment() : User ID is required");
        throw new AppError(400,i18n.__("USER_ID_IS_REQUIRED"));
    }
    

    const userExists = await User.findOne({ _id: userId });

    if (!userExists) {
        logger.error("[appointmentController] :: createAppointment() : User does not exists");
        throw new AppError(401, i18n.__("ERROR_USER_DOES_NOT_EXISTS"))
    }

    const newAppointment = new Appointment({

        userId,
        doctor,
        petName,
        ownerName,
        aptNotes,
        aptDate
    });


    const appointment = await newAppointment.save();
    res.status(201).json(appointment);

    logger.trace("[appointmentController] :: createAppointment() : End");
});

module.exports = {
    getAppointmentsByUserId,
    createAppointment
};




