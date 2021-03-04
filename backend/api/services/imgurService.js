const fetch = require("node-fetch");
const FormData = require("form-data");
const dotenv = require("dotenv");
dotenv.config();

exports.upload = async (image) => {
    console.log(image);
    const data = new FormData();
    data.append("image", image.image);
    console.log(data);
    const url = "https://api.imgur.com/3/image";
    const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Client-ID ${process.env.API_KEY_IMGUR}` },
        body: data,
    }).then((res) => res.json());

    if (response.success) {
        return response.data.link;
    }

    throw new Error(
        "Bad request when uploading the image, please select a valid image."
    );
};
