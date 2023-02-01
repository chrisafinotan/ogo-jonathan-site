export default function handler(req, res) {
   if (req.args.get("challenge")) {
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.status(200).json({ message: "Webhook endpoint verfied" });
   }
   res.status(400).json({ message: "Bad request" });
}
