//Importing and declaration
const got = require("got");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//API Logic
let searchString = "Surat";
let weather_url =
    "https://api.openweathermap.org/data/2.5/weather/?units=metric";
let forecast_url =
    "https://api.openweathermap.org/data/2.5/forecast/?units=metric";
let api_id = "3b945ec40bfd5ead3f48531aa2c11662";

app.get("/", (req, res) => {
    //Use search string to fetch data from api.
    //Promise for weather data
    const promise1 = got(
        weather_url + "&q=" + searchString + "&appid=" + api_id
    );
    //Promise for forecast data
    const promise2 = got(
        forecast_url + "&q=" + searchString + "&appid=" + api_id
    );
    //Promise all: concatenate and send data
    Promise.all([promise1, promise2])
        .then((values) => {
            let data = [];
            values.forEach((e) => {
                const replacerFunc = () => {
                    const visited = new WeakSet();
                    return (key, value) => {
                        if (typeof value === "object" && value !== null) {
                            if (visited.has(value)) {
                                return;
                            }
                            visited.add(value);
                        }
                        return value;
                    };
                };

                let str = JSON.stringify(e, replacerFunc());
                let obj = JSON.parse(str);
                data.push(JSON.parse(obj.body));
            });
            // console.log(data.length);
            if (data[0].cod === 200) {
                res.render("index", { data: data });
            } else {
                res.render("error");
            }
        })
        .catch((err) => {
            res.redirect("/error");
        });
});
app.post("/", (req, res) => {
    //User query string
    const query = req.body.city;
    searchString = query;
    res.redirect("/");
});
app.get("/error", (req, res) => res.render("error"));
app.listen(process.env.PORT || 3000, () =>
    console.log(`Example app listening on port ${port}!`)
);
