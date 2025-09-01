export const isValidUrl = (url : string) : boolean => {
    // protocol://website.name.something
    // protocol (optional)
    // .something (required) (.net | .com | .org | .info | .biz | .co.il .ect)
    // if protocol is present then :// must be present
    const protocolRegex = /^(ftp|http|https):\/\//; // 
    const domainRegex = /^[^ "]+$.*\.(net|com|org|info|biz|co\.il)$/;
    if (url.includes('://')) {
        const domainPart = url.split('://')[1] ?? '';
        return protocolRegex.test(url) && domainRegex.test(domainPart);
    } else {
        return domainRegex.test(url);
    }
}

export const isValidIp = (ip : string) : boolean => {
    // [0-255].[0-255].[0-255].[0-255]
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}


export const isValidPort = (port : string) : boolean => {
    const portNumber = parseInt(port, 10);
    return portNumber > 0 && portNumber < 65536;
}

