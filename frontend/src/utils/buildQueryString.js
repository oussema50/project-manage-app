export const buildQueryString = (queryBuild) => {
    if (!queryBuild || typeof queryBuild !== 'object') return '';
    const params = Object.entries(queryBuild)
      .filter(([_, value]) => value !== undefined && value !== '') 
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return params ? `?${params}` : ''
  };