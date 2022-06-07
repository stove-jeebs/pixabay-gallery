import React, { useState, useEffect, useRef } from "react";
import Card from "./components/Card";
import Search from "./components/Search";

export default function Content() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photok`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="">
      <Search />

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="container mx-auto my-8">
          <div className="grid grid-cols-3 gap-5">
            {images.map((image) => (
              <Card key={image.id} image={image} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
