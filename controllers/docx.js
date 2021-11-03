const { Document, Packer, Paragraph, TextRun } = require('docx');
const fs = require('fs')
const docx_parser = require('docx-parser');
const path = require('path');

exports.postFile = async (req, replay) => {
    try {

        
    } catch (err) {
        console.log(err);
    }
}

exports.postGenerateFile = async (req, replay) => {
    try {

        const { content } = req.body;

        let children = [];
        content.forEach(p => {
            const newPChildren = []
            p.paragraph.forEach(text => {
                newPChildren.push(new TextRun(text))
            })
            children.push(
                new Paragraph({
                    children: newPChildren
                })
            )
        })
        const doc = new Document({
            sections: [{
                properties: {},
                children: children
            }]
        });


        Packer.toBuffer(doc).then(buffer => {
            fs.writeFileSync('docs.docx', buffer);
            fs.readFile('docs.docx', (err, data) => {
                replay.header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                replay.header('Content-Disposition', 'attachment; filename=docs.docx');
                replay.send(data)
            });
        })

    } catch (err) {
        console.log(err);
    }
}