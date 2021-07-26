function itemHasCurrentTag(item) {
    var hasCurrentTag = false;
    var currentTag = getCurrentTag();
    if (currentTag != "") {
        item.tags.forEach(tag => {
            if (tag.name == currentTag) {
                hasCurrentTag = true;
            }
        });
    } else {
        hasCurrentTag = true;
    }

    return hasCurrentTag;
}

function getCurrentTag() {
    var currentTag = "";
    if ($(".tag-current").length > 0) {
        currentTag = $(".tag-current")[0].innerText;
    }

    return currentTag;
}

var itemPreProcessor = function (item) {
    var ret = {
        description: item.custom_excerpt ?? "",
        feature_image: item.feature_image,
        display: "inline-block",
        primary_tag_name: "",
        primary_tag_url: "",
        primary_tag_display: "none"
    };

    if (item.tags.length > 0) {
        ret.primary_tag_name = item.tags[0].name;
        ret.primary_tag_url = item.tags[0].url;
        ret.primary_tag_display = "inline-block";
    }

    if (!itemHasCurrentTag(item)) {
        ret.display = "none";
    }

    return ret;
};

var indexing_start = function () {
    $('.search-field')
        .prop('disabled', true)
        .addClass('yellow-bg')
        .prop('placeholder', 'Indexing, please wait');
};

var indexing_end = function () {
    $('.search-field')
        .prop('placeholder', 'Search …')
        .removeClass('yellow-bg')
        .prop('disabled', false);
};

var on_complete = function (results) {
    if ($('#search-field').prop('value')) {
        $('.my-search-area').show();
        $('.my-display-area').hide();
    } else {
        $('.my-search-area').hide();
        $('.my-display-area').show();
    }
};
