export const formatDate = (timestamp: number, options: Intl.DateTimeFormatOptions = {}) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', options);
};

export const formatTime = (timestamp: number, options: Intl.DateTimeFormatOptions = {}) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    ...options
  });
};

export const formatFullDate = (timestamp: number) => {
  return formatDate(timestamp, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatShortDate = (timestamp: number) => {
  return formatDate(timestamp, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const isToday = (timestamp: number) => {
  const today = new Date();
  const date = new Date(timestamp * 1000);
  return date.toDateString() === today.toDateString();
}; 