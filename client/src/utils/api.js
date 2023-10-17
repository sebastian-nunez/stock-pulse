class APIError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "API" + this.name;
    this.details = details;
  }
}

// helped method to create API requests (sends/accepts JSON only!)
const requestJSON = async (method, url, body = null, headers = null) => {
  const headerOptions = {
    "Content-Type": "application/json",
    ...headers,
  };

  const options = body
    ? { method, headerOptions, body: JSON.stringify(body) }
    : { method, headerOptions };

  let response;
  let data;

  try {
    response = await fetch(url, options);
  } catch (e) {
    throw new APIError("API cannot be reached", e.message);
  }

  try {
    data = await response.json();
  } catch (e) {
    throw new APIError("Unable to convert data to JSON!", e.message);
  }

  if (response.ok) {
    return data;
  } else {
    if (data.error) throw new APIError(data.error.message, data.error.details);
  }
};

export { APIError, requestJSON };
