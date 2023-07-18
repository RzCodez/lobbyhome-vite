import { gsap } from "gsap";

const overlayBlackFront = document.querySelector(".overlay-black-front");

window.addEventListener("load", () => {
  let tl = gsap.timeline();

  overlayBlackFront.style.display = "none";

  // tl.to('.overlay-black', {
  //     opacity: 0,
  //     delay: 0.5,
  // })

  function showTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var session = "AM";

    if (h == 0) {
      h = 12;
    }

    if (h > 24) {
      h = h - 24;
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    var time = h + ":" + m;
    document.getElementById("timeCount").innerText = time;
    document.getElementById("timeCount").textContent = time;

    setTimeout(showTime, 1000);
  }

  showTime();

  tl.from(".time", {
    duration: 1,
    // delay: 1.2,
    y: 50,
    opacity: 0,
    ease: "expo.out",
  });

  var dateFormat = document.querySelector(".date");

  const date = new Date();

  var dateNow = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
    date
  );

  dateFormat.innerHTML = `

  <span>${dateNow}</span>

`;

  tl.from(
    ".date",
    {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "expo.out",
      // delay: 1,
    },
    0.2
  );

  tl.from(
    ".items",
    {
      duration: 1,
      x: -10,
      opacity: 0,
      ease: "expo.out",
      stagger: 0.2,
      // delay: 1,
    },
    0.3
  );
  // console.log();
  // Quotes API
  function getRandomQuote() {
    var category = "inspirational";
    // var apiKey = "eC;
    const quoteContainer = document.querySelector(".quotes-container");
    const characterLimit = 150;

    fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, {
      method: "GET",
      headers: {
        "X-Api-Key": import.meta.env.VITE_QUOTES_API_KEY,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then(function (result) {
        if (result.length > 0) {
          const filteredQuotes = result.filter(
            (quote) => quote.quote.length <= characterLimit
          );

          if (filteredQuotes.length > 0) {
            const randomQuote =
              filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
            const quote = randomQuote.quote;

            quoteContainer.innerHTML = `
        <span class="quotetext">
                  ${quote}
        </span>
        `;

            gsap.from(quoteContainer, {
              duration: 1,
              // delay: 1.1,
              y: 50,
              opacity: 0,
              ease: "expo.out",
              // delay: 1,
            });
          } else {
            console.log("....");
          }
        } else {
          quoteContainer.innerHTML =
            '<p class="noquote">No quotes available.</p>';
        }
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });

    // setTimeout(getRandomQuote, 500);
  }

  getRandomQuote();

  const weatherContainer = document.querySelector(".weather-info"),
    APIKey = import.meta.env.VITE_WEATHER_API_KEY,
    locDefault = "South Tangerang";

  async function fetchWeatherData() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Tangerang%20Selatan&appid=${APIKey}`
    );
    const data = await response.json();

    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    weatherContainer.innerHTML = `
                <div class="temp-num">
                    <span class="tempNum">${temperature}</span>&deg;
                </div>
                <div class="loc-season">
                     <div class="location">
                        <div class="loc-name">${locDefault}</div>
                    </div>
                    <div class="season-info">
                        <span class="info">${description}</span>
                    </div>
                </div>

    `;

    gsap.to(weatherContainer, {
      duration: 1,
      delay: 1.1,
      opacity: 1,
      ease: "expo.out",
      // delay: 1,
    });
  }

  fetchWeatherData();

  // Battery & Network Monitor

  const backgroundImg = document.querySelector(".img");

  tl.from(
    ".status-box",
    {
      duration: 1,
      // delay: 1.1,
      opacity: 0,
      ease: "expo.out",
      stagger: 0.2,
    },
    0.4
  );

  tl.from(
    ".img",
    {
      duration: 1,
      ease: "expo.out",
      scale: 1.1,
    },
    0.7
  );

  tl.to(
    ".overlay-black",
    {
      opacity: 0,
      ease: "expo.out",
    },
    0.8
  );
});

var batteryBar = document.querySelector(".batteryRange"),
  battery = document.querySelector(".battery");

const batteryPercent = document.querySelector(".battery-percent");


var network = document.querySelector(".network");
function fnBrowserDetect() {
  let userAgent = navigator.userAgent;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    function batteryMonitor() {
      navigator.getBattery().then(function (battery) {
        batteryBar.style.width = battery.level * 100 + "%";
        // batteryPercent.textContent = battery.level * 100 + "%";
        batteryPercent.textContent = Math.trunc(battery.level * 100) + "%";

        // console.log(battery.level);
      });

      // setTimeout(batteryMonitor, 1000);
    }
    batteryMonitor();

    function updateBandwidth() {
      if (navigator.connection) {
        var connection = navigator.connection;
  
        if (connection.downlink) {
          var bandwidthMbps = connection.downlink;
            var networkRangeElement = document.querySelector('.networkRange');
            networkRangeElement.style.width = bandwidthMbps + '%';
  
            var netbitElement = document.querySelector('.netbit');
            netbitElement.textContent = bandwidthMbps + 'mb/s';

        } else {
          console.log("Properti downlink tidak tersedia.");
        }
      } else {
        console.log("Network Information API tidak tersedia di perangkat ini.");
      }
    }
  
    // Perubahan koneksi secara signifikan
    navigator.connection.addEventListener("change", updateBandwidth);
  
    updateBandwidth();
  } else if (userAgent.match(/firefox|fxios/i)) {
    battery.style.display = "none";
    network.style.display = "none";

  } else if (userAgent.match(/safari/i)) {
    battery.style.display = "none";
    network.style.display = "none";
  } else if (userAgent.match(/opr\//i)) {
  battery.style.display = "none";
  network.style.display = "none";
  } else if (userAgent.match(/edg/i)) {
    battery.style.display = "none";
    network.style.display = "none";
  } else {
    battery.style.display = "none";
    network.style.display = "none";
  }

  //  document.querySelector("h1").innerText="You are using "+ browserName +" browser";
}

fnBrowserDetect();
