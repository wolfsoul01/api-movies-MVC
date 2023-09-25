// app.use((req, res, next) => {
//   if (
//     req.method !== "POST" ||
//     req.headers["content-type"] !== "application/json"
//   )
//     return next();

//   console.log("paso");
//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });

//   req.on("end", () => {
//     const data = JSON.parse(body);
//     data.time = Date.now();
//     req.body = data;
//     next();
//   });
// });