// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
//
//
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     // Getting the request log
//     // tslint:disable-next-line:no-console
//     console.log(`req:`, {
//       headers: req.headers,
//       body: req.body,
//       originalUrl: req.originalUrl
//     });
//
//     // Getting the response log
//     getResponseLog(res);
//
//     if (next) {
//       next();
//     }
//   }
// }
//
// const getResponseLog = (res: Response) => {
//   const rawResponse = res.write;
//   const rawResponseEnd = res.end;
//
//   let chunkBuffers: any[] = [];
//
//   // New chunk passed in as Buffer each time write() is called by stream
//   // Take chunks as a rest parameter since it is an array. This allows applying Array methods directly (ref MDN)
//   // res.write below is in object mode for write to avoid needing encoding arg (https://nodejs.org/api/stream.html#writable_writevchunks-callback)
//
//   // tslint:disable-next-line:no-console
//   console.log(`======>> Beginning res.write`);
//   res.write = (...chunks) => {
//     // Not able to console.log in res.write: It is a writable stream
//     const resArgs = [];
//     for (let i = 0; i < chunks.length; i++) {
//       // undefined values would break Buffer.concat(resArgs)
//       if (chunks[i]) resArgs[i] = Buffer.from(chunks[i]);
//
//       // This handling comes in when buffer is full, hence rawResponse === false after rawResponse.apply() below
//       // Ref: Example under https://nodejs.org/api/stream.html#class-streamwritable
//       // Callback (res.write) resumes write stream
//       if (!chunks[i]) {
//         res.once('drain', res.write);
//
//         // Resume from last falsy iteration
//         --i;
//       }
//     }
//
//     // Join together all collected Buffers in 1 array
//     if (Buffer.concat(resArgs)?.length) {
//       chunkBuffers = [...chunkBuffers, ...resArgs];
//     }
//
//     // tslint:disable-next-line:max-line-length
//     // res.write shuold return true if the internal buffer is less than the default highWaterMark. If false is returned, further attempts to write data to the stream should stop until the 'drain' event is emitted.
//     // The apply() method accepts two arguments (Ref: https://www.javascripttutorial.net/javascript-apply-method/):
//     // thisArg (res) is the value of 'this' provided for function rawResponse
//     // The args argument (restArgs) is an array that specifies the arguments of the function rawResponse
//     // @ts-ignore
//     return rawResponse.apply(res, resArgs);
//   };
//
//   // tslint:disable-next-line:no-console
//   console.log(`========> Done writing, beginning res.end`);
//   // @ts-ignore
//   res.end = (...chunks) => {
//     // Will log nothing: res.write is a writable stream
//     // tslint:disable-next-line:no-console
//     console.log(
//       `========> Chunks gathered during res.write: ${typeof chunkBuffers}`,
//       Buffer.from(chunkBuffers).toJSON()
//     );
//     // tslint:disable-next-line:no-console
//     console.log(`========> Chunks to handle during res.end: ${typeof chunks}`, Buffer.from(chunks).toJSON());
//
//     const resArgs = [];
//     for (let i = 0; i < chunks.length; i++) {
//       // tslint:disable-next-line:no-console
//       console.log(`res.end chunk ${i} content: ${typeof chunks[i]}`, chunks[i]);
//
//       // undefined values would break Buffer.concat(resArgs)
//       if (chunks[i]) resArgs[i] = Buffer.from(chunks[i]);
//     }
//
//     // resArgs[0] contains the response body
//     if (Buffer.concat(resArgs)?.length) {
//       chunkBuffers = [...chunkBuffers, ...resArgs];
//     }
//
//     // Join together all collected Buffers then encode as utf8 string
//     // @ts-ignore
//     const body = Buffer.concat(chunkBuffers).toString('utf8');
//
//     // Set custom header for response
//     res.setHeader('origin', 'restjs-req-res-logging-repo');
//
//     const responseLog = {
//       response: {
//         statusCode: res.statusCode,
//         body: body ? JSON.parse(body) || body || {} : {},
//         // Returns a shallow copy of the current outgoing headers
//         headers: res.getHeaders()
//       }
//     };
//
//     // tslint:disable-next-line:no-console
//     console.log('res: ', responseLog);
//
//     // res.end() is satisfied after passing in restArgs as params
//     // Doing so creates 'end' event to indicate that the entire body has been received.
//     // Otherwise, the stream will continue forever (ref: https://nodejs.org/api/stream.html#event-end_1)
//     rawResponseEnd.apply(res, resArgs);
//     return responseLog as unknown as Response;
//   };
// };
