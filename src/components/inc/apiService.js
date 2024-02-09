

const CLOUD_RUN_URL = "https://flask-app-hmq66d7qyq-uc.a.run.app" // Base URL of cloud run
const BASE_URL = "http://127.0.0.1:8000"; // Base URL of FastAPI backend

const sendDataToBackend = async (endpointPath, formData, headers = null) => {
  //const url = `${CLOUD_RUN_URL}/${endpointPath}`;
   const url = `${BASE_URL}/${endpointPath}`;

  let options = {
    method: "POST",
    body: formData,
  };

  if (headers) {
    options.headers = headers;
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
};

export { sendDataToBackend };
