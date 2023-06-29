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
  const [imageIndex, setImageIndex] = useState(1);

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

  const classifyImage = (imageElement) => {
    if (classifier) {
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
    // Initialize Image Classifier with MobileNet.
    const loadedClassifier = ml5.imageClassifier("MobileNet", () => {
      console.log("Model Loaded");
      setClassifier(loadedClassifier);
    });

    return () => {
      // Cleanup code if needed
    };
  }, []);

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

  return (
    <div>
      <h1>Image Classification</h1>
      <h2>With MobileNet and ml5.js</h2>
      <div id="result">{result}</div>
      <div style={{ position: "relative", width: "100%" }}>
        <img
          id="image"
          src={images[imageIndex]}
          style={{ width: "100%" }}
          alt="Input Image"
        />
        <div style={{ position: "absolute", bottom: "10px", width: "100%" }}>
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
        </div>
      </div>
    </div>
  );
};

export default ImageClassification;
