import jsonServer from "json-server";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Cho phép CORS
app.use(cors());

// Middleware mặc định (logger, static, v.v.)
app.use(middlewares);

// Sử dụng router cho db.json
app.use(router);

// Xử lý route không tồn tại
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`JSON Server is running on ${PORT}`);
});
