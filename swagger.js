import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Scripture Verse API',
    description: 'REST API for managing scripture verses',
    version: '1.0.0'
  },
  host: 'https://scriptureverse.onrender.com',
  basePath: '/api/scriptures',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Scripture: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        book: { type: 'string', example: 'Genesis' },
        bookName: { type: 'string', example: 'Genesis' },
        chapter: { type: 'number', example: 1 },
        verse: { type: 'string', example: '1' },
        text: { type: 'string', example: 'In the beginning God created...' },
        insight: { type: 'string' },
        doctrine: { type: 'string' },
        crossReferences: { type: 'array', items: { type: 'string' } },
        userId: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' }
      },
      required: ['book', 'bookName', 'chapter', 'verse', 'text']
    }
  }
};

const outputFile = './swagger.json';
const routes = ['./server.js', './routes/scriptures.js'];

swaggerAutogen()(outputFile, routes, doc);
