import { useState, useEffect } from 'react';

// API key would typically come from environment variables
// For this demo, we'll use a placeholder
const API_KEY = 'b7a017453d8409bb5be3785f80dbe8b4';

export default function TMDBMatcher() {
  const [inputList, setInputList] = useState('');
  const [showsList, setShowsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedShows, setSelectedShows] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');

  // Parse input list when the user submits
  const processInputList = () => {
    if (!inputList.trim()) return;
    
    const lines = inputList
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    setShowsList(lines);
    setCurrentIndex(0);
    setSelectedShows({});
    setIsComplete(false);
    
    if (lines.length > 0) {
      searchShow(lines[0]);
    }
  };

  // Mock function to simulate TMDB API search
  const searchShow = (query) => {
    setIsProcessing(true);
    setSearchStatus(`Searching for "${query}"...`);
    
    // In a real app, this would be an actual API call
    // For demo purposes, we'll create mock data
    setTimeout(() => {
      const mockResults = generateMockResults(query);
      setSearchResults(mockResults);
      setIsProcessing(false);
      setSearchStatus('');
    }, 500);
  };
  
  // Generate mock search results
  const generateMockResults = (query) => {
    // In a real implementation, this would be replaced with actual API results
    return [
      {
        id: Math.floor(Math.random() * 100000),
        name: query,
        original_name: query,
        first_air_date: "2020-01-01",
        poster_path: null,
        overview: `This is a mock result for ${query}. In a real implementation, this would show the actual overview from TMDB.`
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: `${query} (US Version)`,
        original_name: query,
        first_air_date: "2018-05-12",
        poster_path: null,
        overview: `US adaptation of ${query}. This is a mock result.`
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: `${query} Reboot`,
        original_name: `${query} Reboot`,
        first_air_date: "2022-08-15",
        poster_path: null,
        overview: `A modern reboot of the classic ${query}. This is a mock result.`
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: `The ${query} Show`,
        original_name: `The ${query} Show`,
        first_air_date: "2015-11-23",
        poster_path: null,
        overview: `Talk show featuring ${query}. This is a mock result.`
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: `${query}: Behind the Scenes`,
        original_name: `${query}: Behind the Scenes`,
        first_air_date: "2019-03-30",
        poster_path: null,
        overview: `Documentary about the making of ${query}. This is a mock result.`
      }
    ];
  };

  // Select a show and move to the next
  const selectShow = (show) => {
    const updatedSelections = {
      ...selectedShows,
      [showsList[currentIndex]]: show
    };
    
    setSelectedShows(updatedSelections);
    
    if (currentIndex < showsList.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      searchShow(showsList[nextIndex]);
    } else {
      setIsComplete(true);
    }
  };
  
  // Skip current show
  const skipShow = () => {
    if (currentIndex < showsList.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      searchShow(showsList[nextIndex]);
    } else {
      setIsComplete(true);
    }
  };
  
  // Reset the app
  const resetApp = () => {
    setInputList('');
    setShowsList([]);
    setCurrentIndex(0);
    setSearchResults([]);
    setSelectedShows({});
    setIsComplete(false);
  };

  // Replace this with your actual API implementation
  const apiNotes = () => {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
        <p className="font-bold">TMDB API Implementation Notes:</p>
        <p className="text-sm">
          This is a demo application. In a real implementation, you would need to:
        </p>
        <ol className="list-decimal ml-5 text-sm">
          <li>Register for a TMDB API key at <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="underline">themoviedb.org</a></li>
          <li>Replace the placeholder API calls with actual fetch requests</li>
          <li>Example endpoint: <code>https://api.themoviedb.org/3/search/tv?api_key=YOUR_API_KEY&query=SHOW_NAME</code></li>
        </ol>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">TMDB Show Matcher</h1>
      
      {apiNotes()}
      
      {!showsList.length ? (
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Paste your list of shows (one per line):
          </label>
          <textarea
            className="w-full h-48 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={inputList}
            onChange={(e) => setInputList(e.target.value)}
            placeholder="Friends&#10;Breaking Bad&#10;The Office&#10;Game of Thrones&#10;..."
          />
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={processInputList}
          >
            Process List
          </button>
        </div>
      ) : isComplete ? (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Selected Shows</h2>
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {Object.keys(selectedShows).map((title) => (
                <li key={selectedShows[title].id} className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 text-center">
                      <span className="text-gray-600">{selectedShows[title].id}</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-gray-500">Selected: {selectedShows[title].name} ({selectedShows[title].first_air_date?.split('-')[0] || 'N/A'})</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Export Data:</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(
                Object.keys(selectedShows).map(title => ({
                  title,
                  tmdb_id: selectedShows[title].id,
                  tmdb_name: selectedShows[title].name,
                  year: selectedShows[title].first_air_date?.split('-')[0] || 'N/A'
                })), 
                null, 2
              )}
            </pre>
          </div>
          
          <button
            className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            onClick={resetApp}
          >
            Start Over
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <span className="font-medium">Processing: </span>
              <span>{currentIndex + 1} of {showsList.length}</span>
            </div>
            <button
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 text-sm"
              onClick={skipShow}
            >
              Skip This Show
            </button>
          </div>
          
          <div className="p-4 bg-gray-100 rounded mb-6">
            <h2 className="text-xl font-bold">Current Show: <span className="text-blue-600">{showsList[currentIndex]}</span></h2>
          </div>
          
          {isProcessing ? (
            <div className="text-center p-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-2">{searchStatus}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {searchResults.map((result) => (
                <div 
                  key={result.id}
                  className="border border-gray-200 rounded p-4 hover:bg-blue-50 cursor-pointer transition"
                  onClick={() => selectShow(result)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {result.poster_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w92${result.poster_path}`} 
                          alt={result.name}
                          className="w-16 h-24 object-cover rounded" 
                        />
                      ) : (
                        <div className="w-16 h-24 bg-gray-200 flex items-center justify-center rounded">
                          <span className="text-gray-500 text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-bold">{result.name}</h3>
                      <div className="text-sm text-gray-600 mb-1">
                        {result.first_air_date ? `First aired: ${result.first_air_date}` : 'Release date unknown'}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        TMDB ID: {result.id}
                      </div>
                      <p className="text-sm line-clamp-2">{result.overview}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {searchResults.length === 0 && !isProcessing && (
                <div className="text-center p-8 bg-gray-50 rounded">
                  <p>No results found for "{showsList[currentIndex]}"</p>
                  <button
                    className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    onClick={skipShow}
                  >
                    Skip and continue
                  </button>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 bg-gray-100 p-4 rounded">
            <h3 className="font-medium mb-2">Selected so far: {Object.keys(selectedShows).length} of {showsList.length}</h3>
            <div className="text-sm">
              {Object.keys(selectedShows).length > 0 ? (
                <ul className="list-disc ml-5">
                  {Object.keys(selectedShows).slice(-3).map((title) => (
                    <li key={selectedShows[title].id}>
                      {title} → {selectedShows[title].name} (ID: {selectedShows[title].id})
                    </li>
                  ))}
                  {Object.keys(selectedShows).length > 3 && 
                    <li className="italic">...and {Object.keys(selectedShows).length - 3} more</li>
                  }
                </ul>
              ) : (
                <p className="italic">No shows selected yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}