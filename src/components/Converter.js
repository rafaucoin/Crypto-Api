import React, { useState } from "react";
import axios from "axios";
function Converter() {
  const currencies = ["BTC", "ETH", "USD"];
  const [first, changedfirst] = useState("BTC");
  const [amount, changedamt] = useState(1);
  const [second, changedsecond] = useState("BTC");
  const [rate, setrate] = useState(1)
  const [result, setresult] = useState(1)
  const convert = () => {
    var options = {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
          from_currency: first,
          function: "CURRENCY_EXCHANGE_RATE",
          to_currency: second,
        },
        headers: {
          "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_KEY,
        },
      };
    
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
          setrate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
          setresult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']*amount)
        })
        .catch(function (error) {
          console.error(error);
        });
  }
  
  

  return (
    <div className="converter">
      <table>
        <tbody>
          <tr>
            <td>Base Currency</td>
            <td>
              <input
                type="number"
                name="first"
                value={amount}
                onChange={(e) => changedamt(e.target.value)}
              />
            </td>
            <td>
              <select onChange={(e) => changedfirst(e.target.value)}>
                {currencies.map((currency) => (
                  <option>{currency}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Final Currency</td>
            <td>
              <input type="number" name="second" value={result} disabled />
            </td>
            <td>
              <select onChange={(e) => changedsecond(e.target.value)}>
                {currencies.map((currency) => (
                  <option>{currency}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={convert}>Convert</button>
    </div>
  );
}

export default Converter;
