import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Main() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // State for image preview
  const [predictionResult, setPredictionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle file selection and generate a preview URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      // Create an object URL to display the image
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl); // Set the preview URL for displaying the image
    }

    setPredictionResult(null); // Clear previous result
    setErrorMessage(''); // Clear previous error message
  };

  // Handle prediction request
  const handlePredict = async () => {
    if (!selectedFile) {
      alert('Please select an image file!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setIsLoading(true); // Set loading to true when the prediction starts
    setPredictionResult(null); // Clear previous result

    try {
      // Simulate a delay of 3-5 seconds (you can adjust the time as needed)
      setTimeout(async () => {
        // Make the POST request to the backend's predict API
        const response = await axios.post(
          'https://ff7c-182-181-179-165.ngrok-free.app/predict',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Assuming the response contains 'predicted_class' and 'predicted_probability'
        setPredictionResult(response.data);
        setIsLoading(false); // Set loading to false once prediction is complete
      }, 3000); // Simulating 3 seconds delay
    } catch (error) {
      setErrorMessage('Error predicting the image. Please try again.');
      setIsLoading(false); // Set loading to false in case of error
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pb-8">
      {/* Include Navbar at the top */}
      <Navbar />

      {/* Main Content */}
      <div
        className={`flex ${
          predictionResult ? 'justify-between' : 'justify-center'
        } items-start flex-1 py-8 px-8 transition-all duration-300`}
      >
        {/* Image Uploader Section */}
        <div
          className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transition-all duration-300 ${
            predictionResult ? 'mr-8 w-1/2' : 'text-center'
          }`}
        >
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Upload an Image
          </h1>

          {/* Image Uploader */}
          <label className="block mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <div className="cursor-pointer border-2 border-dashed border-gray-300 p-8 rounded-lg hover:bg-gray-100 transition duration-300">
              <p className="text-gray-600">Click to select an image file</p>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Selected"
                  className="w-64 h-64 object-cover mx-auto mt-4 border rounded-lg"
                />
              )}
            </div>
          </label>

          {/* Supported file types */}
          <p className="text-sm text-gray-500 mb-6">
            Upload only JPG, PNG, GIF, and BMP files.
          </p>

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            Predict
          </button>
        </div>

        {/* Loader or Prediction Result Section */}
        {isLoading ? (
          <div className="w-1/2 flex justify-center items-center">
            {/* You can customize the loader here */}
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            <p className="ml-4 text-xl font-bold text-gray-700">Predicting...</p>
          </div>
        ) : (
          predictionResult && (
            <div className="bg-white p-8 w-1/2 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Prediction Results
              </h2>

              {/* Prediction Result Container with Border */}
              <div className="p-4 border-4 border-gray-500 rounded-lg mb-4">
                <p className="text-lg font-bold text-gray-800">
                  Predicted Class:{" "}
                  <span className="font-bold text-blue-500">
                    {predictionResult.predicted_class}
                  </span>
                </p>
                <p className="text-lg font-bold text-gray-800">
                  Predicted Probability:{" "}
                  <span className="bg-yellow-200 text-xl font-bold px-2 py-1 rounded-lg text-gray-800">
                    {predictionResult.predicted_probability.toFixed(4)}
                  </span>
                </p>
              </div>

              {/* Display All Probabilities in Tabular Form */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  All Probabilities:
                </h3>
                <table className="min-w-full border border-gray-300 text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b font-medium text-gray-700">
                        Class
                      </th>
                      <th className="px-4 py-2 border-b font-medium text-gray-700">
                        Probability
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(predictionResult.all_probabilities).map(
                      ([className, probability], index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 border-b">{className}</td>
                          <td className="px-4 py-2 border-b">
                            <span className="bg-blue-200 px-2 py-1 rounded-lg">
                              {probability.toFixed(4)}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>

      {/* Error message */}
      {errorMessage && (
        <p className="mt-4 text-center text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default Main;
