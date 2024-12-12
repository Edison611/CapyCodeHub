import React, { useState, useEffect } from 'react';

function FrameEditor() {
  const [frames, setFrames] = useState([]);
  const [qualifiers, setQualifiers] = useState([]); // Hold the qualifiers data from JSON
  const [currentFrame, setCurrentFrame] = useState(0);
  const [goToFrame, setGoToFrame] = useState('');
  const DRIVER_SKILL_PREFILL = "Skill rating: \n- Accuracy: \n- Consistency: \n- Control: \n- Strategy: \n- Overall Rating: ";

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Loading data.json...");
        const response = await fetch('55790.json'); // Fetch data from the public folder
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log("Loaded JSON Data:", jsonData);

        // Set qualifiers data
        setQualifiers(jsonData.qualifiers);

        // Initialize frames to have the correct structure
        const initialFrames = Array(jsonData.qualifiers.length).fill().map(() => [DRIVER_SKILL_PREFILL, DRIVER_SKILL_PREFILL, DRIVER_SKILL_PREFILL, DRIVER_SKILL_PREFILL]); // 4 text areas per frame
        setFrames(initialFrames);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleTextareaChange = (frameIndex, textareaIndex, value) => {
    const updatedFrames = [...frames];
    updatedFrames[frameIndex][textareaIndex] = value; // Update specific textarea in the current frame
    setFrames(updatedFrames);
  };

  const handlePreviousFrame = () => {
    setCurrentFrame((prev) => Math.max(0, prev - 1));
  };

  const handleNextFrame = () => {
    setCurrentFrame((prev) => Math.min(frames.length - 1, prev + 1));
  };

  const handleGoToFrame = () => {
    const frameNumber = parseInt(goToFrame, 10) - 1;
    if (!isNaN(frameNumber) && frameNumber >= 0 && frameNumber < frames.length) {
      setCurrentFrame(frameNumber);
    } else {
      alert(`Please enter a valid frame number between 1 and ${frames.length}`);
    }
  };

  if (qualifiers.length === 0 || frames.length === 0) {
    return <div>Loading...</div>;
  }

  // Dynamically retrieve team names for the current frame
  const currentQualifier = qualifiers[currentFrame];
  const firstAllianceTeam = currentQualifier.alliance_teams[0];
  const secondAllianceTeam = currentQualifier.alliance_teams[1];
  const team3 = currentQualifier.opponent_teams[0];
  const team4 = currentQualifier.opponent_teams[1];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Qualification Round (# {currentFrame + 1} of {frames.length})
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Render 4 textareas for the current frame */}
        {frames[currentFrame].map((content, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={`textarea-${index + 1}`}
              className={`mb-2 font-semibold ${
                index === 0 ? 'text-red-500' : index === 1 ? 'text-red-500' : index === 2 ? 'text-blue-500' : 'text-blue-500'
              }`}
            >
              {/* Dynamically set labels for each textarea */}
              {index === 0
                ? firstAllianceTeam
                : index === 1
                ? secondAllianceTeam
                : index === 2
                ? team3
                : team4}
            </label>
            <textarea
              id={`textarea-${index + 1}`}
              value={content}
              onChange={(e) => handleTextareaChange(currentFrame, index, e.target.value)}
              className="w-full h-40 p-2 border rounded"
              placeholder={`Textarea ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handlePreviousFrame}
          disabled={currentFrame === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous Frame
        </button>

        <button
          onClick={handleNextFrame}
          disabled={currentFrame === frames.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next Frame
        </button>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={goToFrame}
            onChange={(e) => setGoToFrame(e.target.value)}
            min="1"
            max={frames.length}
            className="w-20 p-2 border rounded"
            placeholder="Frame #"
          />
          <button
            onClick={handleGoToFrame}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Go to Frame
          </button>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${((currentFrame + 1) / frames.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default FrameEditor;