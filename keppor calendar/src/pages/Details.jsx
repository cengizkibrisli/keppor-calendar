import { ArrowDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef } from 'react';
import { YoutubeTranscript } from 'youtube-transcript';

const videos = [
    { id: 'dQw4w9WgXcQ', completed: true },
    { id: 'M7lc1UVf-VE', completed: false },
    { id: 'wJnBTPUQS5A', completed: true },
    // Add more video objects as you need
];

const VideoDetails = () => {
    const [transcript, setTranscript] = useState('');
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const videoContainerRef = useRef(null);

    useEffect(() => {
        async function fetchTranscript() {
            try {
                const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                const targetUrl = `https://www.youtube.com/watch?v=${videos[selectedVideoIndex].id}`;
                const response = await fetch(proxyUrl + targetUrl);
                const text = await response.text();
                setTranscript(text); // This may need further processing
            } catch (error) {
                console.error('Error fetching transcript:', error);
                setTranscript('Transcript not available.');
            }
        }

        fetchTranscript();
    }, [selectedVideoIndex]);

    const handleScrollToNext = () => {
        if (selectedVideoIndex < videos.length - 1) {
            setSelectedVideoIndex(selectedVideoIndex + 1);
        }
    };

    const handleVideoClick = (index) => {
        setSelectedVideoIndex(index);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="w-2/3 p-10 pl-16 flex items-center overflow-hidden justify-center bg-black relative">
                <div className="absolute top-12 left-4 flex flex-col items-center space-y-2 bg-slate-600 rounded-md p-1">
                    {videos.map((video, index) => (
                        <div key={video.id} className="flex flex-col items-center space-y-2">
                            <span
                                className={`h-8 w-8 rounded-md cursor-pointer flex items-center justify-center ${
                                    video.completed ? 'bg-green-500' : 'bg-gray-500'
                                }`}
                                onClick={() => handleVideoClick(index)}
                            >
                                <div className='text-white items-center font-bold'>
                                {index + 1}
                                </div>
                            </span>
                        </div>
                    ))}
                </div>
                <div ref={videoContainerRef} className="w-full h-full">
                    <iframe
                        title="selectedVideo"
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videos[selectedVideoIndex].id}`}
                        frameBorder="0"
                        className="rounded-xl"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <button
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-2 rounded-full"
                    onClick={handleScrollToNext}
                >
                    <ArrowDownIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="w-1/3 p-8 bg-white shadow-lg overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">Transcript</h1>
                <p className="text-gray-700 whitespace-pre-wrap leading-loose">{transcript}</p>
            </div>
        </div>
    );
};

export default VideoDetails;
