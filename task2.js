const https = require("https");
const ip2countryUrl = "https://api.ip2country.info/ip?";
const nationalizeUrl = "https://api.nationalize.io/?name=";
const genderizeUrl = "https://api.genderize.io/?name=";

const httpGet = url => {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", chunk => (body += chunk));
        res.on("end", () => resolve(JSON.parse(body)));
      })
      .on("error", reject);
  });
};

const enrichVisitorsData = async visitors => {
  try {
    const updatedVisitors = await Promise.all(
      visitors.map(async visitor => {
        const { countryCode, ipAddress, firstName, gender } = visitor;
        if (!countryCode) {
          if (ipAddress) {
            const { countryCode } = await httpGet(ip2countryUrl + ipAddress);
            visitor.countryCode = countryCode;
          } else if (firstName) {
            const { country } = await httpGet(nationalizeUrl + firstName);
            if (country.probability > 0.75) {
              visitor.countryCode = country_id;
            }
          }
        }
        if (firstName && !gender) {
          const { probability, gender } = await httpGet(
            genderizeUrl + firstName
          );
          if (probability > 0.75) {
            visitor.gender = gender;
          }
        }
        return visitor;
      })
    );
    console.log(updatedVisitors);
    return updatedVisitors;
  } catch (error) {
    throw new Error(error);
  }
};

const visitorsData = [
  {
    id: "63faedf7-f1fb-42d7-93b1-950a23c19c0d",
    firstName: "Zuzanna",
    countryCode: "NL"
  },
  {
    id: "0976a56f-b6d4-4155-b4b2-7ad0f8d4821f",
    firstName: "Sasha"
  }
];

enrichVisitorsData(visitorsData);

module.exports = visitorsData => enrichVisitorsData(visitorsData);
