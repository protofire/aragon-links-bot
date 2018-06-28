module.exports = (app) => {

  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async (context) => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}

    app.log('issue opened:', context.payload.issue);

    const matches = context.payload.issue.body.match(/https?:\/\/[^\s]+/guis);
    const urls = matches.map(v => `"${v}"`).join(' ');

    console.log('matches:', matches, urls);
    console.log('urls:', urls);

    if (matches.length === 0) {
      app.log('no links found in issue, skipping...')
      return;
    }
    
    app.log('searching for similar issues...');

    const searchResult = await context.github.search.issues({
      q: `type:issue in:body ${urls}`,
      per_page: 100
    });

    if (!searchResult.data || searchResult.data.items.length === 0) {
      app.log('no similar issues found, skipping...')
      return;
    }

    app.log('found results:', searchResult.data.items);

    const issues = searchResult.data.items.map(item => item.html_url);
    const params = context.issue({
      body: `Similar issues were found containing the suggested URLs:\n\n ${issues.join('\n')}\n\n.Please, check if content is not a duplicate.\n\nThis is an automated response.`
    })

    // Post a comment on the issue
    return context.github.issues.createComment(params);
  })
}
