let express = import("express");
let fetch = import("node-fetch");
let server = express();
const PORT = 3000;

server.use(express.json());

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});