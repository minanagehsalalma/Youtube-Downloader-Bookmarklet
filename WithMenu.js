var videoSourceCode = document.documentElement.innerHTML;
var urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*videoplayback(?:\?|%3F)[^'"]+/g;
var matches = videoSourceCode.match(urlRegex);
var videoUrls = [];

if (matches) {
    for (var i = 0; i < matches.length; i++) {
        videoUrls.push(matches[i]);
    }

    if (videoUrls.length > 0) {
        // Sort the video URLs by quality
        videoUrls.sort(function(a, b) {
            var itagA = getItagFromUrl(a);
            var itagB = getItagFromUrl(b);
            return compareItags(itagA, itagB);
        });

        var selectMenu = document.createElement('select');
        selectMenu.id = 'videoFormatSelect';

        // Sort "Video Only" formats to the bottom
        videoUrls.sort(function(a, b) {
            var itagA = getItagFromUrl(a);
            var itagB = getItagFromUrl(b);
            var isVideoOnlyA = isVideoOnlyFormat(itagA);
            var isVideoOnlyB = isVideoOnlyFormat(itagB);

            if (isVideoOnlyA && !isVideoOnlyB) {
                return 1;
            } else if (!isVideoOnlyA && isVideoOnlyB) {
                return -1;
            } else {
                return compareItags(itagA, itagB);
            }
        });

        for (var j = 0; j < videoUrls.length; j++) {
            var formattedUrl = videoUrls[j].replace(/\\u0026/g, '&');
            var itag = getItagFromUrl(formattedUrl);
            var quality = getQualityFromItag(itag);

            var option = document.createElement('option');
            option.value = j;
            option.textContent = quality + ' (' + itag + ')';
            selectMenu.appendChild(option);
        }

        var button = document.createElement('button');
        button.textContent = 'Open';
        button.style.padding = '8px 16px'; // Increase button size
        button.style.fontSize = '16px'; // Increase button font size
        button.style.fontWeight = 'bold'; // Make button text bold
        button.addEventListener('click', openSelectedFormat);

        var segmentedLikeButton = document.getElementById('segmented-like-button');
        var parentElement = segmentedLikeButton.parentNode;
        parentElement.insertBefore(selectMenu, segmentedLikeButton);
        parentElement.insertBefore(button, segmentedLikeButton);
    } else {
        console.log('No video URLs found in the source code.');
    }
} else {
    console.log('No matches found in the source code.');
}

function getItagFromUrl(url) {
    url = decodeURIComponent(url);
    var itagRegex = /itag=(\d+)/;
    var match = url.match(itagRegex);
    if (match && match.length > 1) {
        return match[1];
    }
    return '';
}

function compareItags(itagA, itagB) {
    return itagA.localeCompare(itagB);
}

function isVideoOnlyFormat(itag) {
    return ['133', '134', '135', '136', '137', '160', '242', '243', '244', '247', '248', '278'].includes(itag);
}

function openSelectedFormat() {
    var selectedFormatIndex = document.getElementById('videoFormatSelect').value;
    var chosenUrl = videoUrls[selectedFormatIndex].replace(/\\u0026/g, '&');
    var videoTitle = document.title;
    chosenUrl += '&title=' + encodeURIComponent(videoTitle);
    console.log('Opening video:', chosenUrl);
    // Replace 'window.open' with your desired action (e.g., opening the video in a new tab)
    window.open(chosenUrl);
}


function getQualityFromItag(itag) {
    switch (itag) {
        case '5':
            return 'FLV 240p';
        case '6':
            return 'FLV 270p';
        case '17':
            return '3GP 144p';
        case '18':
            return 'MP4 360p';
        case '22':
            return 'MP4 720p';
        case '34':
            return 'FLV 360p';
        case '35':
            return 'FLV 480p';
        case '36':
            return '3GP 180p';
        case '37':
            return 'MP4 1080p';
        case '38':
            return 'MP4 3072p';
        case '43':
            return 'WebM 360p';
        case '44':
            return 'WebM 480p';
        case '45':
            return 'WebM 720p';
        case '46':
            return 'WebM 1080p';
        case '82':
            return 'MP4 360p (3D)';
        case '83':
            return 'MP4 480p (3D)';
        case '84':
            return 'MP4 720p (3D)';
        case '85':
            return 'MP4 1080p (3D)';
        case '92':
            return 'HLS 240p (3D)';
        case '93':
            return 'HLS 360p (3D)';
        case '94':
            return 'HLS 480p (3D)';
        case '95':
            return 'HLS 720p (3D)';
        case '96':
            return 'HLS 1080p (3D)';
        case '133':
            return 'MP4 240p Video Only';
        case '134':
            return 'MP4 360p Video Only';
        case '135':
            return 'MP4 480p Video Only';
        case '136':
            return 'MP4 720p Video Only';
        case '137':
            return 'MP4 1080p Video Only';
        case '140':
            return 'M4A Audio 128k';
        case '160':
            return 'MP4 144p Video Only';
        case '242':
            return 'WebM 240p Video Only';
        case '243':
            return 'WebM 360p Video Only';
        case '244':
            return 'WebM 480p Video Only';
        case '247':
            return 'WebM 720p Video Only';
        case '248':
            return 'WebM 1080p Video Only';
        case '249':
            return 'WebM Audio 50k';
        case '250':
            return 'WebM Audio 70k';
        case '251':
            return 'WebM Audio 160k';
        case '271':
            return 'WebM 1440p Video Only';         
        case '278':
            return 'WebM 144p Video Only'; 
        case '313':
            return 'WebM 2160p Video Only';             
        default:
            return 'Unknown';
    }
}


