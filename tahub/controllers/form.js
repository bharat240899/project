const formidable = require("formidable");
const fs = require('fs');
const Application = require("../models/form");
const form = require("../models/form");

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Resume could not be uploaded"
            });
        }

        // Check for all required fields
        const { znumber, fname, laname, experience } = fields;
        const { resume } = files;

        if (!znumber || !fname || !laname || !resume) {
            return res.status(400).json({
                error: "All fields are required, including a resume"
            });
        }

        // Create a new Application document with the uploaded resume
        const application = new Application({
            znumber,
            fname,
            laname,
            experience,
            resume: {
                data: fs.readFileSync(resume.path),
                contentType: resume.type,
            },
        });

        // Check the size of the uploaded resume
        if (resume.size > 1000000) {
            return res.status(400).json({
                error: "Resume size should be less than 1MB"
            });
        }

        if (experience === 'true') {
            // If experience is true, validate 'from' and 'to' fields
            const { from, to, relevant_courses } = fields;
            if (!from || !to || !relevant_courses) {
                return res.status(400).json({
                    error: "All fields are required when experience is true"
                });
            }

            // Update the Application object with the additional fields
            application.from = from;
            application.to = to;
            application.relevant_courses = relevant_courses; // Assuming courses are comma-separated
        }

        application.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};
//list all pplication
exports.list = (req, res) => {
    Application.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        const modifiedData = data.map(item => {
            // Convert binary data to Base64 for the resume
            const resumeData = Buffer.from(item.resume.data).toString('base64');

            return {
                _id: item._id,
                znumber: item.znumber,
                fname: item.fname,
                laname: item.laname,
                experience: item.experience,
                // Sending the resume as Base64 in the response
                resume: resumeData,
                from:item.from,
                to:item.to,
                relevant_courses:item.relevant_courses
            };
        });

        res.json(modifiedData);
    });
};
