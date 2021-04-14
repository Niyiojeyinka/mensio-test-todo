/**
 *
 * @param {*} url  endpoint url
 * @param {*} method GET,POST,DELETE,PUT,UPDATE
 * @param {*} type json || formdata
 * @param {*} data  data object
 * @param {*} token  bearer token
 */
const request = async (url, method, type = null, data = {}, token = null) => {
  const meta = {
    method,
    headers: {
      "Content-Type": null,
    },
  };
  if (type == "json") {
    if (method != "GET" || method != "DELETE") {
      meta["body"] = JSON.stringify(data);
      meta["headers"]["Content-Type"] = "application/json";
    }
  } else if (type !== null) {
    let formData = new FormData();

    for (let field of Object.keys(data)) {
      formData.append(field, data[field]);
    }
    meta["body"] = formData;
  }
  if (token) {
    meta["headers"]["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, meta);
  const responseData = await res.json();
  return {
    status: res.status,
    body: responseData,
  };
};

export default request;
