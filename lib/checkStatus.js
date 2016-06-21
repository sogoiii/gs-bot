'use strict';

const config = require('../config');
const Git = require('./git');
const formatToMessage = require('./formatToMessage');


/**
 * Receives input and creates searchText
 * @param  {Object} params              Wrapper
 * @param  {String} params.text         command input text
 * @param  {Object} out                 Wrapper
 * @return {String} out.text            search text String
 * @return {Number} out.per_page        Number of return items from git
 */
const genSearchObj = (params) => {
  let searchText = `org:${config.git.org} is:pr is:${params.text}`.toLowerCase();
  let per_page = config.git.per_page;
  if(params.text.indexOf(':') > 0) {
    searchText = params.text.toLowerCase();
  } else {
    let tmp = params.text.split(" ");
    let status = tmp[0];
    per_page = parseInt(tmp[1],10) || config.git.per_page;
    searchText = `org:${config.git.org} is:pr is:${status}`.toLowerCase();
  }
  return {
    text: searchText,
    per_page: per_page
  }
}//end of genSearchObj


/**
 * checkStatus - given input, returns formatted string for slack(currently)
 * @param  {Object}   params        Wrapper
 * @param  {String}   params.text   Input from from command
 * @param  {Function} callback      return method
 * @return {String}                 String to be shown to user
 */
const checkStatus = (params, callback) => {
  let searchObj = genSearchObj(params);
  let git = new Git(Object.assign({}, config.git, {per_page: searchObj.per_page}));
  git.search({searchText: searchObj.text}, (err, data) => {
    if(err){ return callback(null, {'text': ':( uh oh, we ecnountered an error!'});}
    let msg = formatToMessage.toSlack({data, searchText: searchObj.text});
    return callback(null, msg);
  });
}//end of checkStatus


module.exports = checkStatus;
