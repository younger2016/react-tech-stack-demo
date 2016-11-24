let template = require('art-template/node/template-native');

template.config('escape', false);

template.onerror = function (e) {
    var message = 'Template Error\n\n';
    for (var name in e)
        message += '<' + name + '>\n' + e[name] + '\n\n';
};
export default template;
