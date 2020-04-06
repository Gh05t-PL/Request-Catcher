String.prototype.capitalize = function () {
    return this.replace(/(^|\s|\-)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
    });
};

function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    } catch (e) {
    }

    return false;
}

function showJsonBody() {
    textBody.classList.add('display-none');
    jsonBody.classList.remove('display-none');
}

function showTextBody() {
    textBody.classList.remove('display-none');
    jsonBody.classList.add('display-none');
}

function getHeadersString(data) {
    var str = '';
    str += `${data.method} ${data.originalUrl} HTTP/${data.httpVersion}\n`;
    str += `Host: ${data.headers['host']}\n`;

    for (const property in data.headers) {
        if (property === "host") {
            continue;
        }
        str += `${property.capitalize()}: ${data.headers[property]}\n`
    }
    return str;
}

function renderView(data) {
    requestHeaders.innerHTML = getHeadersString(data);
    textBody.innerHTML = data.body;

    obj = tryParseJSON(data.body);
    if (obj !== false) {
        var a = new JSONFormatter(obj, 3);
        jsonBody.innerHTML = '';
        jsonBody.append(a.render());
    } else {
        console.log('elo')
        jsonBody.innerHTML = "Not a valid JSON";
    }
}

function addRequestToList(data) {
    var time = Date.now();
    var requestElement =
        `<div class="request" data-id=${requests.length}>
        <h2>${data.method} ${data.originalUrl}</h2>
        <p class="time">
          <span class="date">${moment(time).format("DD-MM-YYYY")}</span>
          <span class="time">${moment(time).format("HH:mm:ss Z")}</span>
        </p>
      </div>`;
    var domElement = createElementFromHTML(requestElement);

    domElement.addEventListener('click', function (event) {
        renderView(requests[Number(this.dataset.id)])
    });

    requestList.insertBefore(domElement, requestList.firstChild);
    requests.push(data);
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}