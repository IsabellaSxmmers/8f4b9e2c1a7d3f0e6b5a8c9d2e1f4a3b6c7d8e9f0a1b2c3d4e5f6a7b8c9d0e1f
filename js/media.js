/* Turns a Vimeo or Google Drive share link into an embed URL and a thumbnail. */
(function () {
  "use strict";

  function parseLink(link) {
    link = String(link || "").trim();
    if (!link) return null;

    // Vimeo: https://vimeo.com/1156656884/480354be26?...   (the second part is the private-link hash)
    var v = link.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([0-9a-f]+))?/i);
    if (v) {
      var hash = v[2] || (link.match(/[?&]h=([0-9a-f]+)/i) || [])[1] || "";
      var params = "title=0&byline=0&portrait=0&dnt=1&color=ABCECA" + (hash ? "&h=" + hash : "");
      return {
        provider: "vimeo",
        embed: "https://player.vimeo.com/video/" + v[1] + "?" + params,
        open: "https://vimeo.com/" + v[1] + (hash ? "/" + hash : ""),
        openLabel: "Watch on Vimeo",
        thumb: "",                     // filled from Vimeo's oEmbed when needed (see thumbFor)
        oembed: "https://vimeo.com/api/oembed.json?width=1280&url=" + encodeURIComponent("https://vimeo.com/" + v[1] + (hash ? "/" + hash : ""))
      };
    }

    // Google Drive: https://drive.google.com/file/d/<id>/view?usp=sharing
    var d = link.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/i);
    if (d) {
      return {
        provider: "drive",
        embed: "https://drive.google.com/file/d/" + d[1] + "/preview",
        open: "https://drive.google.com/file/d/" + d[1] + "/view",
        openLabel: "Open in Google Drive",
        thumb: "https://drive.google.com/thumbnail?id=" + d[1] + "&sz=w1280"
      };
    }

    return { provider: "other", embed: link, open: link, openLabel: "Open", thumb: "" };
  }

  // Resolves to a thumbnail URL for a project (its own thumbnail first, then the link's).
  function thumbFor(project) {
    if (project.thumbnail) return Promise.resolve(project.thumbnail);
    var m = parseLink(project.link);
    if (!m) return Promise.resolve("");
    if (m.thumb) return Promise.resolve(m.thumb);
    if (m.oembed && window.fetch) {
      return fetch(m.oembed)
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { return (j && j.thumbnail_url) || ""; })
        .catch(function () { return ""; });
    }
    return Promise.resolve("");
  }

  window.PortfolioMedia = { parseLink: parseLink, thumbFor: thumbFor };
})();
