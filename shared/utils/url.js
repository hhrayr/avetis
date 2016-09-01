export function addQueryParam(name, value, url) {
  let workUrl = url || window.location.href;
  const queryParam = `${name}=${encodeURIComponent(value)}`;
  if (workUrl.indexOf('?') !== -1) {
    workUrl += `&${queryParam}`;
  } else {
    workUrl += `?${queryParam}`;
  }
  return workUrl;
}

export function getQueryVariable(name, query) {
  let workQuery = query;
  if (!workQuery && typeof window !== 'undefined') {
    const searchPos = window.location.href.indexOf('?');
    if (searchPos !== -1) {
      workQuery = window.location.href.substring(searchPos + 1);
    }
  }
  if (workQuery) {
    const vars = workQuery.split('&');
    if (vars.length) {
      const compName = name.toLowerCase();
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0].toLowerCase() === compName) {
          return decodeURIComponent(pair[1]);
        }
      }
    }
  }
  return null;
}
