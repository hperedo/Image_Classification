// import React, { useEffect } from "react";
// import ml5 from "ml5";
// import imageSrc from "../components/pic1.jpg"; // Import the image file

// const ImageClassification = () => {
//   useEffect(() => {
//     // Initialize Image Classifier with MobileNet.
//     const classifier = ml5.imageClassifier("MobileNet", () => {
//       console.log("Model Loaded");
//       classifyImage();
//     });

//     const classifyImage = () => {
//       const imgElement = document.getElementById("image");
//       classifier.classify(imgElement, (error, results) => {
//         if (error) {
//           console.error(error);
//           setResult("Error");
//         } else {
//           const confidence = results[0].confidence * 100;
//           setResult(
//             `${results[0].label}\nConfidence: ${confidence.toFixed(2)}%`
//           );
//         }
//       });
//     };

//     return () => {
//       // Cleanup code if needed
//     };
//   }, []);

//   const setResult = (result) => {
//     const resultElement = document.getElementById("result");
//     resultElement.innerHTML = result;
//   };

//   return (
//     <div>
//       <h1>Image Classification</h1>
//       <h2>With MobileNet and ml5.js</h2>
//       <div id="result">Scanning ...</div>
//       <img id="image" src={imageSrc} width="100%" alt="Input Image" />
//       {/* <img id="image" src="pic1.jpg" width="100%" alt="Input Image" /> */}
//     </div>
//   );
// };

// export default ImageClassification;

import React, { useEffect, useState } from "react";
import ml5 from "ml5";
import imageSrc1 from "../components/pic1.jpg";
import imageSrc2 from "../components/pic2.jpg";
import imageSrc3 from "../components/pic4.jpg";
import imageSrc4 from "../components/pic5.jpg";
import imageSrc5 from "../components/pic6.jpg";
import imageSrc6 from "../components/pic7.jpg";
import imageSrc7 from "../components/pic8.jpg";
import imageSrc8 from "../components/pic9.jpg";
import imageSrc9 from "../components/pic10.jpg";
// Import additional images as needed

const ImageClassification = () => {
  const [result, setResult] = useState("Scanning ...");
  const [classifier, setClassifier] = useState(null);
  const [knnClassifier, setKNNClassifier] = useState(null);
  const [imageIndex, setImageIndex] = useState(1);
  const [selectedClassifier, setSelectedClassifier] = useState("MobileNet");

  const images = [
    imageSrc1,
    imageSrc2,
    imageSrc3,
    imageSrc4,
    imageSrc5,
    imageSrc6,
    imageSrc7,
    imageSrc8,
    imageSrc9,
  ];
  // Add additional image paths to the 'images' array

  const classifiers = {
    MobileNet: "MobileNet",
    DoodleNet: "DoodleNet",
    //KNNClassifier: "KNNClassifier",
    //TensorFlow: "TensorFlow",
    //PyTorch: "PyTorch",
    //"scikit-learn": "scikit-learn",
    //Keras: "Keras",
    //CUDA: "CUDA",
    // Add additional classifiers as needed
  };

  const classifyImage = (imageElement) => {
    if (selectedClassifier === "KNNClassifier" && knnClassifier) {
      knnClassifier.classify(imageElement, (error, results) => {
        if (error) {
          console.error(error);
          setResult("Error");
        } else {
          setResult(
            `${results.label}\nConfidence: ${results.confidence.toFixed(2)}%`
          );
        }
      });
    } else if (classifier) {
      classifier.classify(imageElement, (error, results) => {
        if (error) {
          console.error(error);
          setResult("Error");
        } else {
          const confidence = results[0].confidence * 100;
          setResult(
            `${results[0].label}\nConfidence: ${confidence.toFixed(2)}%`
          );
        }
      });
    }
  };

  useEffect(() => {
    // Initialize the selected Image Classifier.
    if (selectedClassifier === "KNNClassifier") {
      const loadedKNNClassifier = ml5.KNNClassifier();
      setKNNClassifier(loadedKNNClassifier);
    } else {
      const loadedClassifier = ml5.imageClassifier(selectedClassifier, () => {
        console.log("Model Loaded");
        setClassifier(loadedClassifier);
      });
    }

    return () => {
      // Cleanup code if needed
    };
  }, [selectedClassifier]);

  const handleClassifyImage = () => {
    const imageElement = document.getElementById("image");
    classifyImage(imageElement);
  };

  const handleLoadNewImage = () => {
    const nextImageIndex = (imageIndex + 1) % images.length;
    setImageIndex(nextImageIndex);
    setResult("Scanning ...");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageElement = document.getElementById("image");
      imageElement.src = e.target.result;
      classifyImage(imageElement);
    };

    reader.readAsDataURL(file);
  };

  const handleClassifierSelection = (event) => {
    setSelectedClassifier(event.target.value);
    setResult("Scanning ...");
  };

  return (
    <div>
      <h1>Image Classification</h1>
      <h2>With MobileNet and ml5.js</h2>
      <div
        id="result"
        style={{ position: "relative", width: "100%", fontSize: "30px" }}
      >
        {result}
      </div>
      <div style={{ position: "relative", width: "100%", fontSize: "25px" }}>
        <img
          id="image"
          src={images[imageIndex]}
          style={{ width: "100%" }}
          alt="Input Image"
        />
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            width: "100%",
            fontSize: "25px",
          }}
        >
          <button
            onClick={handleClassifyImage}
            style={{ width: "50%", margin: "0 auto", fontSize: "25px" }}
          >
            Classify Image
          </button>
          <button
            onClick={handleLoadNewImage}
            style={{ width: "50%", margin: "0 auto", fontSize: "25px" }}
          >
            Load New Image
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "block", margin: "10px auto", fontSize: "25px" }}
          />
          <div>
            <label htmlFor="classifierSelect">Select Classifier:</label>
            <select
              id="classifierSelect"
              value={selectedClassifier}
              onChange={handleClassifierSelection}
            >
              {Object.keys(classifiers).map((classifierKey) => (
                <option key={classifierKey} value={classifiers[classifierKey]}>
                  {classifierKey}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageClassification;
