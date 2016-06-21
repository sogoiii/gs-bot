'use strict';

const _ = require('lodash');


/**
 * textLine - Reducer that generates each pull request line
 *
 * @param  {type} result description
 * @param  {type} val    description
 * @param  {type} index  description
 * @return {type}        description
 */
const textLine = (result, val, index) => {
  let line = `*${index + 1}.* (${val.pull_request.html_url}) ${val.title} \n`;
  return result.concat(line);
}//end of textLine

/**
 * genAttachments - For every item recieved, generate 1 slack attachment object
 * @param  {Object} item
 * @param  {Object} item.username               pull request username
 * @param  {Object} item.pull_request           Object
 * @param  {Object} item.pull_request.html_url  Html url to the pull request on github
 * @param  {Object} item.body                   Pull request body message
 * @param  {Object} item.title                  Pull request title message
 * @param  {Object} item
 * @return {[type]}      [description]
 */
const genAttachments = (item) => {
  return {
    title: `By user ${_.first(item).username}`,
    text: _.reduce(item, textLine, []).join(''),
    mrkdwn_in: ['text'],
    color: item.color
  }
}//end of genAttachments


const toSlack = function(params) {
  let attachments = _.chain(params.data)
                      .groupBy('username')
                      .map(item => {
                        item.color = (params.searchText.indexOf('is:open') > 0 ) ? '#7CD197' : '#764FA5';
                        return item;
                      })
                      .flatMap(genAttachments)
                      .value();

  let finalOutput = {
    response_type: 'ephemeral',
    unfurl_links: false,
    unfurl_media: false,
    text: (attachments.length === 0) ? 'No Pull requests found.' : 'Currently open pull requests.',
    attachments
  }

  return finalOutput;
}//end of toSlack


module.exports = {
  toSlack
}
