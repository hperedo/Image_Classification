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
// Import additional images as needed

const ImageClassification = () => {
  const [result, setResult] = useState("Scanning ...");
  const [classifier, setClassifier] = useState(null);
  const [imageIndex, setImageIndex] = useState(1);

  const images = [imageSrc1, imageSrc2, imageSrc3];
  // Add additional image paths to the 'images' array

  const classifyImage = () => {
    const imgElement = document.getElementById("image");
    if (classifier) {
      classifier.classify(imgElement, (error, results) => {
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
    // Initialize Image Classifier with MobileNet.
    const loadedClassifier = ml5.imageClassifier("MobileNet", () => {
      console.log("Model Loaded");
      setClassifier(loadedClassifier);
      classifyImage();
    });

    return () => {
      // Cleanup code if needed
    };
  }, []);

  const handleClassifyImage = () => {
    classifyImage();
  };

  const handleLoadNewImage = () => {
    const nextImageIndex = (imageIndex + 1) % images.length;
    setImageIndex(nextImageIndex);
    setResult("Scanning ...");
  };

  return (
    <div>
      <h1>Image Classification</h1>
      <h2>With MobileNet and ml5.js</h2>
      <div id="result">{result}</div>
      <img id="image" src={images[imageIndex]} width="100%" alt="Input Image" />
      <button onClick={handleClassifyImage}>Classify Image</button>
      <button onClick={handleLoadNewImage}>Load New Image</button>
    </div>
  );
};

export default ImageClassification;
