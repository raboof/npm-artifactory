var config = require('../config');
var path = require('path');
var url = require('url');

var repos = config.artifactory['ext-repo'];

module.exports.reverseDomain = function(domain){
    return domain.split('.').reverse().join('.');
}
module.exports.artifactPath = function(artifact){
    var artifactoryPath = url.format(config.artifactory);
    artifact.file = artifact.file || '';
    artifact.group = artifact.group || exports.reverseDomain(config.npm.host);
    return [artifactoryPath, artifact.group.replace(/\./g, '/'), artifact.name, artifact.version, artifact.file].join('/');
}
module.exports.artMetaPath = function(artifactName){
    return exports.artifactPath({
        name: artifactName,
        version: '_meta',
        file: 'metadata.json'
    });
}
module.exports.createOption = function(req){
    var options = { 
        uri: url.format(config.npm) + req.url,
        json: req.body,
        headers: req.headers
    };  
    if (config.proxy) options.proxy = config.proxy;
    options.headers.host = config.npm.host;
    return options;
}
