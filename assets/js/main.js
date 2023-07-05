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

  // Quotes API
  function getRandomQuote() {
    var category = "inspirational";
    var apiKey = "eCRMMjfKfgX7GVJ/n7vaVw==0i8VA11Z1AofYG6q";
    const quoteContainer = document.querySelector(".quotes-container");
    const characterLimit = 150;

    fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
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
    APIKey = "ce70f5e97be3be86f8cec7150cf3a1e5",
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
                        <div class="season-icon">
                            <!-- <img class="weather-icon sunny" src="http://openweathermap.org/img/w/${iconCode}.png" alt=""> -->
                        </div>
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

  function updateBandwidth() {
    if (navigator.connection) {
      var connection = navigator.connection;

      if (connection.downlink) {
        var bandwidthMbps = connection.downlink;
          var networkRangeElement = document.querySelector('.networkRange');
          networkRangeElement.style.width = bandwidthMbps + '%';

          var netbitElement = document.querySelector('.netbit');
          netbitElement.textContent = bandwidthMbps + 'mb/s';

        // console.log('Kecepatan unduhan (bandwidth): ' + bandwidthMbps + ' Mbps');

        // Lakukan tindakan atau perbarui tampilan berdasarkan perubahan bandwidth di sini
      } else {
        console.log("Properti downlink tidak tersedia.");
      }
    } else {
      console.log("Network Information API tidak tersedia di perangkat ini.");
    }
  }

  // Event listener untuk mendengarkan perubahan koneksi
  navigator.connection.addEventListener("change", updateBandwidth);

  // Panggil fungsi pertama kali untuk menginisialisasi nilai bandwidth
  updateBandwidth();

  // function getNetworkData() {

  //   if (window.performance) {

  //     var network = performance.getEntriesByType('navigation')[0];

  //     var uploadSpeed = network.transferSize;

  //     updateNetworkStatus(uploadSpeed);
  //   }
  // }

  // function formatSizeUnits(bytes) {
  //   if (bytes < 1024) {
  //     return bytes + " bytes";
  //   } else if (bytes < 1048576) {
  //     return (bytes / 1024).toFixed(2) + " KB";
  //   } else if (bytes < 1073741824) {
  //     return (bytes / 1048576).toFixed(2) + " MB";
  //   } else {
  //     return (bytes / 1073741824).toFixed(2) + " GB";
  //   }
  // }

  // function updateNetworkStatus(uploadSpeed) {

  //   var networkRangeElement = document.querySelector('.networkRange');
  //   networkRangeElement.style.width = uploadSpeed / 1024 + '%';

  //   var netbitElement = document.querySelector('.netbit');
  //   netbitElement.textContent = formatSizeUnits(uploadSpeed) + '/s';
  // }

  // getNetworkData();

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
function fnBrowserDetect() {
  let userAgent = navigator.userAgent;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    function batteryMonitor() {
      navigator.getBattery().then(function (battery) {
        batteryBar.style.width = battery.level * 100 + "%";
        batteryPercent.textContent = battery.level * 100 + "%";

        // console.log(battery.level);
      });

      // setTimeout(batteryMonitor, 1000);
    }
    batteryMonitor();
  } else if (userAgent.match(/firefox|fxios/i)) {
    battery.style.display = "none";
  } else if (userAgent.match(/safari/i)) {
    browserName = "safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "No browser detection";
  }

  //  document.querySelector("h1").innerText="You are using "+ browserName +" browser";
}

fnBrowserDetect();
