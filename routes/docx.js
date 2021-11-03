const multer = require('fastify-multer');

const controller = require('../controllers/docx')
const schema     = require('../schema/docx');
const path = require('path')
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/json' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false, new Error('only images are allowed'));
    }

}
const fileStorage = multer.diskStorage({
    // destination: 'uploads',
    // path:(req, file, cb)=>{
    //     cb(null, path.join(__dirname, '/uploads'))
    // },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const upload = multer({dest:'uploads/',storage:fileStorage,fileFilter:fileFilter})

const docxRouter = (fastify, options, done)=>{
    // fastify.post('/docx', {
    //     // schema:schema.uploadSchema,
    //     preHandler:upload.single('docx'),
    //     handler:controller.postFile
    // })

    fastify.post('/docx/create', {
        schema:schema.createFileSchema,
        // preHandler:upload.single('docx'),
        handler:controller.postGenerateFile
    })

    done();
}

module.exports = docxRouter