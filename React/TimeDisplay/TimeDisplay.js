import React, { useState, useEffect } from 'react';

const ServerTime = () => {
  const [serverTime, setServerTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        if (!response.ok) {
          throw new Error('Failed to fetch server time');
        }
        const data = await response.json();
        setServerTime(data.datetime);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching server time:', error);
        setIsLoading(false);
      }
    };

    fetchServerTime();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1); // Update refreshKey to trigger useEffect
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading server time...</p>
      ) : (
        <div>
          <p>Server time: {serverTime}</p>
          <button onClick={handleRefresh}>Refresh</button>
        </div>
      )}
    </div>
  );
};

export default ServerTime;
