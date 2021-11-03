exports.uploadSchema = {
    response: {
        201: {

            type: 'object',
            properties: {
                data: {
                    type: 'string',
                    default:" "
                }
            }
        }
    },
    body: {
        type: 'object',
        required: ['title'],
        properties: {
            file: { type: 'file' }
        }
    }
}

exports.createFileSchema = {
    body: {
        type: 'object',
        required: ['content'],
        properties: {
            content: {
                type:'array',
                items:{
                    type: 'object',
                    properties: {
                        paragraph:{
                            type:'array',
                            items:{
                                type: 'object',
                                properties:{
                                    text:{
                                        type:'string',
                                        // required:true
                                    },
                                    bold:{
                                        type:'boolean'
                                    },
                                    italics:{
                                        type:'boolean'
                                    }
                                }
                              
                            }
                        }
                    }
                }
            }
        }
    }
}