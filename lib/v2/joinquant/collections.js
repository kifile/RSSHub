const got = require('@/utils/got');
const { parseDate } = require('@/utils/parse-date');
const md = require('markdown-it')({
    html: true,
});

module.exports = async (ctx) => {
    const rootUrl = 'https://www.joinquant.com';
    const currentUrl = `${rootUrl}/community/post/listV2?limit=50&page=1&cate=3&type=isNewPublish`;
    const baseUrl = `${rootUrl}/view/community/list?listType=1&type=isNewPublish&tags=`;

    const response = await got({
        method: 'get',
        url: currentUrl,
        headers: {
            'Referer': baseUrl,
            'Host': 'www.joinquant.com',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'X-Requested-With': 'XMLHttpRequest'
        },
    });

    const items = response.data.data.list.map((item) => ({
        title: item.title,
        link: `${rootUrl}/view/community/detail/${item.uniqueKey}`,
        description: md.render(item.content),
        pubDate: parseDate(item.lastPubTime),
    }));

    ctx.state.data = {
        title: '聚宽社区 - JoinQuant',
        link: `${rootUrl}/view/community/list?listType=1&type=isNewPublish&tags=`,
        item: items,
    };
};
