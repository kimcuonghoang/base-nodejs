import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const PORT = process.env.PORT || 3000; // 👈 đúng chuẩn

const app = jsonServer.create();
const router = jsonServer.router("db.json");

setupApp();

async function setupApp() {
  const rules = auth.rewriter({
    users: 600,
    messages: 640,
    products: 660,
  });

  app.db = router.db;

  app.use(cors()); // CORS trước để cho phép FE gọi
  app.use(rules); // Áp dụng quyền truy cập
  app.use(auth); // Xác thực json-server-auth
  app.use(router); // Router chính

  app.get("*", (req, res) => {
    res.status(404).send("404 Not Found");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
