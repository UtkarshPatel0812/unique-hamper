const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// routes
const contactRoute = require("./routes/contact");
const customBuilderRoute = require("./routes/customBuilder");
const newsLetterRoute = require("./routes/newsLetter");
const giftCCardRoute = require("./routes/giftCard");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/email/contact", contactRoute);
app.use("/api/email/custom-builder", customBuilderRoute);
app.use("/api/email/newsletter", newsLetterRoute);
app.use("/api/email/gift-card", giftCCardRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
