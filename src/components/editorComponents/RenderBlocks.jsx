import React, { useState } from "react";
import { CiCirclePlus, CiCircleRemove } from "react-icons/ci";
import DropZone from "../dropzone/DropZone";

const RenderBlocks = ({ content, setContent }) => {
  const [data, setData] = useState(() => {
    // Initialize data based on content length
    const initialData = {};
    content.forEach((blockId, index) => {
      if (blockId === "full-width") {
        initialData[index] = [null]; // Initialize with null for full-width
      } else if (blockId === "half-width") {
        initialData[index] = [null, null]; // Example initialization for half-width
      } else if (blockId === "third-width") {
        initialData[index] = [null, null, null]; // Example initialization for third-width
      } else if (blockId === "quarter-width") {
        initialData[index] = [null, null, null, null]; // Example initialization for quarter-width
      }
    });
    return initialData;
  });

  const removeBlock = (blockIdToRemove) => {
    const indexToRemove = content.findIndex((id) => id === blockIdToRemove);

    if (indexToRemove !== -1) {
      const updatedContent = [
        ...content.slice(0, indexToRemove),
        ...content.slice(indexToRemove + 1),
      ];
      setContent(updatedContent);

      const updatedData = { ...data };
      delete updatedData[indexToRemove];
      setData(updatedData);
    }
  };

  const addInput = () => {
    alert("Drag and drop from inputs");
  };

  const handleDrop = (blockIndex, positionIndex, droppedItem) => {
    const updatedData = { ...data };
    if (!updatedData[blockIndex]) {
      updatedData[blockIndex] = [];
    }
    if (droppedItem.type.startsWith("file:")) {
      updatedData[blockIndex][positionIndex] = droppedItem.file;
    } else {
      updatedData[blockIndex][positionIndex] = droppedItem.type;
    }
    setData(updatedData);
  };

  const handleFileChange = (blockIndex, positionIndex, file) => {
    const updatedData = { ...data };
    if (!updatedData[blockIndex]) {
      updatedData[blockIndex] = [];
    }
    updatedData[blockIndex][positionIndex] = file;
    setData(updatedData);
  };

  const renderInput = (type, blockIndex, positionIndex) => {
    if (type instanceof File) {
      const fileURL = URL.createObjectURL(type);
      if (type.type.startsWith("image/")) {
        return <img src={fileURL} alt="preview" className="h-full w-full" />;
      } else if (type.type === "application/pdf") {
        return (
          <embed
            src={fileURL}
            type="application/pdf"
            className="h-full w-full"
          />
        );
      } else if (type.type.startsWith("video/")) {
        return <video src={fileURL} controls className="h-full w-full" />;
      }
      // else if(type.type.startsWith("text/")){

      // }
    }

    switch (type) {
      case "text":
        return (
          <input
            type="text"
            placeholder="Text Input"
            className="border p-1 rounded h-full w-full"
          />
        );
      case "image":
        return (
          <input
            type="file"
            accept="image/*"
            className="border p-1 rounded w-full"
            onChange={(e) =>
              handleFileChange(blockIndex, positionIndex, e.target.files[0])
            }
          />
        );
      case "pdf":
        return (
          <input
            type="file"
            accept="application/pdf"
            className="border p-1 rounded w-full"
            onChange={(e) =>
              handleFileChange(blockIndex, positionIndex, e.target.files[0])
            }
          />
        );
      case "video":
        return (
          <input
            type="file"
            accept="video/*"
            className="border p-1 rounded w-full"
            onChange={(e) =>
              handleFileChange(blockIndex, positionIndex, e.target.files[0])
            }
          />
        );
      case "heading":
        return (
          <input
            type="text"
            placeholder="Heading"
            className="border p-1 rounded h-full w-full font-bold text-xl"
          />
        );
      default:
        return null;
    }
  };

  return content.map((blockId, index) => {
    switch (blockId) {
      case "full-width":
        if (!data[index]) {
          setData((prevData) => ({ ...prevData, [index]: [null] }));
        }
        return (
          <div className="flex items-center" key={`full-width-${index}`}>
            <DropZone
              height={100}
              width={700}
              onDrop={(item) => handleDrop(index, 0, item)}
              className="w-full h-[32px] bg-gray-200 border border-gray-400 rounded flex items-center justify-center"
            >
              {renderInput(data[index] && data[index][0], index, 0)}
              <CiCirclePlus size={32} onClick={addInput} />
            </DropZone>
            <button
              className="ml-2 text-red-600"
              onClick={() => removeBlock(blockId)}
            >
              <CiCircleRemove size={32} />
            </button>
          </div>
        );
      case "half-width":
        if (!data[index]) {
          setData((prevData) => ({ ...prevData, [index]: [null, null] }));
        }
        return (
          <div className="flex space-x-4" key={`half-width-${index}`}>
            {[0, 1].map((pos) => (
              <DropZone
                height={100}
                width={300}
                key={`half-width-${index}-${pos}`}
                onDrop={(item) => handleDrop(index, pos, item)}
                className="w-[64px] h-[32px] bg-gray-200 border border-gray-400 rounded flex items-center justify-center"
              >
                {renderInput(data[index] && data[index][pos], index, pos)}
                <CiCirclePlus size={32} onClick={addInput} />
              </DropZone>
            ))}
            <button
              className="ml-2 text-red-600"
              onClick={() => removeBlock(blockId)}
            >
              <CiCircleRemove size={32} />
            </button>
          </div>
        );
      case "third-width":
        if (!data[index]) {
          setData((prevData) => ({
            ...prevData,
            [index]: [null, null, null],
          }));
        }
        return (
          <div className="flex space-x-4" key={`third-width-${index}`}>
            {[0, 1, 2].map((pos) => (
              <DropZone
                height={100}
                width={200}
                key={`third-width-${index}-${pos}`}
                onDrop={(item) => handleDrop(index, pos, item)}
                className="w-[48px] h-[32px] bg-gray-200 border border-gray-400 rounded flex items-center justify-center"
              >
                {renderInput(data[index] && data[index][pos], index, pos)}
                <CiCirclePlus size={32} onClick={addInput} />
              </DropZone>
            ))}
            <button
              className="ml-2 text-red-600"
              onClick={() => removeBlock(blockId)}
            >
              <CiCircleRemove size={32} />
            </button>
          </div>
        );
      case "quarter-width":
        if (!data[index]) {
          setData((prevData) => ({
            ...prevData,
            [index]: [null, null, null, null],
          }));
        }
        return (
          <div className="flex space-x-4" key={`quarter-width-${index}`}>
            {[0, 1, 2, 3].map((pos) => (
              <DropZone
                height={100}
                width={100}
                key={`quarter-width-${index}-${pos}`}
                onDrop={(item) => handleDrop(index, pos, item)}
                className="w-[32px] h-[32px] bg-gray-200 border border-gray-400 rounded flex items-center justify-center"
              >
                {renderInput(data[index] && data[index][pos], index, pos)}
                <CiCirclePlus size={32} onClick={addInput} />
              </DropZone>
            ))}
            <button
              className="ml-2 text-red-600"
              onClick={() => removeBlock(blockId)}
            >
              <CiCircleRemove size={32} />
            </button>
          </div>
        );
      default:
        return null;
    }
  });
};

export default RenderBlocks;
