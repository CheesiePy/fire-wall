export const isValidUrl = (url: string): boolean => {
  const urlRegexWithProtocol = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  // A more robust regex for URLs without a protocol
  const urlRegexWithoutProtocol = /^(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

  if (url.includes("://")) {
    return urlRegexWithProtocol.test(url);
  } else {
    return urlRegexWithoutProtocol.test(url);
  }
};

export const isValidIp = (ip: string): boolean => {
  // [0-255].[0-255].[0-255].[0-255]
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
}


export const isValidPort = (port: string): boolean => {
  const portNumber = parseInt(port, 10);
  return portNumber > 0 && portNumber < 65536;
}

