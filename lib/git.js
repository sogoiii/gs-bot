'use strict';

const GitHubApi = require("github");
const _ = require('lodash');

class Git {
    /**
     * constructor - Configures the Git Class object to connect to github
     *
     * @param  {Object} config            Congiguration object
     * @param  {String} config.userAgent  Required useragent sent to github
     * @param  {String} config.token      Access token for github
     * @param  {String} config.host       github host api
     * @param  {String} config.org        default organization to make queires against
     * @param  {String} config.per_page   limit how many are shown per command
     * @param  {String} config.debug   limit how many are shown per command
     * @return {}
     */
    constructor(config) {
      this.org = config.org;
      this.per_page = config.per_page;

      this.github = new GitHubApi({
          debug: config.debug,
          protocol: 'https',
          host: config.host,
          timeout: 2800,
          headers: {
              'user-agent': config.userAgent
          },
          followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
          includePreview: true // default: false; includes accept headers to allow use of stuff under preview period
      });

      this.github.authenticate({
          type: 'oauth',
          token: config.token
      });
    }


    /**
     * search - Search method against githubs api
     *
     * @param  {Object} params              Param wrapper
     * @param  {String} params.searchText   Search text to apply against github
     * @param  {Function} cb                Return Function
     * @return {Array}                      Modified github response with array of items.
     */
    search(params, cb) {
      this.github.search.issues({
        q: `${params.searchText}`,
        per_page: this.per_page,
        page: 1
      }, (err, res) => {
        // console.log(JSON.stringify(res.items,null, 2));
        if(err) {return cb('Github api failed');}
        var data = _.chain(res.items)
                    .map(function(item){
                      return {
                        username: item.user.login,
                        pull_request: item.pull_request,
                        body: item.body,
                        title: item.title
                      }
                    })
                    .value();
        return cb(err, data);
      });
    }//search
}//end of class

module.exports = Git;
