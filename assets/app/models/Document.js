var Backbone = require('backbone');
var _ = require('underscore');

var DocumentModel = Backbone.Model.extend({
  initialize: function (opts) {
    var parts;
    if (opts.fileExt === 'md' || opts.fileExt === 'markdown') {
      if (this.hasYmlFrontmatter(opts.content)) {
        parts = this.splitYmlMarkdown(opts.content);
        this.frontMatter = parts.yml;
        this.content = parts.md;
      }
      else {
        this.frontMatter = false;
        this.content = opts.content;
      }
    }
    else if (opts.fileExt === 'yml' || opts.fileExt === 'yaml') {
      this.frontMatter = opts.content;
      this.content = false;
    }
    return this;
  },
  hasYmlFrontmatter: function (content) {
    var r = /^---/;
    if (content.match(r)) {
      return true;
    }
    return false;
  },
  splitYmlMarkdown: function (content) {
    var r = /^---\n([\s\S]*?)---\n/,
        matches = content.match(r),
        yml, md, x;

    if (!matches) return false;

    x = matches[0];
    yml = matches[1];
    md = content.slice(x.length);

    return { yml: yml, md: md};
  },
  toMarkdown: function () {
    var lastCharIndex;
    if (!this.frontMatter) return this.content;
    else if (!this.content) return this.frontMatter;

    // add a new line at the end if there isn't one already
    // this is so the front matter dashes are on the next line
    lastCharIndex = this.frontMatter.length - 1;
    if (this.frontMatter[lastCharIndex] !== '\n') {
      this.frontMatter += '\n';
    }

    return ['---\n', this.frontMatter, '---\n', this.content]
      .join('');
  }
});

module.exports = DocumentModel;
